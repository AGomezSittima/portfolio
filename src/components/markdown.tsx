import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  newTabLabel: string;
  className?: string;
}

export function Markdown({ content, newTabLabel, className }: Props) {
  return (
    <div className={cn("text-body text-muted-foreground", className)}>
      <ReactMarkdown
        components={{
          strong: ({ children }) => (
            <strong className="text-foreground font-medium">{children}</strong>
          ),
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
              {...props}
            >
              {children}
              <span className="sr-only"> {newTabLabel}</span>
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
