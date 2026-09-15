/**
 * SafeModeRepository — in-memory sandbox implementation.
 */

import type { SafeModeRepository } from '@rimcast/services/governance';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { enterSafeMode, listSafeModeEvents } from '../_shared/product-sandbox-store.js';

export class SafeModeRepositoryDdb implements SafeModeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSafeModeEvents(
    input: Parameters<SafeModeRepository['listSafeModeEvents']>[0]
  ): Promise<Awaited<ReturnType<SafeModeRepository['listSafeModeEvents']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listSafeModeEvents({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async enterSafeMode(
    input: Parameters<SafeModeRepository['enterSafeMode']>[0]
  ): Promise<Awaited<ReturnType<SafeModeRepository['enterSafeMode']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const event = enterSafeMode({
      id: raw.id ? String(raw.id) : sandboxId('sfe'),
      siteId: String(raw.siteId ?? 'site_demo'),
      placementId: raw.placementId ? String(raw.placementId) : undefined,
      playbook: String(raw.playbook ?? 'default-safe-mode'),
    });
    return {
      data: event,
      ...responseMeta(correlationId),
    };
  }
}
