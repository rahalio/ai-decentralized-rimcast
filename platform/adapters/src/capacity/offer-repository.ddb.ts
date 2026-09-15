/**
 * OfferRepository — in-memory sandbox implementation.
 */

import type { OfferRepository } from '@rimcast/services/capacity';
import { responseMeta } from '../_shared/sandbox-store.js';
import { listCapacityOffers } from '../_shared/product-sandbox-store.js';

export class OfferRepositoryDdb implements OfferRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCapacityOffers(
    input: Parameters<OfferRepository['listCapacityOffers']>[0]
  ): Promise<Awaited<ReturnType<OfferRepository['listCapacityOffers']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listCapacityOffers({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      edgeNodeId: raw.edgeNodeId ? String(raw.edgeNodeId) : undefined,
      status: raw.status ? String(raw.status) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }
}
