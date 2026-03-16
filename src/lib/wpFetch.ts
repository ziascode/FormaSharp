const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

type GraphQLErrorShape = {
  message?: string;
};

export async function wpFetch<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  if (!WP_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not configured.");
  }

  const response = await fetch(`${WP_URL.replace(/\/$/, "")}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as {
    data?: TData;
    errors?: GraphQLErrorShape[];
  };

  if (json.errors && json.errors.length) {
    throw new Error(json.errors[0]?.message || "Unknown GraphQL error");
  }

  if (!json.data) {
    throw new Error("GraphQL response missing data.");
  }

  return json.data;
}

