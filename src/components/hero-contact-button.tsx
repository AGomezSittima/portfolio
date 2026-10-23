import type { AcceptedLanguage } from "@/i18n";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";

type HeroContactButtonProps = {
  label: string;
  language: AcceptedLanguage;
};

export function HeroContactButton({ label, language }: HeroContactButtonProps) {
  return (
    <ContactDialog
      trigger={
        <Button className="hover:bg-primary-hover h-10 rounded-full px-5 font-semibold shadow-[0_6px_20px_-8px_var(--primary)]">
          {label}
        </Button>
      }
      language={language}
    />
  );
}
