/**
 * RollbackRepository — in-memory sandbox implementation.
 */

import type { RollbackRepository } from '@rimcast/services/placements';
import { responseMeta } from '../_shared/sandbox-store.js';
import { rollbackPlacement } from '../_shared/product-sandbox-store.js';

export class RollbackRepositoryDdb implements RollbackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async rollbackPlacement(
    input: Parameters<RollbackRepository['rollbackPlacement']>[0]
  ): Promise<Awaited<ReturnType<RollbackRepository['rollbackPlacement']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const placementId = String(raw.placementId ?? '');
    const placement = rollbackPlacement(
      placementId,
      raw.reason ? String(raw.reason) : undefined
    );
    if (!placement) return null as never;
    return {
      data: placement,
      ...responseMeta(correlationId),
    };
  }
}
