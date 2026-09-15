/** Domain API helpers — thin wrappers over apiClient. */

import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const modelsService = {
  list: () => apiClient.get<{ items: any[] }>('/v1/models'),
  register: (body: { name: string; artefactUri?: string }) =>
    apiClient.post<any>('/v1/models', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/models/${id}`),
  setBudget: (id: string, body: { maxLatencyMs: number; allowCloudOverflow?: boolean }) =>
    apiClient.put<any>(`/v1/models/${id}/latency-budget`, body, { idempotencyKey: idem() }),
};

export const modelsFacade = modelsService;
