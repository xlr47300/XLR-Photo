import { ImageResponse } from "next/og";

export const alt = "XLR Photographie";
export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#070b11",
          color: "#f2eadb",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            border: "1px solid rgba(242,234,219,0.2)",
            borderRadius: 999,
            display: "flex",
            height: 180,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: 180
          }}
        >
          <span style={{ fontFamily: "Georgia", fontSize: 52, letterSpacing: 8 }}>XLR</span>
          <span
            style={{
              background: "#c7a06a",
              borderRadius: 999,
              bottom: 34,
              height: 10,
              position: "absolute",
              right: 34,
              width: 10
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 54 }}>
          <span style={{ fontFamily: "Georgia", fontSize: 72, letterSpacing: 3 }}>XLR</span>
          <span
            style={{
              color: "rgba(242,234,219,0.55)",
              fontFamily: "monospace",
              fontSize: 19,
              letterSpacing: 10,
              marginTop: 12,
              textTransform: "uppercase"
            }}
          >
            Photographie
          </span>
        </div>
      </div>
    ),
    size
  );
}
