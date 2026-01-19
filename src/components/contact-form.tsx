import {
  contactMeSchema,
  localizedContactMeSchema,
} from "@/actions/contact/schema";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { actions } from "astro:actions";
import { z } from "astro/zod";
import { useState } from "react";
import { SubmitButton } from "./submit-button";
import { Spinner } from "./ui/spinner";
import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { ContactFormDTO } from "@/i18n/data/contact-form";

const defaultValues: z.input<typeof contactMeSchema> = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

type ContactFormProps = {
  language: AcceptedLanguage;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  onCancel?: () => void;
};

export function ContactForm({
  language,
  onSuccess,
  onError,
  onCancel,
}: ContactFormProps) {
  const t = getI18n("contactFormData", language) as ContactFormDTO;

  const formSchema = localizedContactMeSchema(language);
  const form = useForm({
    defaultValues,
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true);

      try {
        const { data: responseData, error } =
          await actions.contact.contactMe(value);

        if (error || !responseData.success) {
          onError?.(t.form.onError);

          return;
        }

        onSuccess?.(t.form.onSuccess);
      } catch (error) {
        console.error(error);
      } finally {
        setIsPending(false);
      }
    },
  });

  const [isPending, setIsPending] = useState(false);

  return (
    <form
      id="contact-form"
      onSubmit={(e) => {
        e.preventDefault();

        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="fullName"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const tField = t.form.fields[field.name];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{tField.label} (*)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={tField.placeholder}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const tField = t.form.fields[field.name];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{tField.label} (*)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={tField.placeholder}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="subject"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const tField = t.form.fields[field.name];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{tField.label} (*)</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={tField.placeholder}
                  autoComplete="off"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="message"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const tField = t.form.fields[field.name];

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>{tField.label} (*)</FieldLabel>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={tField.placeholder}
                  autoComplete="off"
                  className="max-h-44 min-h-24 resize-none overflow-y-auto"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <Field orientation="horizontal">
          <SubmitButton className="flex-1" isPending={isPending}>
            {isPending && <Spinner />}
            <span>{isPending ? t.form.pending : t.form.submit}</span>
          </SubmitButton>

          <Button type="button" variant="outline" onClick={() => onCancel?.()}>
            {t.form.cancel}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
