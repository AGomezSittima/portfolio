import { LucideMail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ContactForm } from "./contact-form";
import { useState } from "react";
import { toast } from "sonner";
import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { ContactFormDTO } from "@/i18n/data/contact-form";

export function ContactButton({
  label,
  language,
}: {
  label: string;
  language: AcceptedLanguage;
}) {
  const [open, setOpen] = useState(false);

  const t = getI18n("contactFormData", language) as ContactFormDTO;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <LucideMail />
          <span>{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.form.title}</DialogTitle>
          <DialogDescription>{t.form.description}</DialogDescription>
        </DialogHeader>
        <ContactForm
          language={language}
          onSuccess={(message) => {
            setOpen(false);

            toast.success(message);
          }}
          onError={(message) => {
            toast.error(message);
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
