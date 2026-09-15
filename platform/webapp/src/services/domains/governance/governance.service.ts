import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const governanceService = {
  listFreezes: () => apiClient.get<{ items: any[] }>('/v1/governance/site-freezes'),
  freeze: (body: { siteId: string; reason?: string }) =>
    apiClient.post<any>('/v1/governance/site-freezes', body, { idempotencyKey: idem() }),
  unfreeze: (id: string) =>
    apiClient.post<any>(`/v1/governance/site-freezes/${id}/unfreeze`, {}, { idempotencyKey: idem() }),
  listSafeMode: () => apiClient.get<{ items: any[] }>('/v1/governance/safe-mode'),
  enterSafeMode: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/governance/safe-mode', body, { idempotencyKey: idem() }),
  clearSafeMode: (id: string, acknowledgment?: string) =>
    apiClient.post<any>(
      `/v1/governance/safe-mode/${id}/clear`,
      { acknowledgment },
      { idempotencyKey: idem() }
    ),
  upsertEgress: (body: Record<string, unknown>) =>
    apiClient.put<any>('/v1/governance/egress-policies', body, { idempotencyKey: idem() }),
  listOverflow: () => apiClient.get<{ items: any[] }>('/v1/governance/overflow-exceptions'),
  requestOverflow: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/governance/overflow-exceptions', body, { idempotencyKey: idem() }),
};

export const governanceFacade = governanceService;
