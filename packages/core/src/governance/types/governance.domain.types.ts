/**
 * Governance Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/governance.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EgressPolicy = components["schemas"]["EgressPolicy"];
export type EgressPolicyId = components["schemas"]["EgressPolicyId"];
export type EgressPolicyUpsert = components["schemas"]["EgressPolicyUpsert"];
export type OverflowException = components["schemas"]["OverflowException"];
export type OverflowExceptionCreate = components["schemas"]["OverflowExceptionCreate"];
export type OverflowExceptionId = components["schemas"]["OverflowExceptionId"];
export type OverflowExceptionListData = components["schemas"]["OverflowExceptionListData"];
export type SafeModeClear = components["schemas"]["SafeModeClear"];
export type SafeModeEnter = components["schemas"]["SafeModeEnter"];
export type SafeModeEvent = components["schemas"]["SafeModeEvent"];
export type SafeModeEventId = components["schemas"]["SafeModeEventId"];
export type SafeModeEventListData = components["schemas"]["SafeModeEventListData"];
export type SiteFreeze = components["schemas"]["SiteFreeze"];
export type SiteFreezeCreate = components["schemas"]["SiteFreezeCreate"];
export type SiteFreezeId = components["schemas"]["SiteFreezeId"];
export type SiteFreezeListData = components["schemas"]["SiteFreezeListData"];
export type SafeMode = operations["listSafeModeEvents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type FreezeSitePlacementsRequestInput = NonNullable<operations["freezeSitePlacements"]["requestBody"]>["content"]["application/json"];
export type EnterSafeModeRequestInput = NonNullable<operations["enterSafeMode"]["requestBody"]>["content"]["application/json"];
export type ClearSafeModeRequestInput = NonNullable<operations["clearSafeMode"]["requestBody"]>["content"]["application/json"];
export type UpsertEgressPolicyRequestInput = NonNullable<operations["upsertEgressPolicy"]["requestBody"]>["content"]["application/json"];
export type RequestOverflowExceptionRequestInput = NonNullable<operations["requestOverflowException"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSiteFreezesParams = NonNullable<operations["listSiteFreezes"]["parameters"]["query"]>;
export type UnfreezeSitePlacementsParams = operations["unfreezeSitePlacements"]["parameters"]["path"];
export type ListSafeModeEventsParams = NonNullable<operations["listSafeModeEvents"]["parameters"]["query"]>;
export type ClearSafeModeParams = operations["clearSafeMode"]["parameters"]["path"];
export type ListOverflowExceptionsParams = NonNullable<operations["listOverflowExceptions"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSiteFreezesResponse = operations["listSiteFreezes"]["responses"]["200"]["content"]["application/json"];
export type FreezeSitePlacementsResponse = operations["freezeSitePlacements"]["responses"]["201"]["content"]["application/json"];
export type UnfreezeSitePlacementsResponse = operations["unfreezeSitePlacements"]["responses"]["200"]["content"]["application/json"];
export type ListSafeModeEventsResponse = operations["listSafeModeEvents"]["responses"]["200"]["content"]["application/json"];
export type EnterSafeModeResponse = operations["enterSafeMode"]["responses"]["201"]["content"]["application/json"];
export type ClearSafeModeResponse = operations["clearSafeMode"]["responses"]["200"]["content"]["application/json"];
export type UpsertEgressPolicyResponse = operations["upsertEgressPolicy"]["responses"]["200"]["content"]["application/json"];
export type ListOverflowExceptionsResponse = operations["listOverflowExceptions"]["responses"]["200"]["content"]["application/json"];
export type RequestOverflowExceptionResponse = operations["requestOverflowException"]["responses"]["201"]["content"]["application/json"];


