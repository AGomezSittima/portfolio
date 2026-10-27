import { LucideChevronDown, LucideDownload } from "lucide-react";
import { ExternalLink } from "./external-link";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { type AcceptedLanguage } from "@/i18n";
import { resumePath } from "@/lib/paths";
import { toAcceptedLanguage } from "@/i18n/utils";
import { cn } from "@/lib/utils";

type CVDownloadButtonProps = {
  label: string;
  menuLabel: string;
  currentLanguageCode: AcceptedLanguage;
  optionLabels: Record<AcceptedLanguage, string>;
};

export function CVDownloadButton({
  label,
  menuLabel,
  optionLabels,
  currentLanguageCode,
}: CVDownloadButtonProps) {
  return (
    <ButtonGroup className="glass h-10 rounded-full">
      <Button
        variant="ghost"
        asChild
        className="h-full gap-2 pr-3.5 pl-4 has-[>svg]:pl-4"
      >
        <ExternalLink
          href={resumePath(currentLanguageCode)}
          language={currentLanguageCode}
        >
          <LucideDownload aria-hidden />
          {label}
        </ExternalLink>
      </Button>
      <ButtonGroupSeparator className="bg-border my-2.5" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            aria-label={menuLabel}
            className="data-[state=open]:bg-accent h-full pr-3 pl-2.5 has-[>svg]:pr-3 has-[>svg]:pl-2.5 [&[data-state=open]>svg]:rotate-180"
          >
            <LucideChevronDown className="text-muted-foreground/80 duration-200 motion-safe:transition-transform" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8}>
          {Object.entries(optionLabels).map(([code, label]) => {
            const isCurrentLanguage = code === currentLanguageCode;
            const acceptedCode = toAcceptedLanguage(code);

            return (
              <DropdownMenuItem
                key={`cv-${acceptedCode}`}
                className={cn(isCurrentLanguage && "text-foreground")}
                asChild
              >
                <ExternalLink
                  href={resumePath(acceptedCode)}
                  language={currentLanguageCode}
                >
                  {label}
                </ExternalLink>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
