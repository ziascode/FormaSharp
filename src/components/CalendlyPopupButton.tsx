"use client";

import { useCallback, useState } from "react";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

function ensureCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
  }

  if (window.Calendly) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${WIDGET_JS}"]`
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Calendly failed to load")),
        { once: true }
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.body.appendChild(script);
  });
}

type CalendlyPopupButtonProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
};

export default function CalendlyPopupButton({
  url,
  children,
  className,
}: CalendlyPopupButtonProps) {
  const [isOpening, setIsOpening] = useState(false);

  const openPopup = useCallback(async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await ensureCalendlyAssets();
      window.Calendly?.initPopupWidget({ url });
    } finally {
      setIsOpening(false);
    }
  }, [isOpening, url]);

  return (
    <button
      type="button"
      className={className}
      onClick={openPopup}
      disabled={isOpening}
      aria-busy={isOpening}
    >
      {isOpening ? "Opening calendar…" : children}
    </button>
  );
}
