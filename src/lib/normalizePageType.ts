export function normalizePageType(
  raw: string | string[] | null | undefined,
): string | null {
  if (!raw) return null;

  if (Array.isArray(raw)) {
    return raw[0] ?? null;
  }

  return raw;
}

