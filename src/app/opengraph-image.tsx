import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG card: dark background with the brand gradient glow, real text. Generated at build. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0C0C0C",
          backgroundImage:
            "radial-gradient(48% 42% at 15% 0%, rgba(182,0,168,0.22), transparent 70%)," +
            "radial-gradient(45% 40% at 85% 5%, rgba(118,33,176,0.22), transparent 70%)," +
            "radial-gradient(55% 45% at 55% 15%, rgba(190,76,0,0.14), transparent 72%)",
          color: "#D7E2EA",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#BBCCD7",
          }}
        >
          {`${site.name} · ${site.role}`}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          I build AI systems that do real work.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "rgba(215,226,234,0.64)",
            maxWidth: 900,
          }}
        >
          Voice agents, document pipelines and automation — built end-to-end by
          one engineer.
        </div>
      </div>
    ),
    size,
  );
}
