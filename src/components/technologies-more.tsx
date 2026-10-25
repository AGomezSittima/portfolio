import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import type { TechnologiesDTO } from "@/i18n/data/projects";
import { TechnologyBadge } from "./technology-badge";
import { tagPillClass, tagPillHoverClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

type TechnologiesMoreProps = {
  projectId: number;
  technologies: TechnologiesDTO[];
  newTabLabel: string;
};

export function TechnologiesMore({
  projectId,
  technologies,
  newTabLabel,
}: TechnologiesMoreProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant={null}
          asChild
          className={cn(
            tagPillClass,
            tagPillHoverClass,
            "data-[state=open]:border-primary/30 data-[state=open]:bg-primary/8 data-[state=open]:text-primary-on-glass"
          )}
        >
          <button type="button">+{technologies.length}</button>
        </Badge>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={8}
        className="glass-raised w-fit max-w-80 rounded-2xl p-3"
      >
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechnologyBadge
              key={`${projectId}-${tech}`}
              technology={tech}
              newTabLabel={newTabLabel}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
