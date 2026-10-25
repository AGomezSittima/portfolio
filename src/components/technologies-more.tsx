import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
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
        <Button
          variant={null}
          className={cn(
            tagPillClass,
            tagPillHoverClass,
            "data-[state=open]:text-foreground data-[state=open]:bg-(--tag-fill-hover)"
          )}
        >
          +{technologies.length}
        </Button>
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
