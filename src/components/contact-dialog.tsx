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
import { glassButtonClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

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
      <DialogContent className="glass-raised gap-5 rounded-3xl bg-(--glass-solid)/85 p-6 sm:max-w-md sm:p-7">
        <DialogHeader className="gap-1.5">
          <DialogTitle asChild>
            <h3 className="text-xl leading-7 font-semibold tracking-[-0.01em]">
              {t.contactDialog.title}
            </h3>
          </DialogTitle>
          <DialogDescription className="text-body">
            {t.contactDialog.description}
          </DialogDescription>
        </DialogHeader>
        <Button
          variant={null}
          asChild
          className={cn(glassButtonClass, "h-10 font-medium")}
        >
          <a href={`mailto:${EMAIL}`}>
            <LucideMail />
            {t.contactDialog.emailButtonText}
          </a>
        </Button>
        <div className="flex items-center gap-4">
          <Separator className="bg-divider flex-1" />
          <p className="eyebrow">{t.contactDialog.separatorText}</p>
          <Separator className="bg-divider flex-1" />
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
