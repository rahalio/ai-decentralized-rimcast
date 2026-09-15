import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const publishEdgeNode_Body = z
  .object({
    siteId: z.string().min(1),
    deviceClass: z.string(),
    availableComputeUnits: z.number(),
    measuredRttMs: z.number().int().gte(0).optional(),
    pricePerCompliantInference: z.number().gte(0).optional(),
  })
  .passthrough();
const publishCapacityOffer_Body = z
  .object({
    edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
    slotsAvailable: z.number().int().gte(0),
    pricingModel: z.enum(['per_compliant_inference', 'reserved_slot']),
    unitPrice: z.number().gte(0),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PageInfo = z
  .object({
    page: z.number().int().gte(1),
    limit: z.number().int().gte(1),
    total: z.number().int().gte(0),
    cursor: z.string(),
  })
  .partial()
  .passthrough();
const PagedDataEnvelope = z
  .object({
    data: z.object({ items: z.array(z.unknown()) }).passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough();
const EdgeNodeId = z.string();
const NodeHealth = z.enum(['healthy', 'degraded', 'unhealthy']);
const EdgeNode = z
  .object({
    id: z.string().regex(/^nde_[0-9a-z]{26}$/),
    siteId: z.string().min(1),
    deviceClass: z.string(),
    availableComputeUnits: z.number(),
    measuredRttMs: z.number().int().gte(0).optional(),
    health: z.enum(['healthy', 'degraded', 'unhealthy']),
    pricePerCompliantInference: z.number().gte(0).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const EdgeNodeListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^nde_[0-9a-z]{26}$/),
          siteId: z.string().min(1),
          deviceClass: z.string(),
          availableComputeUnits: z.number(),
          measuredRttMs: z.number().int().gte(0).optional(),
          health: z.enum(['healthy', 'degraded', 'unhealthy']),
          pricePerCompliantInference: z.number().gte(0).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const EdgeNodeListResponse = z
  .object({
    data: z.object({ items: z.array(z.unknown()) }).passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^nde_[0-9a-z]{26}$/),
                  siteId: z.string().min(1),
                  deviceClass: z.string(),
                  availableComputeUnits: z.number(),
                  measuredRttMs: z.number().int().gte(0).optional(),
                  health: z.enum(['healthy', 'degraded', 'unhealthy']),
                  pricePerCompliantInference: z.number().gte(0).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const EdgeNodePublish = z
  .object({
    siteId: z.string().min(1),
    deviceClass: z.string(),
    availableComputeUnits: z.number(),
    measuredRttMs: z.number().int().gte(0).optional(),
    pricePerCompliantInference: z.number().gte(0).optional(),
  })
  .passthrough();
const DataEnvelope = z
  .object({
    data: z.unknown(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const EdgeNodeResponse = z
  .object({
    data: z.unknown(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            id: z.string().regex(/^nde_[0-9a-z]{26}$/),
            siteId: z.string().min(1),
            deviceClass: z.string(),
            availableComputeUnits: z.number(),
            measuredRttMs: z.number().int().gte(0).optional(),
            health: z.enum(['healthy', 'degraded', 'unhealthy']),
            pricePerCompliantInference: z.number().gte(0).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const CapacityOfferId = z.string();
const PricingModel = z.enum(['per_compliant_inference', 'reserved_slot']);
const CapacityOffer = z
  .object({
    id: z.string().regex(/^cof_[0-9a-z]{26}$/),
    edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
    siteId: z.string(),
    slotsAvailable: z.number().int().gte(0),
    pricingModel: z.enum(['per_compliant_inference', 'reserved_slot']),
    unitPrice: z.number().gte(0),
    status: z.enum(['published', 'withdrawn']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CapacityOfferListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cof_[0-9a-z]{26}$/),
          edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
          siteId: z.string(),
          slotsAvailable: z.number().int().gte(0),
          pricingModel: z.enum(['per_compliant_inference', 'reserved_slot']),
          unitPrice: z.number().gte(0),
          status: z.enum(['published', 'withdrawn']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const CapacityOfferListResponse = z
  .object({
    data: z.object({ items: z.array(z.unknown()) }).passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .and(
        z
          .object({
            pagination: z
              .object({
                page: z.number().int().gte(1),
                limit: z.number().int().gte(1),
                total: z.number().int().gte(0),
                cursor: z.string(),
              })
              .partial()
              .passthrough(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cof_[0-9a-z]{26}$/),
                  edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  slotsAvailable: z.number().int().gte(0),
                  pricingModel: z.enum([
                    'per_compliant_inference',
                    'reserved_slot',
                  ]),
                  unitPrice: z.number().gte(0),
                  status: z.enum(['published', 'withdrawn']),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const CapacityOfferCreate = z
  .object({
    edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
    slotsAvailable: z.number().int().gte(0),
    pricingModel: z.enum(['per_compliant_inference', 'reserved_slot']),
    unitPrice: z.number().gte(0),
  })
  .passthrough();
const CapacityOfferResponse = z
  .object({
    data: z.unknown(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough()
  .and(
    z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cof_[0-9a-z]{26}$/),
            edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
            siteId: z.string(),
            slotsAvailable: z.number().int().gte(0),
            pricingModel: z.enum(['per_compliant_inference', 'reserved_slot']),
            unitPrice: z.number().gte(0),
            status: z.enum(['published', 'withdrawn']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  publishEdgeNode_Body,
  publishCapacityOffer_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  EdgeNodeId,
  NodeHealth,
  EdgeNode,
  EdgeNodeListData,
  EdgeNodeListResponse,
  EdgeNodePublish,
  DataEnvelope,
  EdgeNodeResponse,
  CapacityOfferId,
  PricingModel,
  CapacityOffer,
  CapacityOfferListData,
  CapacityOfferListResponse,
  CapacityOfferCreate,
  CapacityOfferResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/capacity/nodes',
    alias: 'listEdgeNodes',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'siteId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z.object({ items: z.array(z.unknown()) }).passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .and(
            z
              .object({
                pagination: z
                  .object({
                    page: z.number().int().gte(1),
                    limit: z.number().int().gte(1),
                    total: z.number().int().gte(0),
                    cursor: z.string(),
                  })
                  .partial()
                  .passthrough(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                items: z.array(
                  z
                    .object({
                      id: z.string().regex(/^nde_[0-9a-z]{26}$/),
                      siteId: z.string().min(1),
                      deviceClass: z.string(),
                      availableComputeUnits: z.number(),
                      measuredRttMs: z.number().int().gte(0).optional(),
                      health: z.enum(['healthy', 'degraded', 'unhealthy']),
                      pricePerCompliantInference: z.number().gte(0).optional(),
                      createdAt: z.string().datetime({ offset: true }),
                      updatedAt: z.string().datetime({ offset: true }),
                    })
                    .passthrough()
                ),
                nextCursor: z.string().optional(),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'post',
    path: '/v1/capacity/nodes',
    alias: 'publishEdgeNode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: publishEdgeNode_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^nde_[0-9a-z]{26}$/),
                siteId: z.string().min(1),
                deviceClass: z.string(),
                availableComputeUnits: z.number(),
                measuredRttMs: z.number().int().gte(0).optional(),
                health: z.enum(['healthy', 'degraded', 'unhealthy']),
                pricePerCompliantInference: z.number().gte(0).optional(),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'get',
    path: '/v1/capacity/offers',
    alias: 'listCapacityOffers',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'siteId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z.object({ items: z.array(z.unknown()) }).passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .and(
            z
              .object({
                pagination: z
                  .object({
                    page: z.number().int().gte(1),
                    limit: z.number().int().gte(1),
                    total: z.number().int().gte(0),
                    cursor: z.string(),
                  })
                  .partial()
                  .passthrough(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                items: z.array(
                  z
                    .object({
                      id: z.string().regex(/^cof_[0-9a-z]{26}$/),
                      edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      slotsAvailable: z.number().int().gte(0),
                      pricingModel: z.enum([
                        'per_compliant_inference',
                        'reserved_slot',
                      ]),
                      unitPrice: z.number().gte(0),
                      status: z.enum(['published', 'withdrawn']),
                      createdAt: z.string().datetime({ offset: true }),
                      updatedAt: z.string().datetime({ offset: true }),
                    })
                    .passthrough()
                ),
                nextCursor: z.string().optional(),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'post',
    path: '/v1/capacity/offers',
    alias: 'publishCapacityOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: publishCapacityOffer_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^cof_[0-9a-z]{26}$/),
                edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
                siteId: z.string(),
                slotsAvailable: z.number().int().gte(0),
                pricingModel: z.enum([
                  'per_compliant_inference',
                  'reserved_slot',
                ]),
                unitPrice: z.number().gte(0),
                status: z.enum(['published', 'withdrawn']),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'post',
    path: '/v1/capacity/offers/:offerId/withdraw',
    alias: 'withdrawCapacityOffer',
    requestFormat: 'json',
    parameters: [
      {
        name: 'offerId',
        type: 'Path',
        schema: z.string().regex(/^cof_[0-9a-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z.unknown(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough()
      .and(
        z
          .object({
            data: z
              .object({
                id: z.string().regex(/^cof_[0-9a-z]{26}$/),
                edgeNodeId: z.string().regex(/^nde_[0-9a-z]{26}$/),
                siteId: z.string(),
                slotsAvailable: z.number().int().gte(0),
                pricingModel: z.enum([
                  'per_compliant_inference',
                  'reserved_slot',
                ]),
                unitPrice: z.number().gte(0),
                status: z.enum(['published', 'withdrawn']),
                createdAt: z.string().datetime({ offset: true }),
                updatedAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
    errors: [
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
