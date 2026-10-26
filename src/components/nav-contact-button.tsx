import { LucideMail } from "lucide-react";
import type { AcceptedLanguage } from "@/i18n";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";

type NavContactButtonProps = {
  label: string;
  language: AcceptedLanguage;
};

export function NavContactButton({ label, language }: NavContactButtonProps) {
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
