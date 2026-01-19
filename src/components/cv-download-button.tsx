import { LucideChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { languages, type AcceptedLanguage } from "@/i18n";
import { resumePath } from "@/lib/paths";
import { toAcceptedLanguage } from "@/i18n/utils";
import { cn } from "@/lib/utils";

type CVDownloadButtonProps = {
  label: string;
  currentLanguageCode: AcceptedLanguage;
  optionLabels: Record<AcceptedLanguage, string>;
};

export function CVDownloadButton({
  label,
  optionLabels,
  currentLanguageCode,
}: CVDownloadButtonProps) {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <a
          href={resumePath(currentLanguageCode)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      </Button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm" aria-label="More Options">
            <LucideChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(optionLabels).map(([code, label]) => {
            const isCurrentLanguage = code === currentLanguageCode;
            const acceptedCode = toAcceptedLanguage(code);

            return (
              <DropdownMenuItem
                key={`cv-${acceptedCode}`}
                className={cn(isCurrentLanguage && "text-primary")}
              >
                <a
                  href={resumePath(acceptedCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
