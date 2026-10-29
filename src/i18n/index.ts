import { aboutMeData } from "./data/about-me";
import { basicsData } from "./data/basics";
import { commonData } from "./data/common";
import { contactFormData } from "./data/contact-form";
import { featuredProjectsData } from "./data/featured-projects";
import { headerData } from "./data/header";
import { heroData } from "./data/hero";
import { metadataData } from "./data/metadata";
import { notFoundData } from "./data/404";
import { portfolioPageData } from "./data/portfolio-page";
import { privacyPolicyData } from "./data/privacy-policy";
import { professionalExperienceData } from "./data/professional-experience";
import { projectsData } from "./data/projects";

export const languages = {
  es: "Español",
  en: "English",
};

export type AcceptedLanguage = keyof typeof languages;

export const defaultLanguage: AcceptedLanguage = "es";
export const showDefaultLang = true;

const dataStoreMapping = {
  aboutMeData,
  basicsData,
  contactFormData,
  commonData,
  featuredProjectsData,
  headerData,
  heroData,
  metadataData,
  notFoundData,
  portfolioPageData,
  privacyPolicyData,
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
