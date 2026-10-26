import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import type { AnchorHTMLAttributes, ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;
type TooltipContentProps = ComponentProps<typeof TooltipContent>;

type TooltipOptions = {
  tooltipSide?: TooltipContentProps["side"];
  tooltipAlign?: TooltipContentProps["align"];
};

type IconButtonProps = ComponentProps<"button"> & {
  asChild?: boolean;
  variant?: ButtonProps["variant"];
  size?: Extract<ButtonProps["size"], "icon" | "icon-sm" | "icon-lg">;
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
  const button = (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side={tooltipSide} align={tooltipAlign}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
