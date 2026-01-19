import { LucideMoreHorizontal } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import type { TechnologiesDTO } from "@/i18n/data/projects";
import { TechnologyBadge } from "./technology-badge";

export function TechnologiesMore({
  projectId,
  technologies,
}: {
  projectId: number;
  technologies: TechnologiesDTO[];
}) {
  return (
    <HoverCard openDelay={150} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <LucideMoreHorizontal />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit max-w-80" side="top" align="start">
        <div className="flex flex-wrap items-center gap-4 md:justify-between">
          {technologies.map((tech) => (
            <TechnologyBadge key={`${projectId}-${tech}`} technology={tech} />
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
