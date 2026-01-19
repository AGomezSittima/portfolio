import { aboutMeData } from "./data/about-me";
import { basicsData } from "./data/basics";
import { commonData } from "./data/common";
import { contactFormData } from "./data/contact-form";
import { featuredProjectsData } from "./data/featured-projects";
import { footerData } from "./data/footer";
import { headerData } from "./data/header";
import { heroData } from "./data/hero";
import { metadataData } from "./data/metadata";
import { portfolioPageData } from "./data/portfolio-page";
import { professionalExperienceData } from "./data/professional-experience";
import { projectsData } from "./data/projects";

export const languages = {
  es: "Español (ES)",
  en: "English (US)",
};

export type AcceptedLanguage = keyof typeof languages;

export const defaultLanguage: AcceptedLanguage = "es";
export const showDefaultLang = false;

const dataStoreMapping = {
  aboutMeData,
  basicsData,
  contactFormData,
  commonData,
  featuredProjectsData,
  footerData,
  headerData,
  heroData,
  metadataData,
  portfolioPageData,
  professionalExperienceData,
  projectsData,
};

export type DataStore = keyof typeof dataStoreMapping;
export const defaultDataStore: DataStore = "commonData";

export function getI18n(
  dataStore: DataStore = defaultDataStore,
  lang: AcceptedLanguage = defaultLanguage
) {
  if (!dataStoreMapping[dataStore]) {
    throw new Error(`Data store "${dataStore}" does not exist.`);
  }

  if (!dataStoreMapping[dataStore][lang]) {
    throw new Error(
      `Language "${lang}" not found in data store "${dataStore}".`
    );
  }

  return dataStoreMapping[dataStore][lang];
}
