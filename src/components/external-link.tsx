import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { BasicsDTO } from "@/i18n/data/basics";
import type { ComponentProps } from "react";

type ExternalLinkProps = ComponentProps<"a"> & {
  language: AcceptedLanguage;
};

export function ExternalLink({
  language,
  children,
  ...props
}: ExternalLinkProps) {
  const t = getI18n("basicsData", language) as BasicsDTO;

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {t["basics.opensInNewTab"]}</span>
    </a>
  );
}
