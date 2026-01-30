import { LucideMail } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";
import type { AcceptedLanguage } from "@/i18n";

export function ContactIconButton({
  language,
  "aria-label": ariaLabel,
}: {
  language: AcceptedLanguage;
  "aria-label"?: string;
}) {
  return (
    <ContactDialog
      trigger={
        <Button
          variant="outline"
          className="cursor-pointer"
          aria-label={ariaLabel}
        >
          <span>
            <LucideMail className="size-5" />
          </span>
        </Button>
      }
      language={language}
    />
  );
}
