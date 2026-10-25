import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  newTabLabel: string;
  className?: string;
}

export function Markdown({ content, newTabLabel, className }: Props) {
  return (
    <div
      className={cn(
        "prose prose-p:my-0 max-w-none text-base/[1.65] md:text-[17px]/7",
        "[--tw-prose-body:var(--body)] [--tw-prose-bold:var(--foreground)] [--tw-prose-links:var(--primary)]",
        "prose-strong:font-medium prose-a:font-medium prose-a:underline-offset-4 prose-a:hover:text-primary-hover",
        className
      )}
    >
      <ReactMarkdown
        components={{
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
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
