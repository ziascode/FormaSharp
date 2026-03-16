import type { NextApiRequest, NextApiResponse } from "next";

type RevalidateResponse = {
  ok: boolean;
  revalidated?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RevalidateResponse>,
) {
  const secret = req.query.secret;
  const path = req.query.path;

  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ ok: false, message: "Invalid secret" });
  }

  if (typeof path !== "string" || !path.startsWith("/")) {
    return res.status(400).json({
      ok: false,
      message: "Invalid path. It must be a string starting with '/'.",
    });
  }

  try {
    await res.revalidate(path);
    return res.json({ ok: true, revalidated: path });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Error revalidating path." });
  }
}

