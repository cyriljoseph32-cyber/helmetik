import { NextRequest, NextResponse } from "next/server";
import { submissionSchema } from "@/lib/forms";

export const runtime = "nodejs";

/**
 * Form endpoint for Contact and Become-a-host submissions.
 *
 * Security: typed validation (zod), honeypot (`company_website` must be empty,
 * enforced by the schema), and a light in-memory rate limit. No secrets are
 * ever exposed to the client — email delivery uses server-only env vars.
 *
 * Email is OPTIONAL: if RESEND_API_KEY is absent the route still validates and
 * returns success, because the primary channel is the WhatsApp deep link built
 * on the client. Wire real email by setting RESEND_API_KEY + CONTACT_INBOX.
 */

// Best-effort per-instance rate limit: 6 requests / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

async function sendEmail(subject: string, text: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false; // dormant until configured
  const inbox = process.env.CONTACT_INBOX || "info@helmetik.com";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Helmetik Website <onboarding@resend.dev>",
        to: [inbox],
        subject,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled or invalid input — reject quietly.
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const subject =
    data.kind === "host"
      ? `Helmetik — new host request: ${data.business}`
      : `Helmetik — new contact message from ${data.name}`;

  const lines =
    data.kind === "host"
      ? [
          `Name: ${data.name}`,
          `Business: ${data.business}`,
          `Venue type: ${data.venueType}`,
          `Area: ${data.area}`,
          `Phone/WhatsApp: ${data.phone}`,
          data.message ? `Message: ${data.message}` : "",
        ]
      : [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.area ? `Area: ${data.area}` : "",
          `Message: ${data.message}`,
        ];

  // Attempt email if configured; success is not contingent on it.
  await sendEmail(subject, lines.filter(Boolean).join("\n"));

  return NextResponse.json({ ok: true });
}
