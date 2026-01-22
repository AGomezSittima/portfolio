import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { ContactFormDTO } from "@/i18n/data/contact-form";
import { z } from "astro:schema";

export const localizedContactMeSchema = (lang: AcceptedLanguage) => {
  const t = getI18n("contactFormData", lang) as ContactFormDTO;

  return z.object({
    fullName: z
      .string()
      .min(1, t.contactDialog.form.fieldErrors.required)
      .max(255, t.contactDialog.form.fieldErrors.tooLong),
    email: z
      .string()
      .min(1, t.contactDialog.form.fieldErrors.required)
      .email(t.contactDialog.form.fieldErrors.invalidEmail),
    subject: z
      .string()
      .min(1, t.contactDialog.form.fieldErrors.required)
      .max(255, t.contactDialog.form.fieldErrors.tooLong),
    message: z
      .string()
      .min(1, t.contactDialog.form.fieldErrors.required)
      .max(5000, t.contactDialog.form.fieldErrors.tooLong),
  });
};

export const contactMeSchema = z.object({
  fullName: z.string().min(1, "Is required").max(255, "Too long"),
  email: z.string().min(1, "Is required").email("Invalid email address"),
  subject: z.string().min(1, "Is required").max(255, "Too long"),
  message: z.string().min(1, "Is required").max(5000, "Too long"),
});
