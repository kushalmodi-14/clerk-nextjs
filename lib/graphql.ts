export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {},
  token?: string | null
): Promise<{ data?: T; errors?: any[] }> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store", // We can adjust caching strategies later
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return { errors: [error] };
  }
}
