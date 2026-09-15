/**
 * Capacity Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/capacity.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CapacityOffer = components["schemas"]["CapacityOffer"];
export type CapacityOfferCreate = components["schemas"]["CapacityOfferCreate"];
export type CapacityOfferId = components["schemas"]["CapacityOfferId"];
export type CapacityOfferListData = components["schemas"]["CapacityOfferListData"];
export type EdgeNode = components["schemas"]["EdgeNode"];
export type EdgeNodeId = components["schemas"]["EdgeNodeId"];
export type EdgeNodeListData = components["schemas"]["EdgeNodeListData"];
export type EdgeNodePublish = components["schemas"]["EdgeNodePublish"];
export type NodeHealth = components["schemas"]["NodeHealth"];
export type PricingModel = components["schemas"]["PricingModel"];
export type Node = operations["listEdgeNodes"]["responses"]["200"]["content"]["application/json"]["data"];
export type Offer = operations["listCapacityOffers"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type PublishEdgeNodeRequestInput = NonNullable<operations["publishEdgeNode"]["requestBody"]>["content"]["application/json"];
export type PublishCapacityOfferRequestInput = NonNullable<operations["publishCapacityOffer"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEdgeNodesParams = NonNullable<operations["listEdgeNodes"]["parameters"]["query"]>;
export type ListCapacityOffersParams = NonNullable<operations["listCapacityOffers"]["parameters"]["query"]>;
export type WithdrawCapacityOfferParams = operations["withdrawCapacityOffer"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEdgeNodesResponse = operations["listEdgeNodes"]["responses"]["200"]["content"]["application/json"];
export type PublishEdgeNodeResponse = operations["publishEdgeNode"]["responses"]["201"]["content"]["application/json"];
export type ListCapacityOffersResponse = operations["listCapacityOffers"]["responses"]["200"]["content"]["application/json"];
export type PublishCapacityOfferResponse = operations["publishCapacityOffer"]["responses"]["201"]["content"]["application/json"];
export type WithdrawCapacityOfferResponse = operations["withdrawCapacityOffer"]["responses"]["200"]["content"]["application/json"];


