import { Fragment } from "react";

/** Renders the `**bold**` + blank-line-paragraph format used in game descriptions. */
export function RichText({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <p key={i}>
          {p.split(/(\*\*.+?\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j}>{part.slice(2, -2)}</strong>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
