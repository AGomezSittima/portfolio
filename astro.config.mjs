// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

const SITE_URL = process.env.SITE_URL;

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  adapter: netlify(),
  env: {
    schema: {
      FORMSPREE_FORM_ID: envField.string({
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
      EMAIL: envField.string({
        context: "client",
        access: "public",
      }),
      GITHUB_URL: envField.string({
        context: "client",
        access: "public",
      }),
      LINKEDIN_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  site: SITE_URL,
});
