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
        "text-foreground prose md:prose-lg",
        "prose-strong:font-bold prose-strong:text-secondary-foreground",
        "prose-a:text-secondary-foreground prose-a:font-medium prose-a:hover:opacity-80",
        className
      )}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
