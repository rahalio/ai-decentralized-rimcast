/**
 * Process-wide in-memory store for local / sandbox product-domain flows.
 * Used by models, capacity, placements, telemetry, incidents, governance adapters.
 */

import { nowIso, sandboxId } from './sandbox-store.js';

export type DeviceClass = 'on_device' | 'near_device' | 'cloud' | string;

export interface SandboxLatencyBudget {
  modelVersionId: string;
  maxLatencyMs: number;
  allowCloudOverflow: boolean;
  measurementDefinition?: string;
  updatedAt: string;
}

export interface SandboxModelVersion {
  id: string;
  name: string;
  artefactUri?: string;
  status: 'registered' | 'eligible' | 'blocked';
  latencyBudget?: SandboxLatencyBudget;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxEdgeNode {
  id: string;
  siteId: string;
  deviceClass: string;
  availableComputeUnits: number;
  measuredRttMs?: number;
  health: 'healthy' | 'degraded' | 'unhealthy';
  pricePerCompliantInference?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxCapacityOffer {
  id: string;
  edgeNodeId: string;
  siteId: string;
  slotsAvailable: number;
  pricingModel: 'per_compliant_inference' | 'reserved_slot';
  unitPrice: number;
  status: 'published' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
}

export interface SandboxPlacement {
  id: string;
  modelVersionId: string;
  siteId: string;
  edgeNodeId?: string;
  deviceClass?: string;
  status: 'accepted' | 'refused' | 'rolled_back' | 'safe_mode';
  measuredRttMs?: number;
  refusalReason?: string;
  cloudOverflow: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxSlaSample {
  id: string;
  placementId: string;
  siteId: string;
  modelVersionId: string;
  deviceClass?: string;
  latencyMs: number;
  withinBudget: boolean;
  sampledAt: string;
}

export interface SandboxIncidentPack {
  id: string;
  siteId: string;
  modelVersionId?: string;
  edgeNodeId?: string;
  placementIds?: string[];
  windowStart: string;
  windowEnd: string;
  exportUri?: string;
  createdAt: string;
}

export interface SandboxSiteFreeze {
  id: string;
  siteId: string;
  active: boolean;
  reason?: string;
  frozenByUserId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxSafeModeEvent {
  id: string;
  siteId: string;
  placementId?: string;
  status: 'active' | 'cleared';
  playbook: string;
  acknowledgment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxEgressPolicy {
  id: string;
  siteId: string;
  allowOverflow: boolean;
  purposeTags: string[];
  updatedAt: string;
}

export interface SandboxOverflowException {
  id: string;
  siteId: string;
  purposeTag: string;
  rationale?: string;
  status: 'pending' | 'approved' | 'revoked';
  createdAt: string;
  updatedAt: string;
}

type ProductSandboxState = {
  modelVersionsById: Map<string, SandboxModelVersion>;
  edgeNodesById: Map<string, SandboxEdgeNode>;
  capacityOffersById: Map<string, SandboxCapacityOffer>;
  placementsById: Map<string, SandboxPlacement>;
  slaSamplesById: Map<string, SandboxSlaSample>;
  incidentPacksById: Map<string, SandboxIncidentPack>;
  siteFreezesById: Map<string, SandboxSiteFreeze>;
  safeModeEventsById: Map<string, SandboxSafeModeEvent>;
  egressPoliciesBySiteId: Map<string, SandboxEgressPolicy>;
  overflowExceptionsById: Map<string, SandboxOverflowException>;
  seeded: boolean;
};

const GLOBAL_KEY = '__rimcast_product_sandbox__';

function state(): ProductSandboxState {
  const g = globalThis as typeof globalThis & { [GLOBAL_KEY]?: ProductSandboxState };
  if (!g[GLOBAL_KEY]) {
    g[GLOBAL_KEY] = {
      modelVersionsById: new Map(),
      edgeNodesById: new Map(),
      capacityOffersById: new Map(),
      placementsById: new Map(),
      slaSamplesById: new Map(),
      incidentPacksById: new Map(),
      siteFreezesById: new Map(),
      safeModeEventsById: new Map(),
      egressPoliciesBySiteId: new Map(),
      overflowExceptionsById: new Map(),
      seeded: false,
    };
  }
  return g[GLOBAL_KEY]!;
}

const DEMO_SITE = 'site_demo';

const DEVICE_CLASS_RANK: Record<string, number> = {
  on_device: 0,
  near_device: 1,
  cloud: 2,
};

export function deviceClassRank(deviceClass: string): number {
  return DEVICE_CLASS_RANK[deviceClass] ?? 50;
}

export function ensureProductSandboxSeeded(): void {
  if (state().seeded) return;
  state().seeded = true;
  const now = nowIso();

  const modelId = sandboxId('mdl');
  state().modelVersionsById.set(modelId, {
    id: modelId,
    name: 'rimcast-demo-vision-v1',
    artefactUri: 's3://rimcast-demo/models/vision-v1.tar.gz',
    status: 'registered',
    createdAt: now,
    updatedAt: now,
  });

  const onDeviceId = sandboxId('nde');
  state().edgeNodesById.set(onDeviceId, {
    id: onDeviceId,
    siteId: DEMO_SITE,
    deviceClass: 'on_device',
    availableComputeUnits: 8,
    measuredRttMs: 12,
    health: 'healthy',
    pricePerCompliantInference: 0.002,
    createdAt: now,
    updatedAt: now,
  });

  const nearDeviceId = sandboxId('nde');
  state().edgeNodesById.set(nearDeviceId, {
    id: nearDeviceId,
    siteId: DEMO_SITE,
    deviceClass: 'near_device',
    availableComputeUnits: 32,
    measuredRttMs: 28,
    health: 'healthy',
    pricePerCompliantInference: 0.001,
    createdAt: now,
    updatedAt: now,
  });

  const offerId = sandboxId('cof');
  state().capacityOffersById.set(offerId, {
    id: offerId,
    edgeNodeId: nearDeviceId,
    siteId: DEMO_SITE,
    slotsAvailable: 4,
    pricingModel: 'per_compliant_inference',
    unitPrice: 0.001,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  });

  state().egressPoliciesBySiteId.set(DEMO_SITE, {
    id: sandboxId('egr'),
    siteId: DEMO_SITE,
    allowOverflow: false,
    purposeTags: ['realtime-inference'],
    updatedAt: now,
  });
}

export function listModelVersions(filter?: { status?: string }): SandboxModelVersion[] {
  ensureProductSandboxSeeded();
  let items = [...state().modelVersionsById.values()];
  if (filter?.status) {
    items = items.filter((m) => m.status === filter.status);
  }
  return items;
}

export function getModelVersion(id: string): SandboxModelVersion | undefined {
  ensureProductSandboxSeeded();
  return state().modelVersionsById.get(id);
}

export function createModelVersion(input: {
  id?: string;
  name: string;
  artefactUri?: string;
}): SandboxModelVersion {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const model: SandboxModelVersion = {
    id: input.id ?? sandboxId('mdl'),
    name: input.name,
    artefactUri: input.artefactUri,
    status: 'registered',
    createdAt: now,
    updatedAt: now,
  };
  state().modelVersionsById.set(model.id, model);
  return model;
}

export function setLatencyBudget(
  modelVersionId: string,
  budget: {
    maxLatencyMs: number;
    allowCloudOverflow?: boolean;
    measurementDefinition?: string;
  }
): SandboxLatencyBudget | undefined {
  ensureProductSandboxSeeded();
  const model = state().modelVersionsById.get(modelVersionId);
  if (!model) return undefined;
  const latencyBudget: SandboxLatencyBudget = {
    modelVersionId,
    maxLatencyMs: budget.maxLatencyMs,
    allowCloudOverflow: budget.allowCloudOverflow ?? false,
    measurementDefinition: budget.measurementDefinition,
    updatedAt: nowIso(),
  };
  model.latencyBudget = latencyBudget;
  model.status = 'eligible';
  model.updatedAt = nowIso();
  state().modelVersionsById.set(modelVersionId, model);
  return latencyBudget;
}

export function listEdgeNodes(filter?: { siteId?: string }): SandboxEdgeNode[] {
  ensureProductSandboxSeeded();
  let items = [...state().edgeNodesById.values()];
  if (filter?.siteId) {
    items = items.filter((n) => n.siteId === filter.siteId);
  }
  return items;
}

export function createEdgeNode(input: {
  id?: string;
  siteId: string;
  deviceClass: string;
  availableComputeUnits: number;
  measuredRttMs?: number;
  pricePerCompliantInference?: number;
  health?: SandboxEdgeNode['health'];
}): SandboxEdgeNode {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const node: SandboxEdgeNode = {
    id: input.id ?? sandboxId('nde'),
    siteId: input.siteId,
    deviceClass: input.deviceClass,
    availableComputeUnits: input.availableComputeUnits,
    measuredRttMs: input.measuredRttMs,
    health: input.health ?? 'healthy',
    pricePerCompliantInference: input.pricePerCompliantInference,
    createdAt: now,
    updatedAt: now,
  };
  state().edgeNodesById.set(node.id, node);
  return node;
}

export function listCapacityOffers(filter?: {
  siteId?: string;
  edgeNodeId?: string;
  status?: string;
}): SandboxCapacityOffer[] {
  ensureProductSandboxSeeded();
  let items = [...state().capacityOffersById.values()];
  if (filter?.siteId) items = items.filter((o) => o.siteId === filter.siteId);
  if (filter?.edgeNodeId) items = items.filter((o) => o.edgeNodeId === filter.edgeNodeId);
  if (filter?.status) items = items.filter((o) => o.status === filter.status);
  return items;
}

export function createCapacityOffer(input: {
  id?: string;
  edgeNodeId: string;
  siteId?: string;
  slotsAvailable: number;
  pricingModel: SandboxCapacityOffer['pricingModel'];
  unitPrice: number;
}): SandboxCapacityOffer | undefined {
  ensureProductSandboxSeeded();
  const node = state().edgeNodesById.get(input.edgeNodeId);
  const siteId = input.siteId ?? node?.siteId;
  if (!siteId) return undefined;
  const now = nowIso();
  const offer: SandboxCapacityOffer = {
    id: input.id ?? sandboxId('cof'),
    edgeNodeId: input.edgeNodeId,
    siteId,
    slotsAvailable: input.slotsAvailable,
    pricingModel: input.pricingModel,
    unitPrice: input.unitPrice,
    status: 'published',
    createdAt: now,
    updatedAt: now,
  };
  state().capacityOffersById.set(offer.id, offer);
  return offer;
}

export function withdrawCapacityOffer(offerId: string): SandboxCapacityOffer | undefined {
  ensureProductSandboxSeeded();
  const offer = state().capacityOffersById.get(offerId);
  if (!offer) return undefined;
  offer.status = 'withdrawn';
  offer.updatedAt = nowIso();
  state().capacityOffersById.set(offerId, offer);
  return offer;
}

export function siteHasActiveFreeze(siteId: string): boolean {
  ensureProductSandboxSeeded();
  return [...state().siteFreezesById.values()].some((f) => f.siteId === siteId && f.active);
}

export function pickPlacementCandidate(input: {
  siteId: string;
  modelVersionId: string;
  preferredDeviceClass?: string;
  allowCloudOverflow?: boolean;
}): {
  status: 'accepted' | 'refused';
  edgeNodeId?: string;
  deviceClass?: string;
  measuredRttMs?: number;
  refusalReason?: string;
  cloudOverflow: boolean;
} {
  ensureProductSandboxSeeded();
  const model = state().modelVersionsById.get(input.modelVersionId);
  if (!model) {
    return {
      status: 'refused',
      refusalReason: `Model version not found: ${input.modelVersionId}`,
      cloudOverflow: false,
    };
  }

  if (siteHasActiveFreeze(input.siteId)) {
    return {
      status: 'refused',
      refusalReason: `Site ${input.siteId} has an active placement freeze`,
      cloudOverflow: false,
    };
  }

  const budget = model.latencyBudget;
  if (!budget) {
    return {
      status: 'refused',
      refusalReason: 'Model has no latency budget; set a budget before placement',
      cloudOverflow: false,
    };
  }

  const allowCloud =
    Boolean(input.allowCloudOverflow) || Boolean(budget.allowCloudOverflow);

  let candidates = listEdgeNodes({ siteId: input.siteId }).filter(
    (n) =>
      n.health === 'healthy' &&
      typeof n.measuredRttMs === 'number' &&
      (n.measuredRttMs as number) <= budget.maxLatencyMs
  );

  if (!allowCloud) {
    candidates = candidates.filter((n) => n.deviceClass !== 'cloud');
  }

  if (input.preferredDeviceClass) {
    const preferred = candidates.filter(
      (n) => n.deviceClass === input.preferredDeviceClass
    );
    if (preferred.length > 0) candidates = preferred;
  }

  candidates.sort((a, b) => {
    const rankDiff = deviceClassRank(a.deviceClass) - deviceClassRank(b.deviceClass);
    if (rankDiff !== 0) return rankDiff;
    return (a.measuredRttMs ?? 9999) - (b.measuredRttMs ?? 9999);
  });

  const chosen = candidates[0];
  if (!chosen) {
    return {
      status: 'refused',
      refusalReason: allowCloud
        ? `No healthy node at ${input.siteId} meets latency budget ${budget.maxLatencyMs}ms`
        : `No on/near-device node meets latency budget ${budget.maxLatencyMs}ms (cloud overflow not allowed)`,
      cloudOverflow: false,
    };
  }

  const cloudOverflow = chosen.deviceClass === 'cloud' && allowCloud;
  return {
    status: 'accepted',
    edgeNodeId: chosen.id,
    deviceClass: chosen.deviceClass,
    measuredRttMs: chosen.measuredRttMs,
    cloudOverflow,
  };
}

export function createPlacement(input: {
  id?: string;
  modelVersionId: string;
  siteId: string;
  preferredDeviceClass?: string;
  allowCloudOverflow?: boolean;
}): SandboxPlacement {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const decision = pickPlacementCandidate(input);
  const placement: SandboxPlacement = {
    id: input.id ?? sandboxId('plc'),
    modelVersionId: input.modelVersionId,
    siteId: input.siteId,
    edgeNodeId: decision.edgeNodeId,
    deviceClass: decision.deviceClass,
    status: decision.status,
    measuredRttMs: decision.measuredRttMs,
    refusalReason: decision.refusalReason,
    cloudOverflow: decision.cloudOverflow,
    createdAt: now,
    updatedAt: now,
  };
  state().placementsById.set(placement.id, placement);
  return placement;
}

export function listPlacements(filter?: {
  siteId?: string;
  status?: string;
}): SandboxPlacement[] {
  ensureProductSandboxSeeded();
  let items = [...state().placementsById.values()];
  if (filter?.siteId) items = items.filter((p) => p.siteId === filter.siteId);
  if (filter?.status) items = items.filter((p) => p.status === filter.status);
  return items;
}

export function getPlacement(id: string): SandboxPlacement | undefined {
  ensureProductSandboxSeeded();
  return state().placementsById.get(id);
}

export function rollbackPlacement(
  placementId: string,
  reason?: string
): SandboxPlacement | undefined {
  ensureProductSandboxSeeded();
  const placement = state().placementsById.get(placementId);
  if (!placement) return undefined;
  placement.status = 'rolled_back';
  placement.refusalReason = reason ?? placement.refusalReason;
  placement.updatedAt = nowIso();
  state().placementsById.set(placementId, placement);
  return placement;
}

export function simulatePlacementFeasibility(input: {
  modelVersionId: string;
  siteId: string;
  preferredDeviceClass?: string;
}): {
  feasible: boolean;
  candidateNodeIds: string[];
  reason?: string;
  estimatedRttMs?: number;
} {
  const decision = pickPlacementCandidate({
    ...input,
    allowCloudOverflow: false,
  });
  if (decision.status === 'accepted' && decision.edgeNodeId) {
    return {
      feasible: true,
      candidateNodeIds: [decision.edgeNodeId],
      estimatedRttMs: decision.measuredRttMs,
    };
  }
  return {
    feasible: false,
    candidateNodeIds: [],
    reason: decision.refusalReason,
  };
}

export function listSlaSamples(filter?: {
  siteId?: string;
  modelVersionId?: string;
  deviceClass?: string;
}): SandboxSlaSample[] {
  ensureProductSandboxSeeded();
  let items = [...state().slaSamplesById.values()];
  if (filter?.siteId) items = items.filter((s) => s.siteId === filter.siteId);
  if (filter?.modelVersionId) {
    items = items.filter((s) => s.modelVersionId === filter.modelVersionId);
  }
  if (filter?.deviceClass) {
    items = items.filter((s) => s.deviceClass === filter.deviceClass);
  }
  return items;
}

export function ingestSlaSample(input: {
  id?: string;
  placementId: string;
  siteId: string;
  modelVersionId: string;
  deviceClass?: string;
  latencyMs: number;
  sampledAt?: string;
}): SandboxSlaSample {
  ensureProductSandboxSeeded();
  const model = state().modelVersionsById.get(input.modelVersionId);
  const max = model?.latencyBudget?.maxLatencyMs;
  const sample: SandboxSlaSample = {
    id: input.id ?? sandboxId('sla'),
    placementId: input.placementId,
    siteId: input.siteId,
    modelVersionId: input.modelVersionId,
    deviceClass: input.deviceClass,
    latencyMs: input.latencyMs,
    withinBudget: typeof max === 'number' ? input.latencyMs <= max : true,
    sampledAt: input.sampledAt ?? nowIso(),
  };
  state().slaSamplesById.set(sample.id, sample);
  return sample;
}

export function listIncidentPacks(filter?: { siteId?: string }): SandboxIncidentPack[] {
  ensureProductSandboxSeeded();
  let items = [...state().incidentPacksById.values()];
  if (filter?.siteId) items = items.filter((i) => i.siteId === filter.siteId);
  return items;
}

export function createIncidentPack(input: {
  id?: string;
  siteId: string;
  modelVersionId?: string;
  edgeNodeId?: string;
  windowStart: string;
  windowEnd: string;
}): SandboxIncidentPack {
  ensureProductSandboxSeeded();
  const pack: SandboxIncidentPack = {
    id: input.id ?? sandboxId('inc'),
    siteId: input.siteId,
    modelVersionId: input.modelVersionId,
    edgeNodeId: input.edgeNodeId,
    placementIds: listPlacements({ siteId: input.siteId }).map((p) => p.id),
    windowStart: input.windowStart,
    windowEnd: input.windowEnd,
    createdAt: nowIso(),
  };
  state().incidentPacksById.set(pack.id, pack);
  return pack;
}

export function getIncidentPack(id: string): SandboxIncidentPack | undefined {
  ensureProductSandboxSeeded();
  return state().incidentPacksById.get(id);
}

export function listSiteFreezes(filter?: { siteId?: string }): SandboxSiteFreeze[] {
  ensureProductSandboxSeeded();
  let items = [...state().siteFreezesById.values()];
  if (filter?.siteId) items = items.filter((f) => f.siteId === filter.siteId);
  return items;
}

export function freezeSite(input: {
  id?: string;
  siteId: string;
  reason?: string;
  frozenByUserId?: string;
}): SandboxSiteFreeze {
  ensureProductSandboxSeeded();
  const now = nowIso();
  // Deactivate prior active freezes for the site
  for (const freeze of state().siteFreezesById.values()) {
    if (freeze.siteId === input.siteId && freeze.active) {
      freeze.active = false;
      freeze.updatedAt = now;
    }
  }
  const record: SandboxSiteFreeze = {
    id: input.id ?? sandboxId('frz'),
    siteId: input.siteId,
    active: true,
    reason: input.reason,
    frozenByUserId: input.frozenByUserId,
    createdAt: now,
    updatedAt: now,
  };
  state().siteFreezesById.set(record.id, record);
  return record;
}

export function unfreezeSite(freezeId: string): SandboxSiteFreeze | undefined {
  ensureProductSandboxSeeded();
  const freeze = state().siteFreezesById.get(freezeId);
  if (!freeze) return undefined;
  freeze.active = false;
  freeze.updatedAt = nowIso();
  state().siteFreezesById.set(freezeId, freeze);
  return freeze;
}

export function listSafeModeEvents(filter?: {
  siteId?: string;
}): SandboxSafeModeEvent[] {
  ensureProductSandboxSeeded();
  let items = [...state().safeModeEventsById.values()];
  if (filter?.siteId) items = items.filter((e) => e.siteId === filter.siteId);
  return items;
}

export function enterSafeMode(input: {
  id?: string;
  siteId: string;
  placementId?: string;
  playbook: string;
}): SandboxSafeModeEvent {
  ensureProductSandboxSeeded();
  const now = nowIso();
  if (input.placementId) {
    const placement = state().placementsById.get(input.placementId);
    if (placement) {
      placement.status = 'safe_mode';
      placement.updatedAt = now;
      state().placementsById.set(placement.id, placement);
    }
  }
  const event: SandboxSafeModeEvent = {
    id: input.id ?? sandboxId('sfe'),
    siteId: input.siteId,
    placementId: input.placementId,
    status: 'active',
    playbook: input.playbook,
    createdAt: now,
    updatedAt: now,
  };
  state().safeModeEventsById.set(event.id, event);
  return event;
}

export function clearSafeMode(
  eventId: string,
  acknowledgment?: string
): SandboxSafeModeEvent | undefined {
  ensureProductSandboxSeeded();
  const event = state().safeModeEventsById.get(eventId);
  if (!event) return undefined;
  event.status = 'cleared';
  event.acknowledgment = acknowledgment;
  event.updatedAt = nowIso();
  state().safeModeEventsById.set(eventId, event);
  return event;
}

export function upsertEgressPolicy(input: {
  id?: string;
  siteId: string;
  allowOverflow: boolean;
  purposeTags?: string[];
}): SandboxEgressPolicy {
  ensureProductSandboxSeeded();
  const existing = state().egressPoliciesBySiteId.get(input.siteId);
  const policy: SandboxEgressPolicy = {
    id: existing?.id ?? input.id ?? sandboxId('egr'),
    siteId: input.siteId,
    allowOverflow: input.allowOverflow,
    purposeTags: input.purposeTags ?? existing?.purposeTags ?? [],
    updatedAt: nowIso(),
  };
  state().egressPoliciesBySiteId.set(input.siteId, policy);
  return policy;
}

export function listOverflowExceptions(filter?: {
  siteId?: string;
}): SandboxOverflowException[] {
  ensureProductSandboxSeeded();
  let items = [...state().overflowExceptionsById.values()];
  if (filter?.siteId) items = items.filter((o) => o.siteId === filter.siteId);
  return items;
}

export function requestOverflowException(input: {
  id?: string;
  siteId: string;
  purposeTag: string;
  rationale?: string;
}): SandboxOverflowException {
  ensureProductSandboxSeeded();
  const now = nowIso();
  const record: SandboxOverflowException = {
    id: input.id ?? sandboxId('ovx'),
    siteId: input.siteId,
    purposeTag: input.purposeTag,
    rationale: input.rationale,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  state().overflowExceptionsById.set(record.id, record);
  return record;
}
