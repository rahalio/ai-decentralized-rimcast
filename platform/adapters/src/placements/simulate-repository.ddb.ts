/**
 * SimulateRepository — in-memory sandbox implementation.
 */

import type { SimulateRepository } from '@rimcast/services/placements';
import { responseMeta } from '../_shared/sandbox-store.js';
import { simulatePlacementFeasibility } from '../_shared/product-sandbox-store.js';

export class SimulateRepositoryDdb implements SimulateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async simulatePlacementFeasibility(
    input: Parameters<SimulateRepository['simulatePlacementFeasibility']>[0]
  ): Promise<
    Awaited<ReturnType<SimulateRepository['simulatePlacementFeasibility']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const result = simulatePlacementFeasibility({
      modelVersionId: String(raw.modelVersionId ?? ''),
      siteId: String(raw.siteId ?? 'site_demo'),
      preferredDeviceClass: raw.preferredDeviceClass
        ? String(raw.preferredDeviceClass)
        : undefined,
    });
    return {
      data: result,
      ...responseMeta(correlationId),
    };
  }
}
