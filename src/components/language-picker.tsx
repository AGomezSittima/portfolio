import { LucideCheck, LucideChevronDown } from "lucide-react";
import { useState } from "react";
import { navigate } from "astro:transitions/client";
import { languages, type AcceptedLanguage } from "@/i18n";
import { useTranslatedPath } from "@/i18n/utils";
import { glassButtonClass } from "@/lib/styles";
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
                variant={null}
                aria-label={label}
                className={cn(
                  glassButtonClass,
                  "tag h-10 gap-1 pr-2.5 pl-3.5 font-medium has-[>svg]:pr-2.5 has-[>svg]:pl-3.5 [&[data-state=open]>svg]:rotate-180"
                )}
              >
                {currentLanguage.toUpperCase()}
                <LucideChevronDown
                  aria-hidden
                  className="text-subtle dark:text-foreground/80 size-3.5! transition-transform duration-200"
                />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="glass-raised min-w-40 rounded-2xl p-1.5"
        >
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
                  "text-body focus:text-foreground cursor-pointer gap-3 rounded-full px-3 py-2 focus:bg-(--glass-capsule)",
                  selected && "text-foreground opacity-100!"
                )}
              >
                <span className="tag text-subtle w-5">
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
