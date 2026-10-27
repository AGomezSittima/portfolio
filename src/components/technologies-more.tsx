import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { getI18n, type AcceptedLanguage } from "@/i18n";
import type { BasicsDTO } from "@/i18n/data/basics";
import type { TechnologiesDTO } from "@/i18n/data/projects";
import { TechnologyBadge } from "./technology-badge";

type TechnologiesMoreProps = {
  projectId: number;
  technologies: TechnologiesDTO[];
  language: AcceptedLanguage;
};

export function TechnologiesMore({
  projectId,
  technologies,
  language,
}: TechnologiesMoreProps) {
  const t = getI18n("basicsData", language) as BasicsDTO;

  const count = technologies.length;
  const label = t[
    count === 1
      ? "basics.moreTechnologies.one"
      : "basics.moreTechnologies.other"
  ].replace("{n}", String(count));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge variant="tag" asChild>
          <button type="button" aria-label={label}>
            +{count}
          </button>
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        className="w-fit max-w-80 p-3"
      >
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechnologyBadge
              key={`${projectId}-${tech}`}
              technology={tech}
              language={language}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
