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
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { navigate } from "astro:transitions/client";

type LanguagePickerProps = {
  currentLanguage: AcceptedLanguage;
  currentUrl?: string;
  label?: string;
};

function handleLanguageChange(
  path: string,
  scrollY: number,
  language: AcceptedLanguage
) {
  document.cookie = `lang=${language}; path=/; max-age=31536000; SameSite=Lax; Secure`;

  localStorage.setItem("scrollY", scrollY.toString());

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
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        {Object.entries(languages).map(([code, lang], index) => {
          const acceptedCode = code as AcceptedLanguage;
          const translatePath = useTranslatedPath(acceptedCode);
          const path = translatePath(currentUrl || "/");
          const selected = acceptedCode === currentLanguage;

          return (
            <>
              {index > 0 && <Separator />}
              <DropdownMenuItem key={`language-${acceptedCode}`} asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(!selected && "font-normal")}
                  onClick={() => {
                    handleLanguageChange(path, window.scrollY, acceptedCode);
                  }}
                  disabled={selected}
                >
                  {selected && <span className="font-bold">• </span>}
                  <span>{lang}</span>
                </Button>
              </DropdownMenuItem>
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
