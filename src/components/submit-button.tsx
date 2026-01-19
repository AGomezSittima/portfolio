import { cn } from "@/lib/utils";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  isPending?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
