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
          onError?.(t.contactDialog.form.onError);

          return;
        }

        onSuccess?.(t.contactDialog.form.onSuccess);
      } catch (error) {
        console.error(error);
        onError?.(t.contactDialog.form.onError);
      } finally {
        setIsPending(false);
      }
    },
  });

  const [isPending, setIsPending] = useState(false);

  return (
    <div className="flex min-h-0 flex-col">
      <h4 className="text-body mb-3 font-semibold sm:mb-4">
        {t.contactDialog.form.title}
      </h4>
      <form
        id="contact-form"
        className="flex min-h-0 flex-col"
        onSubmit={(e) => {
          e.preventDefault();

          form.handleSubmit();
        }}
      >
        <div className="-m-1 min-h-0 overflow-y-auto p-1">
          <FieldGroup className="gap-5 sm:gap-7">
            <form.Field
              name="fullName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const tField = t.contactDialog.form.fields[field.name];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{tField.label}</FieldLabel>
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const tField = t.contactDialog.form.fields[field.name];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{tField.label}</FieldLabel>
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="subject"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const tField = t.contactDialog.form.fields[field.name];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{tField.label}</FieldLabel>
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
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="message"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const tField = t.contactDialog.form.fields[field.name];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>{tField.label}</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder={tField.placeholder}
                      autoComplete="off"
                      className="max-h-44 min-h-20 resize-none overflow-y-auto sm:min-h-24"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </div>
        <Field orientation="horizontal" className="mt-4 sm:mt-6">
          <SubmitButton size="lg" className="flex-1" isPending={isPending}>
            {isPending && <Spinner />}
            <span>
              {isPending
                ? t.contactDialog.form.pending
                : t.contactDialog.form.submit}
            </span>
          </SubmitButton>
          <Button
            type="button"
            variant="glass"
            size="lg"
            onClick={() => onCancel?.()}
          >
            {t.contactDialog.form.cancel}
          </Button>
        </Field>
      </form>
    </div>
  );
}
