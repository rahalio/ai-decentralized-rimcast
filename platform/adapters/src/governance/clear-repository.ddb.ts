/**
 * ClearRepository — in-memory sandbox implementation.
 */

import type { ClearRepository } from '@rimcast/services/governance';
import { responseMeta } from '../_shared/sandbox-store.js';
import { clearSafeMode } from '../_shared/product-sandbox-store.js';

export class ClearRepositoryDdb implements ClearRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async clearSafeMode(
    input: Parameters<ClearRepository['clearSafeMode']>[0]
  ): Promise<Awaited<ReturnType<ClearRepository['clearSafeMode']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const event = clearSafeMode(
      String(raw.eventId ?? ''),
      raw.acknowledgment ? String(raw.acknowledgment) : undefined
    );
    if (!event) return null as never;
    return {
      data: event,
      ...responseMeta(correlationId),
    };
  }
}
