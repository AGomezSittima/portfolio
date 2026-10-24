import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

type SubmitButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

export function SubmitButton({
  children,
  isPending,
  variant,
  size,
  className,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={cn(className)}
      disabled={isPending}
    >
      {children}
    </Button>
  );
}
