/**
 * VModelRepository — in-memory sandbox implementation.
 */

import type { VModelRepository } from '@rimcast/services/models';
import { responseMeta } from '../_shared/sandbox-store.js';
import {
  createModelVersion,
  getModelVersion,
  listModelVersions,
} from '../_shared/product-sandbox-store.js';

export class VModelRepositoryDdb implements VModelRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listModelVersions(
    input: Parameters<VModelRepository['listModelVersions']>[0]
  ): Promise<Awaited<ReturnType<VModelRepository['listModelVersions']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const status = raw.status ? String(raw.status) : undefined;
    const items = listModelVersions({ status });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async registerModelVersion(
    input: Parameters<VModelRepository['registerModelVersion']>[0]
  ): Promise<Awaited<ReturnType<VModelRepository['registerModelVersion']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const model = createModelVersion({
      id: raw.id ? String(raw.id) : undefined,
      name: String(raw.name ?? 'unnamed-model'),
      artefactUri: raw.artefactUri ? String(raw.artefactUri) : undefined,
    });
    return {
      data: model,
      ...responseMeta(correlationId),
    };
  }

  async getModelVersion(
    input: Parameters<VModelRepository['getModelVersion']>[0]
  ): Promise<Awaited<ReturnType<VModelRepository['getModelVersion']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const modelVersionId = String(raw.modelVersionId ?? '');
    const model = getModelVersion(modelVersionId);
    if (!model) return null as never;
    return {
      data: model,
      ...responseMeta(correlationId),
    };
  }
}
