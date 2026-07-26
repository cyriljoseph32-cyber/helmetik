import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon / app icon: the real Helmetik mascot on the ink base. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08131f",
          borderRadius: 96,
        }}
      >
        <img src={brandMarkDataUri} width={440} height={297} alt="" />
      </div>
    ),
    { ...size },
  );
}
