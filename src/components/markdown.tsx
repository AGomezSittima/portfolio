import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: Props) {
  return (
    <div
      className={cn(
        "text-foreground prose md:prose-lg prose-strong:font-bold prose-strong:text-secondary-foreground",
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
