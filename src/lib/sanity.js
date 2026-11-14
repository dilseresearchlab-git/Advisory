
// Server-side, read-only Sanity query client.
// The project ID and dataset are public identifiers;
// never expose a read token through a NEXT_PUBLIC_ environment variable.

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u4nl45ch";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-11-14";

const token = process.env.SANITY_API_READ_TOKEN;

export const sanityConfigured = Boolean(projectId && dataset);

export async function sanityFetch(
  query,
  { params = {}, revalidate = 300 } = {}
) {
  if (!sanityConfigured) {
    throw new Error("Sanity project ID or dataset is missing.");
  }

  const endpoint = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`;

  // Build the Sanity query URL, including GROQ parameters.
  const searchParams = new URLSearchParams();

  searchParams.set("query", query);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(`$${key}`, JSON.stringify(value));
    }
  }

  const url = `${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
    next: { revalidate },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");

    throw new Error(
      `Sanity query failed (${response.status})${
        detail ? `: ${detail.slice(0, 400)}` : ""
      }`
    );
  }

  const payload = await response.json();

  return payload.result;
}
