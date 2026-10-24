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
      size="icon-lg"
      tooltip={tooltip}
      aria-label={tooltip}
      onClick={handleClick}
      className="group relative overflow-hidden"
    >
      <span
        aria-hidden
        className="motion-safe:group-hover:animate-toggle-glow pointer-events-none absolute inset-1 rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(120,185,255,0.55),transparent_60%),radial-gradient(circle_at_62%_38%,rgba(255,205,110,0.65),transparent_58%)] opacity-0 blur-[3px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-[radial-gradient(circle_at_40%_60%,rgba(91,147,255,0.45),transparent_65%)]"
      />
      <LucideSun className="relative transition-[rotate,filter,color] duration-500 ease-out group-hover:text-amber-600 group-hover:drop-shadow-[0_0_4px_rgba(217,119,6,0.55)] motion-safe:group-hover:rotate-90 dark:hidden" />
      <LucideMoon className="relative hidden transition-[rotate,filter,color] duration-500 ease-out group-hover:text-sky-300 group-hover:drop-shadow-[0_0_6px_rgba(110,170,255,0.95)] motion-safe:group-hover:-rotate-20 dark:block" />
    </IconButton>
  );
}
