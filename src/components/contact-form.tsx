import {
  contactMeSchema,
  localizedContactMeSchema,
} from "@/actions/contact/schema";
import { useAppForm } from "@/hooks/use-app-form";
import { useSendContactMessage } from "@/hooks/use-send-contact-message";
import { useSelector } from "@tanstack/react-form";
import { FieldGroup, Field } from "./ui/field";
import { Button } from "./ui/button";
import { z } from "astro/zod";
import { useRef } from "react";
import { Spinner } from "./ui/spinner";
import { PrivacyNotice } from "./privacy-notice";
import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { ContactFormDTO } from "@/i18n/data/contact-form";

const defaultValues: z.input<typeof contactMeSchema> = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

// In display order, to focus the first invalid field on submit
const fieldNames = Object.keys(defaultValues) as Array<
  keyof typeof defaultValues
>;

type ContactFormProps = {
  language: AcceptedLanguage;
  onSuccess?: (
    message: ContactFormDTO["contactDialog"]["form"]["onSuccess"]
  ) => void;
  onError?: (
    message: ContactFormDTO["contactDialog"]["form"]["onError"]
  ) => void;
  onCancel?: () => void;
};

export function ContactForm({
  language,
  onSuccess,
  onError,
  onCancel,
}: ContactFormProps) {
  const t = getI18n("contactFormData", language) as ContactFormDTO;
  const tFields = t.contactDialog.form.fields;

  const send = useSendContactMessage();
  const honeypot = useRef<HTMLInputElement>(null);

  const formSchema = localizedContactMeSchema(language);
  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const sent = await send({
        ...value,
        website: honeypot.current?.value,
      });

      if (sent) onSuccess?.(t.contactDialog.form.onSuccess);
      else onError?.(t.contactDialog.form.onError);
    },
    onSubmitInvalid: ({ formApi }) => {
      const firstInvalid = fieldNames.find(
        (name) => formApi.getFieldMeta(name)?.errors.length
      );

      if (!firstInvalid) return;

      // Wait for the error to render so it is read with the field
      requestAnimationFrame(() => {
        document.getElementById(firstInvalid)?.focus();
      });
    },
  });

  const isPending = useSelector(form.store, (state) => state.isSubmitting);

  return (
    <div className="flex min-h-0 flex-col">
      <h4 className="text-body mb-3 font-semibold sm:mb-4">
        {t.contactDialog.form.title}
      </h4>
      <form
        id="contact-form"
        className="flex min-h-0 flex-col"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();

          form.handleSubmit();
        }}
      >
        <div aria-hidden="true" className="sr-only">
          <input
            ref={honeypot}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="-m-1 min-h-0 overflow-y-auto p-1">
          <FieldGroup className="gap-5 sm:gap-7">
            <form.AppField
              name="fullName"
              children={(field) => (
                <field.TextField {...tFields.fullName} autoComplete="name" />
              )}
            />
            <form.AppField
              name="email"
              children={(field) => (
                <field.TextField
                  {...tFields.email}
                  type="email"
                  autoComplete="email"
                />
              )}
            />
            <form.AppField
              name="subject"
              children={(field) => (
                <field.TextField {...tFields.subject} autoComplete="off" />
              )}
            />
            <form.AppField
              name="message"
              children={(field) => (
                <field.TextField
                  {...tFields.message}
                  multiline
                  autoComplete="off"
                  className="max-h-44 min-h-20 resize-none overflow-y-auto sm:min-h-24"
                />
              )}
            />
          </FieldGroup>
        </div>
        <Field orientation="horizontal" className="mt-4 sm:mt-6">
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            disabled={isPending}
          >
            {isPending && <Spinner />}
            <span>
              {isPending
                ? t.contactDialog.form.pending
                : t.contactDialog.form.submit}
            </span>
          </Button>
          <Button
            type="button"
            variant="glass"
            size="lg"
            onClick={() => onCancel?.()}
          >
            {t.contactDialog.form.cancel}
          </Button>
        </Field>
        <PrivacyNotice language={language} className="mt-3" />
      </form>
    </div>
  );
}
