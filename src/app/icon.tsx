import { ImageResponse } from "next/og";
import { mascotDataUri } from "@/lib/mascot-svg";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon / app icon: the mascot mark on the ink base. */
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
        <img src={mascotDataUri({ size: 360 })} width={360} height={360} alt="" />
      </div>
    ),
    { ...size },
  );
}
