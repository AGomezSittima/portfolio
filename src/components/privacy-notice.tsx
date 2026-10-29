import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { CommonDTO } from "@/i18n/data/common";
import type { ContactFormDTO } from "@/i18n/data/contact-form";
import { privacyPath } from "@/lib/paths";
import { cn } from "@/lib/utils";
import { EMAIL } from "astro:env/client";
import { LucideInfo } from "lucide-react";
import { Fragment, useId } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";

type PrivacyNoticeProps = {
  language: AcceptedLanguage;
  className?: string;
};

const linkClassName =
  "text-primary hover:text-primary-hover font-medium underline underline-offset-4";

export function PrivacyNotice({ language, className }: PrivacyNoticeProps) {
  const t = (getI18n("contactFormData", language) as ContactFormDTO)
    .contactDialog.form.privacy;
  const tCommon = getI18n("commonData", language) as CommonDTO;

  const titleId = useId();
  const [before, after] = t.notice.split("{link}");

  const renderDescription = (description: string) => {
    if (description.includes("{email}")) {
      const [start, end] = description.split("{email}");

      return (
        <>
          {start}
          <a href={`mailto:${EMAIL}`} className={linkClassName}>
            {EMAIL}
          </a>
          {end}
        </>
      );
    }

    return description.replace("{name}", tCommon["me.full-name"]);
  };

  return (
    <p className={cn("text-muted-foreground text-center text-xs", className)}>
      {before}
      <a href={privacyPath(language)} className={linkClassName}>
        {t.linkText}
      </a>
      {after}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={t.infoLabel}
            className="ml-1 align-middle"
          >
            <LucideInfo />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          aria-labelledby={titleId}
          className="text-left"
        >
          <PopoverHeader>
            <PopoverTitle id={titleId}>{t.summaryTitle}</PopoverTitle>
          </PopoverHeader>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-xs">
            {t.summary.map(({ term, description }) => (
              <Fragment key={term}>
                <dt className="text-foreground font-medium">{term}</dt>
                <dd className="text-muted-foreground">
                  {renderDescription(description)}
                </dd>
              </Fragment>
            ))}
          </dl>
        </PopoverContent>
      </Popover>
    </p>
  );
}
