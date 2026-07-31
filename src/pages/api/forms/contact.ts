import type { NextApiRequest, NextApiResponse } from "next";
import {
  FLUENT_FORM_IDS,
  isHoneypotFilled,
  isValidEmail,
  submitFluentForm,
  toContactFluentData,
  type ContactFormPayload,
} from "@/lib/fluentForms";

type ApiBody = ContactFormPayload & { website?: string };

function readBody(req: NextApiRequest): ApiBody {
  const body = (req.body ?? {}) as Record<string, unknown>;
  return {
    fullName: String(body.fullName ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? body.contactNumber ?? ""),
    company: String(body.company ?? ""),
    message: String(body.message ?? ""),
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

  // Silent success for bots
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

  const result = await submitFluentForm(
    FLUENT_FORM_IDS.contact,
    toContactFluentData(payload),
  );

  if (!result.ok) {
    return res.status(result.status >= 400 ? result.status : 502).json({
      message: result.message,
    });
  }

  return res.status(200).json({ ok: true });
}
