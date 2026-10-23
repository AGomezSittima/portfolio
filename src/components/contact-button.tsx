import { LucideMail } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import type { AcceptedLanguage } from "@/i18n";
import { IconButton } from "./icon-button";

type ContactIconButtonProps = {
  language: AcceptedLanguage;
  tooltip?: string;
  size?: React.ComponentProps<typeof IconButton>["size"];
};

export function ContactIconButton({
  language,
  tooltip,
  size,
}: ContactIconButtonProps) {
  return (
    <ContactDialog
      trigger={
        <IconButton size={size} tooltip={tooltip} aria-label={tooltip}>
          <LucideMail />
        </IconButton>
      }
      language={language}
    />
  );
}
