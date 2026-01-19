import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type {
  AnchorHTMLAttributes,
  AriaAttributes,
  HTMLAttributes,
} from "react";

type LinkOptions = {
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type TooltipOptions = {
  tooltipSide?: React.ComponentProps<typeof TooltipPrimitive.Content>["side"];
  tooltipAlign?: React.ComponentProps<typeof TooltipPrimitive.Content>["align"];
};

type LinkIconButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  variant?: ButtonVariant;
  size?: Extract<ButtonSize, "icon" | "icon-sm" | "icon-lg">;
  tooltip?: string;
} & LinkOptions &
  TooltipOptions;

export function LinkIconButton({
  href,
  children,
  className,
  "aria-label": ariaLabel,
  variant = "outline",
  size = "icon",
  tooltip,
  tooltipSide = "top",
  tooltipAlign = "center",
  ...linkOptions
}: LinkIconButtonProps) {
  const button = (
    <Button
      className={className}
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      asChild
    >
      <a href={href} {...linkOptions}>
        {children}
      </a>
    </Button>
  );

  return tooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side={tooltipSide} align={tooltipAlign}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  ) : (
    button
  );
}
