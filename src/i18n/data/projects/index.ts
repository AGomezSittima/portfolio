import projects from "./projects.json";

export const projectsData = {
  es: projects,
  en: projects,
};

export type ProjectsDTO = typeof projects;

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type WorkProjectDTO = ArrayElement<ProjectsDTO["work"]>;
export type PersonalProjectDTO = ArrayElement<ProjectsDTO["personal"]>;

export type TechnologiesDTO =
  | "react"
  | "nextjs"
  | "astro"
  | "tailwindcss"
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "express"
  | "python"
  | "openai"
  | "unity"
  | "csharp"
  | "unreal"
  | "cpp";

export type ExternalLinkSource = "github" | "itchio" | "demo";
