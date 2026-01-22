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
import React, { useState } from "react";
import { toast } from "sonner";
import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { ContactFormDTO } from "@/i18n/data/contact-form";
import { Separator } from "./ui/separator";
import { EMAIL } from "astro:env/client";

export function ContactDialog({
  trigger,
  language,
}: {
  trigger: React.ReactNode;
  language: AcceptedLanguage;
}) {
  const [open, setOpen] = useState(false);

  const t = getI18n("contactFormData", language) as ContactFormDTO;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h3>{t.contactDialog.title}</h3>
          </DialogTitle>
          <DialogDescription>{t.contactDialog.description}</DialogDescription>
        </DialogHeader>
        <Button variant="secondary" asChild>
          <a href={`mailto:${EMAIL}`}>
            <LucideMail />
            {t.contactDialog.emailButtonText}
          </a>
        </Button>
        <div className="text-muted-foreground flex items-center gap-4">
          <Separator className="flex-1" />
          <p>{t.contactDialog.separatorText}</p>
          <Separator className="flex-1" />
        </div>
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
