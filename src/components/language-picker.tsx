import { LucideLanguages } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { languages, type AcceptedLanguage } from "@/i18n";
import { useTranslatedPath } from "@/i18n/utils";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useState } from "react";

type LanguagePickerProps = {
  currentLanguage: AcceptedLanguage;
  currentUrl?: string;
  label?: string;
};

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
    <DropdownMenu
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
      modal={false}
    >
      <Tooltip open={tooltipOpen && !dropdownOpen} onOpenChange={handleTooltip}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={label}
              className="relative"
            >
              <span className="bg-secondary text-secondary-foreground text-2xs absolute -top-0.5 -right-0.5 rounded-4xl px-1 py-0.5">
                {currentLanguage.toUpperCase()}
              </span>
              <LucideLanguages />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, lang]) => {
          const translatePath = useTranslatedPath(code as AcceptedLanguage);

          return (
            <DropdownMenuItem key={`language-${code}`} asChild>
              <a href={translatePath(currentUrl || "/")}>{lang}</a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
