import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// `glass` sets its own fill, border and shadow, so it must replace shadcn's
// defaults (e.g. bg-popover, shadow-md) instead of losing to them. Its
// modifiers (glass-raised, glass-interactive) only set parameters
const twMerge = extendTailwindMerge<"glass">({
  extend: {
    // Type roles from global.css, so text-body isn't mistaken for a colour
    theme: {
      text: ["display", "section", "title", "body", "small", "label", "tag"],
    },
    classGroups: {
      glass: ["glass"],
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
