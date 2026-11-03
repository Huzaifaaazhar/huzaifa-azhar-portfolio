import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG card: cream background with the brand gradient glow, real text. Generated at build. */
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
          backgroundColor: "#FBF7F0",
          backgroundImage:
            "radial-gradient(52% 46% at 88% 4%, rgba(232,163,61,0.40), transparent 72%)," +
            "radial-gradient(48% 44% at 8% 92%, rgba(156,175,136,0.38), transparent 74%)," +
            "radial-gradient(60% 50% at 45% 40%, rgba(107,79,58,0.14), transparent 76%)",
          color: "#2B2219",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6B5B4C",
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
            color: "#6B5B4C",
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
