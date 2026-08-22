import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SweepEV. Top Sweepstakes Sites of 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0b0d12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 80px",
        }}
      >
        {/* Subtle accent glow behind the logo */}
        <div
          style={{
            position: "absolute",
            top: 80,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(34, 197, 94, 0.12)",
            filter: "blur(80px)",
          }}
        />

        {/* EV badge (green rounded square with "EV" inside) */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: 48,
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 168,
            fontWeight: 900,
            color: "#0b0d12",
            letterSpacing: -8,
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          EV
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 96,
            fontWeight: 900,
            color: "#e8ecf3",
            letterSpacing: -3,
            lineHeight: 1,
            zIndex: 1,
          }}
        >
          <span>Sweep</span>
          <span style={{ color: "#22c55e" }}>EV</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 32,
            fontSize: 36,
            color: "#9aa3b2",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          Top Sweepstakes Sites of 2026
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            fontSize: 24,
            color: "#9aa3b2",
            letterSpacing: 2,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          sweepev.com
        </div>
      </div>
    ),
    { ...size }
  );
}
