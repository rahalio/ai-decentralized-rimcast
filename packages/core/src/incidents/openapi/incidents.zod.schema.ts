import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createIncidentPack_Body = z
  .object({
    siteId: z.string(),
    modelVersionId: z.string().optional(),
    edgeNodeId: z.string().optional(),
    windowStart: z.string().datetime({ offset: true }),
    windowEnd: z.string().datetime({ offset: true }),
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
const IncidentPackId = z.string();
const IncidentPack = z
  .object({
    id: z.string().regex(/^inc_[0-9a-z]{26}$/),
    siteId: z.string(),
    modelVersionId: z.string().optional(),
    edgeNodeId: z.string().optional(),
    placementIds: z.array(z.string()).optional(),
    windowStart: z.string().datetime({ offset: true }),
    windowEnd: z.string().datetime({ offset: true }),
    exportUri: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const IncidentPackListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^inc_[0-9a-z]{26}$/),
          siteId: z.string(),
          modelVersionId: z.string().optional(),
          edgeNodeId: z.string().optional(),
          placementIds: z.array(z.string()).optional(),
          windowStart: z.string().datetime({ offset: true }),
          windowEnd: z.string().datetime({ offset: true }),
          exportUri: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const IncidentPackListResponse = z
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
                  id: z.string().regex(/^inc_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  modelVersionId: z.string().optional(),
                  edgeNodeId: z.string().optional(),
                  placementIds: z.array(z.string()).optional(),
                  windowStart: z.string().datetime({ offset: true }),
                  windowEnd: z.string().datetime({ offset: true }),
                  exportUri: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
const IncidentPackCreate = z
  .object({
    siteId: z.string(),
    modelVersionId: z.string().optional(),
    edgeNodeId: z.string().optional(),
    windowStart: z.string().datetime({ offset: true }),
    windowEnd: z.string().datetime({ offset: true }),
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
const IncidentPackResponse = z
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
            id: z.string().regex(/^inc_[0-9a-z]{26}$/),
            siteId: z.string(),
            modelVersionId: z.string().optional(),
            edgeNodeId: z.string().optional(),
            placementIds: z.array(z.string()).optional(),
            windowStart: z.string().datetime({ offset: true }),
            windowEnd: z.string().datetime({ offset: true }),
            exportUri: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  createIncidentPack_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  IncidentPackId,
  IncidentPack,
  IncidentPackListData,
  IncidentPackListResponse,
  IncidentPackCreate,
  DataEnvelope,
  IncidentPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/incidents',
    alias: 'listIncidentPacks',
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
                      id: z.string().regex(/^inc_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      modelVersionId: z.string().optional(),
                      edgeNodeId: z.string().optional(),
                      placementIds: z.array(z.string()).optional(),
                      windowStart: z.string().datetime({ offset: true }),
                      windowEnd: z.string().datetime({ offset: true }),
                      exportUri: z.string().optional(),
                      createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/incidents',
    alias: 'createIncidentPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createIncidentPack_Body,
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
                id: z.string().regex(/^inc_[0-9a-z]{26}$/),
                siteId: z.string(),
                modelVersionId: z.string().optional(),
                edgeNodeId: z.string().optional(),
                placementIds: z.array(z.string()).optional(),
                windowStart: z.string().datetime({ offset: true }),
                windowEnd: z.string().datetime({ offset: true }),
                exportUri: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
  {
    method: 'get',
    path: '/v1/incidents/:incidentId',
    alias: 'getIncidentPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'incidentId',
        type: 'Path',
        schema: z.string().regex(/^inc_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^inc_[0-9a-z]{26}$/),
                siteId: z.string(),
                modelVersionId: z.string().optional(),
                edgeNodeId: z.string().optional(),
                placementIds: z.array(z.string()).optional(),
                windowStart: z.string().datetime({ offset: true }),
                windowEnd: z.string().datetime({ offset: true }),
                exportUri: z.string().optional(),
                createdAt: z.string().datetime({ offset: true }),
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
