/**
 * PlacementRepository — in-memory sandbox implementation.
 */

import type { PlacementRepository } from '@rimcast/services/placements';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  createPlacement,
  getPlacement,
  listPlacements,
} from '../_shared/product-sandbox-store.js';

export class PlacementRepositoryDdb implements PlacementRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPlacements(
    input: Parameters<PlacementRepository['listPlacements']>[0]
  ): Promise<Awaited<ReturnType<PlacementRepository['listPlacements']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listPlacements({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      status: raw.status ? String(raw.status) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async requestPlacement(
    input: Parameters<PlacementRepository['requestPlacement']>[0]
  ): Promise<Awaited<ReturnType<PlacementRepository['requestPlacement']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const placement = createPlacement({
      id: raw.id ? String(raw.id) : sandboxId('plc'),
      modelVersionId: String(raw.modelVersionId ?? ''),
      siteId: String(raw.siteId ?? 'site_demo'),
      preferredDeviceClass: raw.preferredDeviceClass
        ? String(raw.preferredDeviceClass)
        : undefined,
      allowCloudOverflow: Boolean(raw.allowCloudOverflow ?? false),
    });
    return {
      data: placement,
      ...responseMeta(correlationId),
    };
  }

  async getPlacement(
    input: Parameters<PlacementRepository['getPlacement']>[0]
  ): Promise<Awaited<ReturnType<PlacementRepository['getPlacement']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const placementId = String(raw.placementId ?? '');
    const placement = getPlacement(placementId);
    if (!placement) return null as never;
    return {
      data: placement,
      ...responseMeta(correlationId),
    };
  }
}
