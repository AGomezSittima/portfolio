import type { AcceptedLanguage } from "@/i18n";
import { useTranslatedPath } from "@/i18n/utils";
import { GITHUB_URL, LINKEDIN_URL } from "astro:env/client";

export const homePath = (lang: AcceptedLanguage) =>
  useTranslatedPath(lang)("/");

export const aboutPath = (lang: AcceptedLanguage) =>
  useTranslatedPath(lang)("/#about-me");

export const professionalExperiencePath = (lang: AcceptedLanguage) =>
  useTranslatedPath(lang)("/#professional-experience");

export const projectsShowcasePath = (lang: AcceptedLanguage) =>
  useTranslatedPath(lang)("/#featured-projects");

export const resumePath = (lang: AcceptedLanguage) =>
  `/pdfs/CV_AlvaroGomezSittima_${lang.toUpperCase()}.pdf`;

export const contactFormPath = (formId: string) =>
  `https://formspree.io/f/${formId}`;

// External paths
export const githubPath = () => GITHUB_URL;
export const linkedinPath = () => LINKEDIN_URL;
export const astroPath = () => "https://astro.build/";
export const tailwindcssPath = () => "https://tailwindcss.com/";
export const reactPath = () => "https://react.dev/";
export const nextjsPath = () => "https://nextjs.org/";
