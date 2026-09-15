/**
 * Integration event type definition (handwritten shared contract).
 * Consumed by generated registry under ./generated/registry.ts
 */

export type IntegrationEventDeliveryMode = 'sync' | 'async';

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description: string;
  defaultDeliveryMode: IntegrationEventDeliveryMode;
}
