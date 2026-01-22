import type { AcceptedLanguage } from "@/i18n";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";

export function HeroContactButton({
  label,
  language,
}: {
  label: string;
  language: AcceptedLanguage;
}) {
  return (
    <ContactDialog trigger={<Button>{label}</Button>} language={language} />
  );
}
