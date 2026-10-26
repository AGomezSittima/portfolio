import { LucideMail } from "lucide-react";
import type { ComponentProps } from "react";
import type { AcceptedLanguage } from "@/i18n";
import { ContactDialog } from "./contact-dialog";
import { IconButton } from "./icon-button";
import { Button } from "./ui/button";

function MailFilledIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

type ContactIconButtonProps = {
  language: AcceptedLanguage;
  tooltip?: string;
  size?: ComponentProps<typeof IconButton>["size"];
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
          <MailFilledIcon />
        </IconButton>
      }
      language={language}
    />
  );
}

type ContactButtonProps = {
  label: string;
  language: AcceptedLanguage;
};

export function HeroContactButton({ label, language }: ContactButtonProps) {
  return (
    <ContactDialog
      trigger={<Button size="lg">{label}</Button>}
      language={language}
    />
  );
}

export function NavContactButton({ label, language }: ContactButtonProps) {
  return (
    <ContactDialog
      language={language}
      trigger={
        <Button
          variant="ghost"
          className="has-[>svg]:px-2.5 sm:px-3.5 sm:has-[>svg]:px-3.5"
        >
          <LucideMail aria-hidden />
          <span className="sr-only sm:not-sr-only">{label}</span>
        </Button>
      }
    />
  );
}
