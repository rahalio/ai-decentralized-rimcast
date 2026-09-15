/**
 * SlaSampleRepository — in-memory sandbox implementation.
 */

import type { SlaSampleRepository } from '@rimcast/services/telemetry';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { ingestSlaSample, listSlaSamples } from '../_shared/product-sandbox-store.js';

export class SlaSampleRepositoryDdb implements SlaSampleRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSlaSamples(
    input: Parameters<SlaSampleRepository['listSlaSamples']>[0]
  ): Promise<Awaited<ReturnType<SlaSampleRepository['listSlaSamples']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listSlaSamples({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      modelVersionId: raw.modelVersionId ? String(raw.modelVersionId) : undefined,
      deviceClass: raw.deviceClass ? String(raw.deviceClass) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async ingestSlaSample(
    input: Parameters<SlaSampleRepository['ingestSlaSample']>[0]
  ): Promise<Awaited<ReturnType<SlaSampleRepository['ingestSlaSample']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const sample = ingestSlaSample({
      id: raw.id ? String(raw.id) : sandboxId('sla'),
      placementId: String(raw.placementId ?? ''),
      siteId: String(raw.siteId ?? 'site_demo'),
      modelVersionId: String(raw.modelVersionId ?? ''),
      deviceClass: raw.deviceClass ? String(raw.deviceClass) : undefined,
      latencyMs: Number(raw.latencyMs ?? 0),
      sampledAt: raw.sampledAt ? String(raw.sampledAt) : undefined,
    });
    return {
      data: sample,
      ...responseMeta(correlationId),
    };
  }
}
