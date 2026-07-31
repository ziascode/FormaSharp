import type { NextApiRequest, NextApiResponse } from "next";
import {
  FLUENT_FORM_IDS,
  isHoneypotFilled,
  isValidEmail,
  submitFluentForm,
  toQuoteFluentData,
  type QuoteFormPayload,
} from "@/lib/fluentForms";

type ApiBody = QuoteFormPayload & { website?: string };

function readBody(req: NextApiRequest): ApiBody {
  const body = (req.body ?? {}) as ApiBody;
  return {
    fullName: String(body.fullName ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    company: String(body.company ?? ""),
    service: String(body.service ?? "not-sure"),
    stage: String(body.stage ?? ""),
    timeline: String(body.timeline ?? ""),
    budget: String(body.budget ?? ""),
    description: String(body.description ?? ""),
    website: String(body.website ?? ""),
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const payload = readBody(req);

  if (isHoneypotFilled(payload.website)) {
    return res.status(200).json({ ok: true });
  }

  if (!payload.fullName.trim() || !payload.email.trim()) {
    return res.status(400).json({
      message: "Name and email are required.",
    });
  }
  if (!isValidEmail(payload.email.trim())) {
    return res.status(400).json({ message: "Please enter a valid email." });
  }
  if (!payload.stage.trim()) {
    return res.status(400).json({ message: "Project stage is required." });
  }
  if (!payload.description.trim()) {
    return res.status(400).json({
      message: "Please tell us a little about your project.",
    });
  }

  const result = await submitFluentForm(
    FLUENT_FORM_IDS.quote,
    toQuoteFluentData(payload),
  );

  if (!result.ok) {
    return res.status(result.status >= 400 ? result.status : 502).json({
      message: result.message,
    });
  }

  return res.status(200).json({ ok: true });
}
