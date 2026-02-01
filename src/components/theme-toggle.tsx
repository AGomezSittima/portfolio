import { LucideMoon, LucideSun } from "lucide-react";
import { IconButton } from "./icon-button";

interface ThemeToggleProps {
  tooltip?: string;
}

export function ThemeToggle({ tooltip }: ThemeToggleProps) {
  return (
    <IconButton
      id="themeToggle"
      variant="ghost"
      tooltip={tooltip}
      aria-label={tooltip}
      onClick={() => {
        const element = document.documentElement;

        const setTheme = () => {
          element.classList.toggle("dark");
          const isDark = element.classList.contains("dark");
          localStorage.setItem("theme", isDark ? "dark" : "light");
        };

        if (!document.startViewTransition) {
          setTheme();
          return;
        }

        document.startViewTransition(() => {
          setTheme();
        });
      }}
    >
      <LucideSun className="dark:hidden" />
      <LucideMoon className="hidden dark:block" />
    </IconButton>
  );
}
