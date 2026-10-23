import { LucideChevronDown, LucideDownload } from "lucide-react";
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
  currentLanguageCode: AcceptedLanguage;
  optionLabels: Record<AcceptedLanguage, string>;
};

const segmentClass =
  "text-foreground h-full rounded-full hover:bg-(--glass-fill-hover) data-[state=open]:bg-(--glass-fill-hover)";

export function CVDownloadButton({
  label,
  optionLabels,
  currentLanguageCode,
}: CVDownloadButtonProps) {
  return (
    <ButtonGroup className="glass h-10 rounded-full">
      <Button
        variant={null}
        asChild
        className={cn(segmentClass, "gap-2 pr-3.5 pl-4 has-[>svg]:pl-4")}
      >
        <a
          href={resumePath(currentLanguageCode)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LucideDownload aria-hidden />
          {label}
        </a>
      </Button>
      <ButtonGroupSeparator className="bg-foreground/10 my-2.5" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={null}
            aria-label={label}
            className={cn(
              segmentClass,
              "pr-3 pl-2.5 has-[>svg]:pr-3 has-[>svg]:pl-2.5 [&[data-state=open]>svg]:rotate-180"
            )}
          >
            <LucideChevronDown className="text-subtle transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="glass-raised rounded-2xl p-1.5"
        >
          {Object.entries(optionLabels).map(([code, label]) => {
            const isCurrentLanguage = code === currentLanguageCode;
            const acceptedCode = toAcceptedLanguage(code);

            return (
              <DropdownMenuItem
                key={`cv-${acceptedCode}`}
                className={cn(
                  "text-body focus:text-foreground cursor-pointer rounded-full px-3 py-2 focus:bg-(--glass-capsule)",
                  isCurrentLanguage && "text-foreground"
                )}
                asChild
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
