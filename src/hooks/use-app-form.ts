import { TextField } from "@/components/text-field";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context";

// useForm with the shared field components (form.AppField → field.TextField)
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: {},
});
