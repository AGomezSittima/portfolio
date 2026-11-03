import { useFieldContext } from "@/hooks/form-context";
import type { ComponentProps } from "react";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  type?: ComponentProps<"input">["type"];
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
};

// A required string field: label, input and error, linked for screen readers.
// Errors show once the field has been touched.
export function TextField({
  label,
  type,
  multiline,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const errorId = `${field.name}-error`;

  const controlProps = {
    ...props,
    id: field.name,
    name: field.name,
    value: field.state.value,
    onBlur: field.handleBlur,
    required: true,
    "aria-invalid": isInvalid,
    "aria-describedby": isInvalid ? errorId : undefined,
  };

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {multiline ? (
        <Textarea
          {...controlProps}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      ) : (
        <Input
          {...controlProps}
          type={type}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      )}
      {isInvalid && (
        <FieldError id={errorId} errors={field.state.meta.errors} />
      )}
    </Field>
  );
}
