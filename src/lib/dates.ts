import type { AcceptedLanguage } from "@/i18n";
import esJson from "@/i18n/data/basics/es.json";
import enJson from "@/i18n/data/basics/en.json";

const defaultDate: Record<AcceptedLanguage, string> = {
  es: esJson["basics.present"],
  en: enJson["basics.present"],
};

const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };

const formatters: Record<AcceptedLanguage, Intl.DateTimeFormat> = {
  es: new Intl.DateTimeFormat("es-ES", options),
  en: new Intl.DateTimeFormat("en-US", options),
};

function parseMonthYear(date: string) {
  const [monthText, yearText] = date.split("/");

  const month = parseInt(monthText, 10) - 1;
  const year = parseInt(yearText, 10);

  return new Date(year, month, 1);
}

export function formatDate(
  date: string | null,
  locale: AcceptedLanguage
): string {
  if (date === null) {
    return defaultDate[locale];
  }

  return formatters[locale].format(parseMonthYear(date));
}
