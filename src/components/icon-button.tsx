import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { glassButtonClass } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { AnchorHTMLAttributes } from "react";

type TooltipOptions = {
  tooltipSide?: React.ComponentProps<typeof TooltipPrimitive.Content>["side"];
  tooltipAlign?: React.ComponentProps<typeof TooltipPrimitive.Content>["align"];
};

type IconButtonVariant = ButtonVariant | "glass";

type IconButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: IconButtonVariant;
  size?: Extract<ButtonSize, "icon" | "icon-sm" | "icon-lg">;
  tooltip?: string;
} & TooltipOptions;

export function IconButton({
  children,
  className,
  variant = "glass",
  size = "icon",
  asChild = false,
  tooltip,
  tooltipSide = "top",
  tooltipAlign = "center",
  ...props
}: IconButtonProps) {
  const isGlass = variant === "glass";

  const button = (
    <Button
      variant={isGlass ? null : variant}
      size={size}
      asChild={asChild}
      className={cn(isGlass && glassButtonClass, className)}
      {...props}
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
  href: string;
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

type LinkIconButtonProps = IconButtonProps & {
  href: string;
} & LinkOptions;

export function LinkIconButton({
  children,
  variant = "glass",
  size = "icon",
  tooltip,
  tooltipSide = "top",
  tooltipAlign = "center",
  href,
  rel,
  target,
  ...props
}: LinkIconButtonProps) {
  return (
    <IconButton
      variant={variant}
      size={size}
      tooltip={tooltip}
      tooltipSide={tooltipSide}
      tooltipAlign={tooltipAlign}
      asChild
      {...props}
    >
      <a href={href} rel={rel} target={target}>
        {children}
      </a>
    </IconButton>
  );
}
