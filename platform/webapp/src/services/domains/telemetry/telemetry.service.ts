import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const telemetryService = {
  list: (q?: { siteId?: string; modelVersionId?: string; deviceClass?: string }) => {
    const params = new URLSearchParams();
    if (q?.siteId) params.set('siteId', q.siteId);
    if (q?.modelVersionId) params.set('modelVersionId', q.modelVersionId);
    if (q?.deviceClass) params.set('deviceClass', q.deviceClass);
    const qs = params.toString();
    return apiClient.get<{ items: any[] }>(
      qs ? `/v1/telemetry/sla-samples?${qs}` : '/v1/telemetry/sla-samples'
    );
  },
  ingest: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/telemetry/sla-samples', body, { idempotencyKey: idem() }),
};

export const telemetryFacade = telemetryService;
