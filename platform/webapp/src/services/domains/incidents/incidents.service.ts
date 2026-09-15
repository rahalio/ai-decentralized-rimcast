import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const incidentsService = {
  list: (siteId?: string) =>
    apiClient.get<{ items: any[] }>(
      siteId ? `/v1/incidents?siteId=${encodeURIComponent(siteId)}` : '/v1/incidents'
    ),
  create: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/incidents', body, { idempotencyKey: idem() }),
  get: (id: string) => apiClient.get<any>(`/v1/incidents/${id}`),
};

export const incidentsFacade = incidentsService;
