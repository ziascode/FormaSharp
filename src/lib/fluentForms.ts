import {
  BUDGET_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  QUOTE_SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  type QuoteServiceSlug,
} from "@/lib/quoteForm";

export const FLUENT_FORM_IDS = {
  contact: 3, // Get Started popup
  quote: 4, // Request a Quote
} as const;

export type ContactFormPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  /** Honeypot — must be empty */
  website?: string;
};

export type QuoteFormPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: QuoteServiceSlug | string;
  stage: string;
  timeline?: string;
  budget?: string;
  description: string;
  /** Honeypot — must be empty */
  website?: string;
};

function wpOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
  return raw.replace(/\/$/, "");
}

function optionLabel(
  options: ReadonlyArray<{ label: string; value?: string; slug?: string }>,
  key: string,
): string {
  const match = options.find(
    (o) => o.value === key || o.slug === key,
  );
  return match?.label ?? key;
}

/**
 * Field `name` attributes in Fluent Forms must match these keys exactly.
 * Configure each field’s Name Attribute in Fluent Forms → Edit Form → Field.
 */
export function toContactFluentData(payload: ContactFormPayload) {
  return {
    full_name: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: (payload.phone || "").trim(),
    company: (payload.company || "").trim(),
    message: (payload.message || "").trim(),
  };
}

export function toQuoteFluentData(payload: QuoteFormPayload) {
  const service = String(payload.service || "");
  const stage = String(payload.stage || "");
  const timeline = String(payload.timeline || "");
  const budget = String(payload.budget || "");

  return {
    full_name: payload.fullName.trim(),
    email: payload.email.trim(),
    phone: (payload.phone || "").trim(),
    company: (payload.company || "").trim(),
    service: optionLabel([...QUOTE_SERVICE_OPTIONS], service),
    stage: optionLabel([...PROJECT_STAGE_OPTIONS], stage),
    timeline: timeline ? optionLabel([...TIMELINE_OPTIONS], timeline) : "",
    budget: budget ? optionLabel([...BUDGET_OPTIONS], budget) : "",
    description: payload.description.trim(),
  };
}

export type FluentSubmitResult =
  | { ok: true; raw?: unknown }
  | { ok: false; status: number; message: string; details?: unknown };

export async function submitFluentForm(
  formId: number,
  data: Record<string, string>,
): Promise<FluentSubmitResult> {
  const origin = wpOrigin();
  const secret = process.env.FLUENTFORMS_SUBMIT_SECRET?.trim();

  if (!origin) {
    return {
      ok: false,
      status: 500,
      message: "NEXT_PUBLIC_WORDPRESS_URL is not configured.",
    };
  }
  if (!secret) {
    return {
      ok: false,
      status: 500,
      message: "FLUENTFORMS_SUBMIT_SECRET is not configured.",
    };
  }

  const endpoint = `${origin}/wp-json/fluentform/v1/external-submit`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-FormaSharp-Secret": secret,
      },
      body: JSON.stringify({
        form_id: String(formId),
        data: {
          ...data,
          _wp_http_referer: process.env.NEXT_PUBLIC_SITE_URL || origin,
        },
      }),
    });

    const text = await response.text();
    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = { raw: text };
    }

    if (!response.ok) {
      let message = `Fluent Forms submit failed (${response.status}).`;
      if (
        json &&
        typeof json === "object" &&
        "message" in json &&
        typeof (json as { message: unknown }).message === "string"
      ) {
        message = (json as { message: string }).message;
      }

      return {
        ok: false,
        status: response.status,
        message,
        details: json,
      };
    }

    return { ok: true, raw: json };
  } catch (error) {
    return {
      ok: false,
      status: 502,
      message:
        error instanceof Error
          ? error.message
          : "Could not reach WordPress / Fluent Forms.",
    };
  }
}

export function isHoneypotFilled(website?: string): boolean {
  return Boolean(website && website.trim());
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
