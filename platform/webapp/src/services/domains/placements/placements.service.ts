import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const placementsService = {
  list: (siteId?: string) =>
    apiClient.get<{ items: any[] }>(
      siteId ? `/v1/placements?siteId=${encodeURIComponent(siteId)}` : '/v1/placements'
    ),
  request: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/placements', body, { idempotencyKey: idem() }),
  simulate: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/placements/simulate', body),
  get: (id: string) => apiClient.get<any>(`/v1/placements/${id}`),
  rollback: (id: string, reason?: string) =>
    apiClient.post<any>(
      `/v1/placements/${id}/rollback`,
      { reason },
      { idempotencyKey: idem() }
    ),
};

export const placementsFacade = placementsService;
