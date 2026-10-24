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
          variant={null}
          className="bg-primary/10 text-primary-on-glass hover:bg-primary hover:text-primary-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground h-9 gap-2 rounded-full px-2.5 tracking-[-0.005em] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--primary)_18%,transparent)] transition-colors duration-200 hover:shadow-[0_4px_14px_-4px_var(--primary)] has-[>svg]:px-2.5 sm:px-3.5 sm:has-[>svg]:px-3.5"
        >
          <LucideMail aria-hidden />
          <span className="sr-only sm:not-sr-only">{label}</span>
        </Button>
      }
    />
  );
}
