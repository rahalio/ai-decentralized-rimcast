/**
 * OverflowExceptionRepository — in-memory sandbox implementation.
 */

import type { OverflowExceptionRepository } from '@rimcast/services/governance';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import {
  listOverflowExceptions,
  requestOverflowException,
} from '../_shared/product-sandbox-store.js';

export class OverflowExceptionRepositoryDdb implements OverflowExceptionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listOverflowExceptions(
    input: Parameters<OverflowExceptionRepository['listOverflowExceptions']>[0]
  ): Promise<
    Awaited<ReturnType<OverflowExceptionRepository['listOverflowExceptions']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listOverflowExceptions({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async requestOverflowException(
    input: Parameters<OverflowExceptionRepository['requestOverflowException']>[0]
  ): Promise<
    Awaited<ReturnType<OverflowExceptionRepository['requestOverflowException']>>
  > {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const record = requestOverflowException({
      id: raw.id ? String(raw.id) : sandboxId('ovx'),
      siteId: String(raw.siteId ?? 'site_demo'),
      purposeTag: String(raw.purposeTag ?? 'unspecified'),
      rationale: raw.rationale ? String(raw.rationale) : undefined,
    });
    return {
      data: record,
      ...responseMeta(correlationId),
    };
  }
}
