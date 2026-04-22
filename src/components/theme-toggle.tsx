import { LucideMoon, LucideSun } from "lucide-react";
import { IconButton } from "./icon-button";
import type { MouseEvent } from "react";

interface ThemeToggleProps {
  tooltip?: string;
}

function toggleTheme(e: MouseEvent<HTMLButtonElement>, element: HTMLElement) {
  const x = e.clientX;
  const y = e.clientY;

  element.style.setProperty("--ripple-x", `${x}px`);
  element.style.setProperty("--ripple-y", `${y}px`);

  element.classList.add("theme-transition");

  const isDark = element.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function handleClick(e: MouseEvent<HTMLButtonElement>) {
  const element = document.documentElement;

  const astroTransitionRunning = element.hasAttribute("data-astro-transition");

  if (!document.startViewTransition || astroTransitionRunning) {
    toggleTheme(e, element);
    return;
  }

  document
    .startViewTransition(() => toggleTheme(e, element))
    .finished.finally(() => {
      element.classList.remove("theme-transition");
    });
}

export function ThemeToggle({ tooltip }: ThemeToggleProps) {
  return (
    <IconButton
      id="themeToggle"
      variant="ghost"
      tooltip={tooltip}
      aria-label={tooltip}
      onClick={handleClick}
    >
      <LucideSun className="dark:hidden" />
      <LucideMoon className="hidden dark:block" />
    </IconButton>
  );
}
