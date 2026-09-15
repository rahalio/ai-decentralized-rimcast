/**
 * NodeRepository — in-memory sandbox implementation.
 */

import type { NodeRepository } from '@rimcast/services/capacity';
import { responseMeta } from '../_shared/sandbox-store.js';
import { listEdgeNodes } from '../_shared/product-sandbox-store.js';

export class NodeRepositoryDdb implements NodeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listEdgeNodes(
    input: Parameters<NodeRepository['listEdgeNodes']>[0]
  ): Promise<Awaited<ReturnType<NodeRepository['listEdgeNodes']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const siteId = raw.siteId ? String(raw.siteId) : undefined;
    const items = listEdgeNodes({ siteId });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }
}
