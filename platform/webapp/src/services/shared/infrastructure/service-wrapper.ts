export function makeService<T extends Record<string, unknown>>(service: T): T {
  return service;
}
