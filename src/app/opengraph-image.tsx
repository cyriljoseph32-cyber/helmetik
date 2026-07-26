import { ImageResponse } from "next/og";
import { mascotDataUri } from "@/lib/mascot-svg";
import { site } from "@/content/site";
import { startingPrice, currency } from "@/content/pricing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Helmetik — Automated Helmet Cleaning, Koh Samui";

/** Brand Open Graph / Twitter card image. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08131f",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: logo lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={mascotDataUri({ size: 72 })} width={72} height={72} alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#f5f8fb", letterSpacing: -1 }}>
            HELMET<span style={{ color: "#35e0ff" }}>IK</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, color: "#f5f8fb", lineHeight: 1, letterSpacing: -3 }}>
            Clean helmet.
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, color: "#35e0ff", lineHeight: 1.05, letterSpacing: -3 }}>
            Clear head.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#b8c2cd" }}>
            {site.descriptor} · {site.city}, {site.country}
          </div>
        </div>

        {/* bottom row: reassurance chips */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            "Self-service",
            "5–8 minutes",
            `From ${startingPrice} ${currency}`,
          ].map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 10,
                border: "1px solid #21405b",
                color: "#f5f8fb",
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              {chip}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              padding: "12px 22px",
              borderRadius: 10,
              background: "#c8f24a",
              color: "#08131f",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            helmetik.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
