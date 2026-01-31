import {
  defaultLanguage,
  languages,
  showDefaultLang,
  type AcceptedLanguage,
} from ".";

export function toAcceptedLanguage(lang: string | undefined) {
  if (lang && lang in languages) {
    return lang as AcceptedLanguage;
  }

  return defaultLanguage;
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");

  if (lang in languages) {
    return lang as AcceptedLanguage;
  }

  return defaultLanguage;
}

export function getPathWithoutLang(url: URL) {
  const [, lang, ...rest] = url.pathname.split("/");

  if (lang in languages) {
    return `/${rest.join("/")}`;
  }

  return url.pathname;
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLanguage ? path : `/${l}${path}`;
  };
}
