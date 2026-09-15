/**
 * SiteFreezeRepository — in-memory sandbox implementation.
 */

import type { SiteFreezeRepository } from '@rimcast/services/governance';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { freezeSite, listSiteFreezes } from '../_shared/product-sandbox-store.js';

export class SiteFreezeRepositoryDdb implements SiteFreezeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSiteFreezes(
    input: Parameters<SiteFreezeRepository['listSiteFreezes']>[0]
  ): Promise<Awaited<ReturnType<SiteFreezeRepository['listSiteFreezes']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listSiteFreezes({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async freezeSitePlacements(
    input: Parameters<SiteFreezeRepository['freezeSitePlacements']>[0]
  ): Promise<Awaited<ReturnType<SiteFreezeRepository['freezeSitePlacements']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const freeze = freezeSite({
      id: raw.id ? String(raw.id) : sandboxId('frz'),
      siteId: String(raw.siteId ?? 'site_demo'),
      reason: raw.reason ? String(raw.reason) : undefined,
      frozenByUserId: raw.frozenByUserId
        ? String(raw.frozenByUserId)
        : raw.createdByActorId
          ? String(raw.createdByActorId)
          : undefined,
    });
    return {
      data: freeze,
      ...responseMeta(correlationId),
    };
  }
}
