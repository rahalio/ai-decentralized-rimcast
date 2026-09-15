/**
 * UnfreezeRepository — in-memory sandbox implementation.
 */

import type { UnfreezeRepository } from '@rimcast/services/governance';
import { responseMeta } from '../_shared/sandbox-store.js';
import { unfreezeSite } from '../_shared/product-sandbox-store.js';

export class UnfreezeRepositoryDdb implements UnfreezeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async unfreezeSitePlacements(
    input: Parameters<UnfreezeRepository['unfreezeSitePlacements']>[0]
  ): Promise<Awaited<ReturnType<UnfreezeRepository['unfreezeSitePlacements']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const freeze = unfreezeSite(String(raw.freezeId ?? ''));
    if (!freeze) return null as never;
    return {
      data: freeze,
      ...responseMeta(correlationId),
    };
  }
}
