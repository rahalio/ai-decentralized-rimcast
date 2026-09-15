/**
 * WithdrawRepository — in-memory sandbox implementation.
 */

import type { WithdrawRepository } from '@rimcast/services/capacity';
import { responseMeta } from '../_shared/sandbox-store.js';
import { withdrawCapacityOffer } from '../_shared/product-sandbox-store.js';

export class WithdrawRepositoryDdb implements WithdrawRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async withdrawCapacityOffer(
    input: Parameters<WithdrawRepository['withdrawCapacityOffer']>[0]
  ): Promise<Awaited<ReturnType<WithdrawRepository['withdrawCapacityOffer']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const offerId = String(raw.offerId ?? raw.capacityOfferId ?? '');
    const offer = withdrawCapacityOffer(offerId);
    if (!offer) return null as never;
    return {
      data: offer,
      ...responseMeta(correlationId),
    };
  }
}
