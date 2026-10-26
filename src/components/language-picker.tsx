import { LucideCheck, LucideChevronDown } from "lucide-react";
import { useState } from "react";
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

function handleLanguageChange(path: string, language: AcceptedLanguage) {
  document.cookie = `lang=${language}; path=/; max-age=31536000; SameSite=Lax; Secure`;

  localStorage.setItem("scrollY", window.scrollY.toString());

  navigate(path);
}

export function LanguagePicker({
  currentLanguage,
  currentUrl,
  label,
}: LanguagePickerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltip = (open: boolean) => {
    if (dropdownOpen) return;

    setTooltipOpen(open);
  };

  return (
    <TooltipProvider>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
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
                className="glass-raised gap-1 pr-2.5 pl-3.5 font-mono has-[>svg]:pr-2.5 has-[>svg]:pl-3.5 [&[data-state=open]>svg]:rotate-180"
              >
                {currentLanguage.toUpperCase()}
                <LucideChevronDown
                  aria-hidden
                  className="text-muted-foreground/80 size-3.5! duration-200 motion-safe:transition-transform"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" sideOffset={8} className="min-w-40">
          {(Object.keys(languages) as AcceptedLanguage[]).map((code) => {
            const path = useTranslatedPath(code)(currentUrl || "/");
            const selected = code === currentLanguage;

            return (
              <DropdownMenuItem
                key={`language-${code}`}
                disabled={selected}
                aria-current={selected ? "true" : undefined}
                onSelect={() => handleLanguageChange(path, code)}
                className={cn(
                  "gap-3",
                  selected && "text-foreground opacity-100!"
                )}
              >
                <span className="text-tag text-muted-foreground w-5 font-mono">
                  {code.toUpperCase()}
                </span>
                <span className="flex-1">{languages[code]}</span>
                {selected && <LucideCheck className="text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
