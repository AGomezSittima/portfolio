// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

const { SITE_URL, BUCKET_IMAGES_URL } = process.env;

export default defineConfig({
  output: "static",
  // ClientRouter's default; declared so `astro:prefetch` can be imported
  prefetch: { prefetchAll: true },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: netlify(),
  image: {
    remotePatterns: BUCKET_IMAGES_URL
      ? [{ protocol: "https", hostname: new URL(BUCKET_IMAGES_URL).hostname }]
      : [],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: [400, 500, 600],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [400, 500],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
  env: {
    schema: {
      BREVO_API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      CONTACT_TO_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      CONTACT_FROM_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      CONTACT_FORM_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      OPEN_TO_WORK: envField.boolean({
        context: "server",
        access: "public",
        default: false,
      }),
      SITE_URL: envField.string({
        context: "server",
        access: "public",
      }),
      BUCKET_CV_URL: envField.string({
        context: "client",
        access: "public",
      }),
      BUCKET_IMAGES_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      EMAIL: envField.string({
        context: "client",
        access: "public",
      }),
      GITHUB_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      LINKEDIN_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  site: SITE_URL,
});
