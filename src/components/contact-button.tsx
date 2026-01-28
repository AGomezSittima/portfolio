import { LucideMail } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";
import type { AcceptedLanguage } from "@/i18n";

export function ContactIconButton({
  language,
}: {
  language: AcceptedLanguage;
}) {
  return (
    <ContactDialog
      trigger={
        <Button variant="outline" className="cursor-pointer">
          <span>
            <LucideMail className="size-5" />
          </span>
        </Button>
      }
      language={language}
    />
  );
}
