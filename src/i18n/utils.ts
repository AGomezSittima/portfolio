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

// Netlify may resolve a missing page to `/foo/index.htm(l)` or `/foo.htm(l)`
// before falling back to the 404, so drop those to keep URLs clean
function cleanPathname(pathname: string) {
  return pathname.replace(/(\/index)?\.html?$/, "") || "/";
}

export function getPathWithoutLang(url: URL) {
  const pathname = cleanPathname(url.pathname);
  const [, lang, ...rest] = pathname.split("/");

  if (lang in languages) {
    return `/${rest.join("/")}`;
  }

  return pathname;
}

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLanguage ? path : `/${l}${path}`;
  };
}
