import { ImageResponse } from "next/og";
import { mascotDataUri } from "@/lib/mascot-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <img src={mascotDataUri({ size: 128 })} width={128} height={128} alt="" />
      </div>
    ),
    { ...size },
  );
}
