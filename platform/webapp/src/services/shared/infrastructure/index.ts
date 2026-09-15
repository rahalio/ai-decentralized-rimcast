/**
 * Shared API client for Rimcast webapp.
 */

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

function apiKey(): string {
  if (typeof localStorage === 'undefined') return 'rimcast_demo_local_dev_key';
  return localStorage.getItem('rimcast.apiKey') || 'rimcast_demo_local_dev_key';
}

function authHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey(),
    ...extra,
  };
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('rimcast.token') : null;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts?: { idempotencyKey?: string }
): Promise<ApiResponse<T>> {
  const res = await fetch(path, {
    method,
    headers: authHeaders(
      opts?.idempotencyKey ? { 'Idempotency-Key': opts.idempotencyKey } : undefined
    ),
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${method} ${path} failed: ${res.status} ${text}`);
  }
  if (res.status === 204) {
    return { data: undefined as T };
  }
  return (await res.json()) as ApiResponse<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown, opts?: { idempotencyKey?: string }) =>
    request<T>('POST', path, body, opts),
  put: <T>(path: string, body?: unknown, opts?: { idempotencyKey?: string }) =>
    request<T>('PUT', path, body, opts),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

export function setSession(token: string) {
  localStorage.setItem('rimcast.token', token);
  localStorage.setItem('rimcast.session', '1');
  window.dispatchEvent(new Event('rimcast-auth'));
}

export function clearSession() {
  localStorage.removeItem('rimcast.token');
  localStorage.removeItem('rimcast.session');
  window.dispatchEvent(new Event('rimcast-auth'));
}
