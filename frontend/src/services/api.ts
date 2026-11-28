export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";

export function apiPath(path: string): string {
  return `${API_BASE_URL}/api/v1${path.startsWith("/") ? path : "/" + path}`;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiPath(path), {
    headers: { Accept: "application/json" },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`API ${path} failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}