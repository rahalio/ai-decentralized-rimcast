/**
 * EgressPolicyRepository — in-memory sandbox implementation.
 */

import type { EgressPolicyRepository } from '@rimcast/services/governance';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { upsertEgressPolicy } from '../_shared/product-sandbox-store.js';

export class EgressPolicyRepositoryDdb implements EgressPolicyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async upsertEgressPolicy(
    input: Parameters<EgressPolicyRepository['upsertEgressPolicy']>[0]
  ): Promise<Awaited<ReturnType<EgressPolicyRepository['upsertEgressPolicy']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const purposeTags = Array.isArray(raw.purposeTags)
      ? (raw.purposeTags as string[])
      : undefined;
    const policy = upsertEgressPolicy({
      id: raw.id ? String(raw.id) : sandboxId('egr'),
      siteId: String(raw.siteId ?? 'site_demo'),
      allowOverflow: Boolean(raw.allowOverflow ?? false),
      purposeTags,
    });
    return {
      data: policy,
      ...responseMeta(correlationId),
    };
  }
}
