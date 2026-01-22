import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { AnchorHTMLAttributes, AriaAttributes } from "react";

type TooltipOptions = {
  tooltipSide?: React.ComponentProps<typeof TooltipPrimitive.Content>["side"];
  tooltipAlign?: React.ComponentProps<typeof TooltipPrimitive.Content>["align"];
};

type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: AriaAttributes["aria-label"];
  variant?: ButtonVariant;
  size?: Extract<ButtonSize, "icon" | "icon-sm" | "icon-lg">;
  tooltip?: string;
} & TooltipOptions;

export function IconButton({
  children,
  className,
  "aria-label": ariaLabel,
  variant = "outline",
  size = "icon",
  tooltip,
  tooltipSide = "top",
  tooltipAlign = "center",
}: IconButtonProps) {
  const button = (
    <Button
      className={className}
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      asChild
    >
      {children}
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

type LinkOptions = {
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type LinkIconButtonProps = IconButtonProps & {
  href: string;
} & LinkOptions;

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
  return (
    <IconButton
      className={className}
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      tooltip={tooltip}
      tooltipSide={tooltipSide}
      tooltipAlign={tooltipAlign}
    >
      <a href={href} {...linkOptions}>
        {children}
      </a>
    </IconButton>
  );
}
