import {
  LucideCheck,
  LucideChevronDown,
  LucideLoaderCircle,
} from "lucide-react";
import { useState } from "react";
import { prefetch } from "astro:prefetch";
import { navigate } from "astro:transitions/client";
import { languages, type AcceptedLanguage } from "@/i18n";
import { useTranslatedPath } from "@/i18n/utils";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type LanguagePickerProps = {
  currentLanguage: AcceptedLanguage;
  currentUrl?: string;
  label?: string;
};

// Delay before showing the spinner, so cached pages don't flash it
const PENDING_DELAY_MS = 150;

export function LanguagePicker({
  currentLanguage,
  currentUrl,
  label,
}: LanguagePickerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const codes = Object.keys(languages) as AcceptedLanguage[];
  const paths = Object.fromEntries(
    codes.map((code) => [code, useTranslatedPath(code)(currentUrl || "/")])
  ) as Record<AcceptedLanguage, string>;

  const prefetchOthers = () => {
    codes
      .filter((code) => code !== currentLanguage)
      .forEach((code) => prefetch(paths[code]));
  };

  const handleDropdown = (open: boolean) => {
    if (open) prefetchOthers();

    setDropdownOpen(open);
  };

  // The router fetches the new page before the view transition starts
  const handleLanguageChange = (language: AcceptedLanguage) => {
    document.cookie = `lang=${language}; path=/; max-age=31536000; SameSite=Lax; Secure`;

    localStorage.setItem("scrollY", window.scrollY.toString());

    const timer = setTimeout(() => setPending(true), PENDING_DELAY_MS);

    navigate(paths[language]).finally(() => {
      clearTimeout(timer);
      setPending(false);
    });
  };

  const handleTooltip = (open: boolean) => {
    if (dropdownOpen) return;

    setTooltipOpen(open);
  };

  return (
    <TooltipProvider>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={handleDropdown}
        modal={false}
      >
        <Tooltip
          open={tooltipOpen && !dropdownOpen}
          onOpenChange={handleTooltip}
        >
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="glass"
                size="lg"
                aria-label={label}
                aria-busy={pending}
                onPointerEnter={prefetchOthers}
                className="glass-raised gap-1 pr-2.5 pl-3.5 font-mono has-[>svg]:pr-2.5 has-[>svg]:pl-3.5 [&[data-state=open]>svg]:rotate-180"
              >
                {currentLanguage.toUpperCase()}
                {pending ? (
                  <LucideLoaderCircle
                    aria-hidden
                    className="text-muted-foreground/80 size-3.5! motion-safe:animate-spin"
                  />
                ) : (
                  <LucideChevronDown
                    aria-hidden
                    className="text-muted-foreground/80 size-3.5! duration-200 motion-safe:transition-transform"
                  />
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-40">
          {codes.map((code) => {
            const selected = code === currentLanguage;

            return (
              <DropdownMenuItem
                key={`language-${code}`}
                disabled={selected}
                aria-current={selected ? "true" : undefined}
                onSelect={() => handleLanguageChange(code)}
                className={cn(
                  "gap-3",
                  selected && "text-foreground opacity-100!"
                )}
              >
                <span className="text-tag text-muted-foreground w-5 font-mono">
                  {code.toUpperCase()}
                </span>
                <span lang={code} className="flex-1">
                  {languages[code]}
                </span>
                {selected && <LucideCheck className="text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
