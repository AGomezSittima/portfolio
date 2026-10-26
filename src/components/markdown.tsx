import type { AcceptedLanguage } from "@/i18n";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { ExternalLink } from "./external-link";

interface Props {
  content: string;
  language: AcceptedLanguage;
  className?: string;
}

export function Markdown({ content, language, className }: Props) {
  return (
    <div className={cn("text-body text-muted-foreground", className)}>
      <ReactMarkdown
        components={{
          strong: ({ children }) => (
            <strong className="text-foreground font-medium">{children}</strong>
          ),
          a: ({ href, children }) => (
            <ExternalLink
              href={href}
              language={language}
              className="text-primary hover:text-primary-hover font-medium underline underline-offset-4"
            >
              {children}
            </ExternalLink>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
