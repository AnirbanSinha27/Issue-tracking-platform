export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // ❌ handle non-OK responses
  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const error = await res.json();
      errorMessage = error.error || errorMessage;
    } catch {
      // response had no JSON body
    }

    throw new Error(errorMessage);
  }

  // ✅ handle empty responses safely
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return null;
  }

  return res.json();
}
