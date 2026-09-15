import { apiClient } from '../../shared/infrastructure';

function idem() {
  return crypto.randomUUID();
}

export const capacityService = {
  listNodes: () => apiClient.get<{ items: any[] }>('/v1/capacity/nodes'),
  publishNode: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/capacity/nodes', body, { idempotencyKey: idem() }),
  listOffers: () => apiClient.get<{ items: any[] }>('/v1/capacity/offers'),
  publishOffer: (body: Record<string, unknown>) =>
    apiClient.post<any>('/v1/capacity/offers', body, { idempotencyKey: idem() }),
  withdrawOffer: (id: string) =>
    apiClient.post<any>(`/v1/capacity/offers/${id}/withdraw`, {}, { idempotencyKey: idem() }),
};

export const capacityFacade = capacityService;
