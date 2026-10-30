import type { APIRoute, GetStaticPaths } from "astro";

import { type AcceptedLanguage, languages } from "@/i18n";
import { renderOgImage } from "@/lib/og-image";

export const getStaticPaths = (() =>
  Object.keys(languages).map((lang) => ({
    params: { lang },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const png = await renderOgImage(params.lang as AcceptedLanguage);

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
