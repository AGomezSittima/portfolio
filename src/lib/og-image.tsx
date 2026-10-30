import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Resvg } from "@resvg/resvg-js";
import { OPEN_TO_WORK, SITE_URL } from "astro:env/server";
import type { CSSProperties } from "react";
import satori from "satori";

import { type AcceptedLanguage, getI18n } from "@/i18n";
import type { CommonDTO } from "@/i18n/data/common";
import type { HeroDTO } from "@/i18n/data/hero";
import type { MetadataDTO } from "@/i18n/data/metadata";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Light `:root` tokens from `src/styles/global.css` (satori can't read CSS
// variables); keep in sync when the palette changes
const ogTheme = {
  background: "#f6f8fb",
  foreground: "#0b1220",
  mutedForeground: "#4a5568",
  card: "rgba(255, 255, 255, 0.55)",
  primary: "#2563eb",
  primaryGlow: "rgba(37, 99, 235, 0.12)",
  warmGlow: "rgba(255, 217, 138, 0.35)",
  glassBorder: "rgba(255, 255, 255, 0.85)",
  glassHighlight: "rgba(255, 255, 255, 0.9)",
  glassShadow:
    "0 0 0 0.5px rgba(20, 40, 80, 0.06), 0 8px 32px rgba(20, 40, 80, 0.08)",
};

// Hero ring radii (`hero-avatar.astro`) scaled up for the card
const ringRadii = [96, 168, 249, 339, 435];

const fontFiles = [
  {
    name: "Geist",
    weight: 600,
    file: "geist-sans/files/geist-sans-latin-600-normal.woff",
  },
  {
    name: "Geist Mono",
    weight: 400,
    file: "geist-mono/files/geist-mono-latin-400-normal.woff",
  },
  {
    name: "Geist Mono",
    weight: 500,
    file: "geist-mono/files/geist-mono-latin-500-normal.woff",
  },
] as const;

let fontsPromise: ReturnType<typeof loadFonts> | undefined;

function loadFonts() {
  return Promise.all(
    fontFiles.map(async ({ name, weight, file }) => ({
      name,
      weight,
      style: "normal" as const,
      data: await readFile(
        join(process.cwd(), "node_modules/@fontsource", file)
      ),
    }))
  );
}

const glassPill: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 44,
  padding: "0 20px",
  borderRadius: 9999,
  border: `1px solid ${ogTheme.glassBorder}`,
  backgroundColor: ogTheme.card,
  boxShadow: `inset 0 1px 0 0 ${ogTheme.glassHighlight}, ${ogTheme.glassShadow}`,
  fontFamily: "Geist Mono",
  fontWeight: 500,
  fontSize: 17,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: ogTheme.mutedForeground,
};

type PillProps = {
  label: string;
  beacon?: boolean;
};

function Pill({ label, beacon = false }: PillProps) {
  return (
    <div style={glassPill}>
      {beacon && (
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: 9999,
            backgroundColor: ogTheme.primary,
            boxShadow: `0 0 16px ${ogTheme.primary}`,
          }}
        />
      )}
      {label}
    </div>
  );
}

type GlowProps = {
  color: string;
  size: number;
  x: number;
  y: number;
};

function Glow({ color, size, x, y }: GlowProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 9999,
        backgroundImage: `radial-gradient(closest-side, ${color}, transparent)`,
      }}
    />
  );
}

function Rings() {
  const size = ringRadii.at(-1)! * 2 + 2;

  return (
    <div
      style={{
        position: "absolute",
        left: (OG_WIDTH - size) / 2,
        top: (OG_HEIGHT - size) / 2,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.07,
        maskImage: "radial-gradient(closest-side, black 30%, transparent)",
      }}
    >
      {ringRadii.map((r) => (
        <div
          key={r}
          style={{
            position: "absolute",
            width: r * 2,
            height: r * 2,
            borderRadius: 9999,
            border: `1.5px solid ${ogTheme.foreground}`,
          }}
        />
      ))}
    </div>
  );
}

type OgCardProps = {
  name: string;
  role: string;
  domain: string;
  openToWork: string | null;
};

function OgCard({ name, role, domain, openToWork }: OgCardProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: OG_WIDTH,
        height: OG_HEIGHT,
        backgroundColor: ogTheme.background,
        fontFamily: "Geist",
      }}
    >
      <Glow color={ogTheme.primaryGlow} size={820} x={700} y={230} />
      <Glow color={ogTheme.warmGlow} size={720} x={470} y={450} />
      <Rings />

      <div style={{ position: "absolute", top: 48, left: 48, display: "flex" }}>
        <Pill label={domain} />
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: ogTheme.foreground,
          }}
        >
          {name}
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily: "Geist Mono",
            fontWeight: 400,
            fontSize: 30,
            color: ogTheme.mutedForeground,
          }}
        >
          {role}
        </div>

        {/* Hangs below the name and role, so they stay centred */}
        {openToWork && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: 56,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pill label={openToWork} beacon />
          </div>
        )}
      </div>
    </div>
  );
}

export async function renderOgImage(lang: AcceptedLanguage) {
  const tCommon = getI18n("commonData", lang) as CommonDTO;
  const tHero = getI18n("heroData", lang) as HeroDTO;
  const tMetadata = getI18n("metadataData", lang) as MetadataDTO;

  fontsPromise ??= loadFonts();

  const svg = await satori(
    <OgCard
      name={tCommon["me.full-name"]}
      role={tMetadata.role}
      domain={new URL(SITE_URL).hostname}
      openToWork={OPEN_TO_WORK ? tHero.openToWork : null}
    />,
    { width: OG_WIDTH, height: OG_HEIGHT, fonts: await fontsPromise }
  );

  return new Resvg(svg, { font: { loadSystemFonts: false } }).render().asPng();
}
