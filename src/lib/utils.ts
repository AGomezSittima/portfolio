import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Glass utilities set their own fill, border and shadow, so they must replace
// shadcn's defaults (e.g. bg-popover, shadow-md) instead of losing to them
const twMerge = extendTailwindMerge<"glass">({
  extend: {
    classGroups: {
      glass: ["glass", "glass-raised"],
    },
    conflictingClassGroups: {
      glass: [
        "bg-color",
        "border-color",
        "border-w",
        "shadow",
        "shadow-color",
        "backdrop-filter",
        "backdrop-blur",
        "backdrop-saturate",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
