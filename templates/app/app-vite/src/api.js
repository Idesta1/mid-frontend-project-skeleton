export default function api(route) {
  const baseUrl = import.meta.env.VITE_API_URL?.trim();
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;

  if (!baseUrl) {
    return `/api${normalizedRoute}`;
  }

  const cleanedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  if (cleanedBaseUrl.endsWith("/api")) {
    return `${cleanedBaseUrl}${normalizedRoute}`;
  }

  return `${cleanedBaseUrl}/api${normalizedRoute}`;
}
