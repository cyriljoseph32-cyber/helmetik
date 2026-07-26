import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

/**
 * Global fallback for locale-less unmatched paths. In practice middleware
 * prefixes a locale before requests reach here, so this is a rare safety net.
 * It renders its own <html>/<body> because the root layout lives under
 * [locale].
 */
export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#08131f",
          color: "#f5f8fb",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <p style={{ fontSize: "3rem", fontWeight: 800, margin: 0 }}>404</p>
          <p style={{ color: "#b8c2cd", marginTop: "0.5rem" }}>
            This page could not be found.
          </p>
          <Link
            href={`/${defaultLocale}`}
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              background: "#c8f24a",
              color: "#08131f",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Go to Helmetik
          </Link>
        </div>
      </body>
    </html>
  );
}
