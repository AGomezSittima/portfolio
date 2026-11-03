import { LucideMoon, LucideSun } from "lucide-react";
import { IconButton } from "./icon-button";
import { useSyncExternalStore, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const iconClass =
  "group-hover:drop-shadow-glow duration-flourish relative transition";

interface ThemeToggleProps {
  tooltip?: string;
  label?: string;
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

function useIsDark() {
  return useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );
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

    // Commit the new styles without transitions before re-enabling them
    getComputedStyle(document.body);
    setTimeout(() => element.classList.remove("theme-transition"));
    return;
  }

  document
    .startViewTransition(() => toggleTheme(e, element))
    .finished.finally(() => {
      element.classList.remove("theme-transition");
    });
}

export function ThemeToggle({ tooltip, label }: ThemeToggleProps) {
  const isDark = useIsDark();

  return (
    <IconButton
      id="themeToggle"
      size="icon-lg"
      tooltip={tooltip}
      aria-label={label ?? tooltip}
      aria-pressed={isDark}
      onClick={handleClick}
      className="glass-raised group relative overflow-hidden"
    >
      <span
        aria-hidden
        className="bg-toggle-glow duration-emphasis motion-safe:group-hover:animate-spin-slow pointer-events-none absolute inset-1 rounded-full opacity-0 blur-xs transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <LucideSun
        className={cn(
          iconClass,
          "group-hover:text-amber-600 motion-safe:group-hover:rotate-90 dark:hidden"
        )}
      />
      <LucideMoon
        className={cn(
          iconClass,
          "hidden group-hover:text-sky-300 motion-safe:group-hover:-rotate-20 dark:block"
        )}
      />
    </IconButton>
  );
}
