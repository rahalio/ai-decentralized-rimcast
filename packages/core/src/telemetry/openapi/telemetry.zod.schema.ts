import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const ingestSlaSample_Body = z
  .object({
    placementId: z.string(),
    siteId: z.string(),
    modelVersionId: z.string(),
    deviceClass: z.string().optional(),
    latencyMs: z.number().int().gte(0),
    sampledAt: z.string().datetime({ offset: true }).optional(),
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
const SlaSampleId = z.string();
const SlaSample = z
  .object({
    id: z.string().regex(/^sla_[0-9a-z]{26}$/),
    placementId: z.string(),
    siteId: z.string(),
    modelVersionId: z.string(),
    deviceClass: z.string().optional(),
    latencyMs: z.number().int().gte(0),
    withinBudget: z.boolean(),
    sampledAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SlaSampleListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^sla_[0-9a-z]{26}$/),
          placementId: z.string(),
          siteId: z.string(),
          modelVersionId: z.string(),
          deviceClass: z.string().optional(),
          latencyMs: z.number().int().gte(0),
          withinBudget: z.boolean(),
          sampledAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const SlaSampleListResponse = z
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
                  id: z.string().regex(/^sla_[0-9a-z]{26}$/),
                  placementId: z.string(),
                  siteId: z.string(),
                  modelVersionId: z.string(),
                  deviceClass: z.string().optional(),
                  latencyMs: z.number().int().gte(0),
                  withinBudget: z.boolean(),
                  sampledAt: z.string().datetime({ offset: true }),
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
const SlaSampleIngest = z
  .object({
    placementId: z.string(),
    siteId: z.string(),
    modelVersionId: z.string(),
    deviceClass: z.string().optional(),
    latencyMs: z.number().int().gte(0),
    sampledAt: z.string().datetime({ offset: true }).optional(),
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
const SlaSampleResponse = z
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
            id: z.string().regex(/^sla_[0-9a-z]{26}$/),
            placementId: z.string(),
            siteId: z.string(),
            modelVersionId: z.string(),
            deviceClass: z.string().optional(),
            latencyMs: z.number().int().gte(0),
            withinBudget: z.boolean(),
            sampledAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  ingestSlaSample_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  SlaSampleId,
  SlaSample,
  SlaSampleListData,
  SlaSampleListResponse,
  SlaSampleIngest,
  DataEnvelope,
  SlaSampleResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/telemetry/sla-samples',
    alias: 'listSlaSamples',
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
      {
        name: 'modelVersionId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'deviceClass',
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
                      id: z.string().regex(/^sla_[0-9a-z]{26}$/),
                      placementId: z.string(),
                      siteId: z.string(),
                      modelVersionId: z.string(),
                      deviceClass: z.string().optional(),
                      latencyMs: z.number().int().gte(0),
                      withinBudget: z.boolean(),
                      sampledAt: z.string().datetime({ offset: true }),
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
    path: '/v1/telemetry/sla-samples',
    alias: 'ingestSlaSample',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: ingestSlaSample_Body,
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
                id: z.string().regex(/^sla_[0-9a-z]{26}$/),
                placementId: z.string(),
                siteId: z.string(),
                modelVersionId: z.string(),
                deviceClass: z.string().optional(),
                latencyMs: z.number().int().gte(0),
                withinBudget: z.boolean(),
                sampledAt: z.string().datetime({ offset: true }),
              })
              .passthrough(),
          })
          .partial()
          .passthrough()
      ),
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
