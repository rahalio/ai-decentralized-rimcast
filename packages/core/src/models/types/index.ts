/**
 * Models Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/models.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type LatencyBudget = components["schemas"]["LatencyBudget"];
export type LatencyBudgetUpsert = components["schemas"]["LatencyBudgetUpsert"];
export type ModelStatus = components["schemas"]["ModelStatus"];
export type ModelVersion = components["schemas"]["ModelVersion"];
export type ModelVersionCreate = components["schemas"]["ModelVersionCreate"];
export type ModelVersionId = components["schemas"]["ModelVersionId"];
export type ModelVersionListData = components["schemas"]["ModelVersionListData"];
export type VModel = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterModelVersionRequestInput = NonNullable<operations["registerModelVersion"]["requestBody"]>["content"]["application/json"];
export type SetLatencyBudgetRequestInput = NonNullable<operations["setLatencyBudget"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListModelVersionsParams = NonNullable<operations["listModelVersions"]["parameters"]["query"]>;
export type GetModelVersionParams = operations["getModelVersion"]["parameters"]["path"];
export type SetLatencyBudgetParams = operations["setLatencyBudget"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListModelVersionsResponse = operations["listModelVersions"]["responses"]["200"]["content"]["application/json"];
export type RegisterModelVersionResponse = operations["registerModelVersion"]["responses"]["201"]["content"]["application/json"];
export type GetModelVersionResponse = operations["getModelVersion"]["responses"]["200"]["content"]["application/json"];
export type SetLatencyBudgetResponse = operations["setLatencyBudget"]["responses"]["200"]["content"]["application/json"];


