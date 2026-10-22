import { LucideMail } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import type { AcceptedLanguage } from "@/i18n";
import { IconButton } from "./icon-button";

type ContactIconButtonProps = {
  language: AcceptedLanguage;
  tooltip?: string;
};

export function ContactIconButton({
  language,
  tooltip,
}: ContactIconButtonProps) {
  return (
    <ContactDialog
      trigger={
        <IconButton
          variant="outline"
          className="cursor-pointer"
          tooltip={tooltip}
          aria-label={tooltip}
        >
          <span>
            <LucideMail className="size-5" />
          </span>
        </IconButton>
      }
      language={language}
    />
  );
}
