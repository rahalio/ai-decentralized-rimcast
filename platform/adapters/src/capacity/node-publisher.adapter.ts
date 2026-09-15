/**
 * NodePublisherAdapter — sandbox publish = create edge node.
 */

import type { NodePublisher } from '@rimcast/services/capacity';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createEdgeNode } from '../_shared/product-sandbox-store.js';

export class NodePublisherAdapter implements NodePublisher {
  constructor(private readonly _http: unknown) {}

  async publishEdgeNode(
    input: Parameters<NodePublisher['publishEdgeNode']>[0]
  ): Promise<Awaited<ReturnType<NodePublisher['publishEdgeNode']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const node = createEdgeNode({
      id: raw.id ? String(raw.id) : sandboxId('nde'),
      siteId: String(raw.siteId ?? ''),
      deviceClass: String(raw.deviceClass ?? 'near_device'),
      availableComputeUnits: Number(raw.availableComputeUnits ?? 1),
      measuredRttMs:
        raw.measuredRttMs !== undefined ? Number(raw.measuredRttMs) : undefined,
      pricePerCompliantInference:
        raw.pricePerCompliantInference !== undefined
          ? Number(raw.pricePerCompliantInference)
          : undefined,
    });
    return {
      data: node,
      ...responseMeta(correlationId),
    };
  }
}
