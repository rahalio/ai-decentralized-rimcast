/**
 * Placements Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/placements.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type FeasibilityResult = components["schemas"]["FeasibilityResult"];
export type Placement = components["schemas"]["Placement"];
export type PlacementId = components["schemas"]["PlacementId"];
export type PlacementListData = components["schemas"]["PlacementListData"];
export type PlacementStatus = components["schemas"]["PlacementStatus"];
export type PlacementRequest = components["schemas"]["PlacementRequest"];
export type PlacementRollbackRequest = components["schemas"]["PlacementRollbackRequest"];
export type PlacementSimulateRequest = components["schemas"]["PlacementSimulateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RequestPlacementRequestInput = NonNullable<operations["requestPlacement"]["requestBody"]>["content"]["application/json"];
export type SimulatePlacementFeasibilityRequestInput = NonNullable<operations["simulatePlacementFeasibility"]["requestBody"]>["content"]["application/json"];
export type RollbackPlacementRequestInput = NonNullable<operations["rollbackPlacement"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPlacementsParams = NonNullable<operations["listPlacements"]["parameters"]["query"]>;
export type GetPlacementParams = operations["getPlacement"]["parameters"]["path"];
export type RollbackPlacementParams = operations["rollbackPlacement"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPlacementsResponse = operations["listPlacements"]["responses"]["200"]["content"]["application/json"];
export type RequestPlacementResponse = operations["requestPlacement"]["responses"]["201"]["content"]["application/json"];
export type SimulatePlacementFeasibilityResponse = operations["simulatePlacementFeasibility"]["responses"]["200"]["content"]["application/json"];
export type GetPlacementResponse = operations["getPlacement"]["responses"]["200"]["content"]["application/json"];
export type RollbackPlacementResponse = operations["rollbackPlacement"]["responses"]["200"]["content"]["application/json"];


