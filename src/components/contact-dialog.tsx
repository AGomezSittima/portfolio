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

type ContactDialogProps = {
  trigger: React.ReactNode;
  language: AcceptedLanguage;
};

export function ContactDialog({ trigger, language }: ContactDialogProps) {
  const [open, setOpen] = useState(false);

  const t = getI18n("contactFormData", language) as ContactFormDTO;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col gap-4 overflow-hidden p-5 sm:max-w-md sm:gap-5 sm:p-7">
        <DialogHeader className="gap-1.5">
          <DialogTitle asChild>
            <h3>{t.contactDialog.title}</h3>
          </DialogTitle>
          <DialogDescription>{t.contactDialog.description}</DialogDescription>
        </DialogHeader>
        <Button variant="glass" size="lg" asChild>
          <a href={`mailto:${EMAIL}`}>
            <LucideMail />
            {t.contactDialog.emailButtonText}
          </a>
        </Button>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <p className="eyebrow text-muted-foreground">
            {t.contactDialog.separatorText}
          </p>
          <Separator className="flex-1" />
        </div>
        <ContactForm
          language={language}
          onSuccess={({ title, description }) => {
            setOpen(false);

            toast.success(title, { description });
          }}
          onError={({ title, description }) => {
            toast.error(title, { description });
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
