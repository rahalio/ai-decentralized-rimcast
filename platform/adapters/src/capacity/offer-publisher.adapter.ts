/**
 * OfferPublisherAdapter — sandbox publish = create capacity offer.
 */

import type { OfferPublisher } from '@rimcast/services/capacity';
import { responseMeta, sandboxId } from '../_shared/sandbox-store.js';
import { createCapacityOffer } from '../_shared/product-sandbox-store.js';

export class OfferPublisherAdapter implements OfferPublisher {
  constructor(private readonly _http: unknown) {}

  async publishCapacityOffer(
    input: Parameters<OfferPublisher['publishCapacityOffer']>[0]
  ): Promise<Awaited<ReturnType<OfferPublisher['publishCapacityOffer']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const pricingModel =
      (raw.pricingModel as 'per_compliant_inference' | 'reserved_slot' | undefined) ??
      'per_compliant_inference';
    const offer = createCapacityOffer({
      id: raw.id ? String(raw.id) : sandboxId('cof'),
      edgeNodeId: String(raw.edgeNodeId ?? ''),
      siteId: raw.siteId ? String(raw.siteId) : undefined,
      slotsAvailable: Number(raw.slotsAvailable ?? 1),
      pricingModel,
      unitPrice: Number(raw.unitPrice ?? 0),
    });
    if (!offer) return null as never;
    return {
      data: offer,
      ...responseMeta(correlationId),
    };
  }
}
