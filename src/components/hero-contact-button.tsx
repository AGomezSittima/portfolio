import type { AcceptedLanguage } from "@/i18n";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";

type HeroContactButtonProps = {
  label: string;
  language: AcceptedLanguage;
};

export function HeroContactButton({ label, language }: HeroContactButtonProps) {
  return (
    <ContactDialog trigger={<Button>{label}</Button>} language={language} />
  );
}
