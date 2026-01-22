import { LucideMail } from "lucide-react";
import { ContactDialog } from "./contact-dialog";
import { Button } from "./ui/button";

export function ContactIconButton() {
  return (
    <ContactDialog
      trigger={
        <Button variant="outline" className="cursor-pointer">
          <span>
            <LucideMail className="size-5" />
          </span>
        </Button>
      }
      language="en"
    />
  );
}
