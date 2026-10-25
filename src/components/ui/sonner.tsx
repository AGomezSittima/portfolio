import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-center"
      icons={{
        success: <CircleCheckIcon className="text-primary-on-glass size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="text-destructive size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "glass-raised bg-(--glass-solid)/85 text-foreground font-sans flex w-(--width) items-center gap-3 rounded-2xl px-4 py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 *:transition-opacity data-[expanded=false]:data-[front=false]:*:opacity-0",
          icon: "flex size-4 shrink-0 items-center",
          content: "flex min-w-0 flex-1 flex-col gap-0.5",
          title: "font-medium leading-snug",
          description: "text-body",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
