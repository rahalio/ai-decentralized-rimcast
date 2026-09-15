/**
 * IncidentRepository — in-memory sandbox implementation.
 */

import type { IncidentRepository } from '@rimcast/services/incidents';
import { responseMeta } from '../_shared/sandbox-store.js';
import {
  createIncidentPack,
  getIncidentPack,
  listIncidentPacks,
} from '../_shared/product-sandbox-store.js';

export class IncidentRepositoryDdb implements IncidentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listIncidentPacks(
    input: Parameters<IncidentRepository['listIncidentPacks']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['listIncidentPacks']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const items = listIncidentPacks({
      siteId: raw.siteId ? String(raw.siteId) : undefined,
    });
    return {
      data: { items },
      ...responseMeta(correlationId),
    };
  }

  async createIncidentPack(
    input: Parameters<IncidentRepository['createIncidentPack']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['createIncidentPack']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const pack = createIncidentPack({
      id: raw.id ? String(raw.id) : undefined,
      siteId: String(raw.siteId ?? 'site_demo'),
      modelVersionId: raw.modelVersionId ? String(raw.modelVersionId) : undefined,
      edgeNodeId: raw.edgeNodeId ? String(raw.edgeNodeId) : undefined,
      windowStart: String(raw.windowStart ?? ''),
      windowEnd: String(raw.windowEnd ?? ''),
    });
    return {
      data: pack,
      ...responseMeta(correlationId),
    };
  }

  async getIncidentPack(
    input: Parameters<IncidentRepository['getIncidentPack']>[0]
  ): Promise<Awaited<ReturnType<IncidentRepository['getIncidentPack']>>> {
    const raw = input as Record<string, unknown>;
    const correlationId = String(raw.correlationId ?? '');
    const pack = getIncidentPack(String(raw.incidentPackId ?? raw.id ?? ''));
    if (!pack) return null as never;
    return {
      data: pack,
      ...responseMeta(correlationId),
    };
  }
}
