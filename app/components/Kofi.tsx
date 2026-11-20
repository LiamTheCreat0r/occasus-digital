import { useEffect } from "react";
import { KOFI_ID } from "~/lib/site";

declare global {
  interface Window {
    kofiWidgetOverlay?: { draw: (id: string, opts: Record<string, string>) => void };
  }
}

const SRC = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";

/** Ko-fi floating "Support us" chat widget. Loaded client-side after hydration. */
export function Kofi({ label }: { label: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () =>
      window.kofiWidgetOverlay?.draw(KOFI_ID, {
        type: "floating-chat",
        "floating-chat.donateButton.text": label,
        "floating-chat.donateButton.background-color": "#e5261f",
        "floating-chat.donateButton.text-color": "#ede6da",
      });
    // Defer so it never competes with first paint.
    const id = window.setTimeout(() => document.body.appendChild(script), 2500);
    return () => window.clearTimeout(id);
    // Label is only used at first draw; the widget can't be relabelled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
