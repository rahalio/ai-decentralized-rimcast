/**
 * LatencyBudgetRepository — in-memory sandbox implementation.
 */

import type { LatencyBudgetRepository } from '@rimcast/services/models';
import { responseMeta } from '../_shared/sandbox-store.js';
import { setLatencyBudget } from '../_shared/product-sandbox-store.js';

export class LatencyBudgetRepositoryDdb implements LatencyBudgetRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async setLatencyBudget(
    input: Parameters<LatencyBudgetRepository['setLatencyBudget']>[0]
  ): Promise<Awaited<ReturnType<LatencyBudgetRepository['setLatencyBudget']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const modelVersionId = String(raw.modelVersionId ?? '');
    const budget = setLatencyBudget(modelVersionId, {
      maxLatencyMs: Number(raw.maxLatencyMs ?? 0),
      allowCloudOverflow: Boolean(raw.allowCloudOverflow ?? false),
      measurementDefinition: raw.measurementDefinition
        ? String(raw.measurementDefinition)
        : undefined,
    });
    if (!budget) return null as never;
    return {
      data: budget,
      ...responseMeta(correlationId),
    };
  }
}
