import { ImageResponse } from "next/og";

export const alt = "Otto Notes — 加拿大生活、移民資訊與實用工具";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#effaf8",
          color: "#111827",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#1FB2A5",
            borderRadius: "999px",
            height: "340px",
            opacity: 0.12,
            position: "absolute",
            right: "-80px",
            top: "-90px",
            width: "340px",
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}
        >
          <div
            style={{
              color: "#16877e",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Otto Notes
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 28,
            }}
          >
            加拿大生活筆記與實用工具
          </div>
          <div
            style={{
              color: "#4b5563",
              display: "flex",
              fontSize: 30,
              marginTop: 28,
            }}
          >
            生活 · 移民 · 工作 · 讀書
          </div>
        </div>
      </div>
    ),
    size,
  );
}
