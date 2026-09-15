import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const freezeSitePlacements_Body = z
  .object({ siteId: z.string(), reason: z.string().optional() })
  .passthrough();
const enterSafeMode_Body = z
  .object({
    siteId: z.string(),
    placementId: z.string().optional(),
    playbook: z.string(),
  })
  .passthrough();
const upsertEgressPolicy_Body = z
  .object({
    siteId: z.string(),
    allowOverflow: z.boolean(),
    purposeTags: z.array(z.string()).optional(),
  })
  .passthrough();
const requestOverflowException_Body = z
  .object({
    siteId: z.string(),
    purposeTag: z.string(),
    rationale: z.string().min(1),
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
const SiteFreezeId = z.string();
const SiteFreeze = z
  .object({
    id: z.string().regex(/^frz_[0-9a-z]{26}$/),
    siteId: z.string(),
    active: z.boolean(),
    reason: z.string().optional(),
    frozenByUserId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SiteFreezeListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^frz_[0-9a-z]{26}$/),
          siteId: z.string(),
          active: z.boolean(),
          reason: z.string().optional(),
          frozenByUserId: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const SiteFreezeListResponse = z
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
                  id: z.string().regex(/^frz_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  active: z.boolean(),
                  reason: z.string().optional(),
                  frozenByUserId: z.string().optional(),
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
const SiteFreezeCreate = z
  .object({ siteId: z.string(), reason: z.string().optional() })
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
const SiteFreezeResponse = z
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
            id: z.string().regex(/^frz_[0-9a-z]{26}$/),
            siteId: z.string(),
            active: z.boolean(),
            reason: z.string().optional(),
            frozenByUserId: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const SafeModeEventId = z.string();
const SafeModeEvent = z
  .object({
    id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
    siteId: z.string(),
    placementId: z.string().optional(),
    status: z.enum(['active', 'cleared']),
    playbook: z.string(),
    acknowledgment: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SafeModeEventListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
          siteId: z.string(),
          placementId: z.string().optional(),
          status: z.enum(['active', 'cleared']),
          playbook: z.string(),
          acknowledgment: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const SafeModeEventListResponse = z
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
                  id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  placementId: z.string().optional(),
                  status: z.enum(['active', 'cleared']),
                  playbook: z.string(),
                  acknowledgment: z.string().optional(),
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
const SafeModeEnter = z
  .object({
    siteId: z.string(),
    placementId: z.string().optional(),
    playbook: z.string(),
  })
  .passthrough();
const SafeModeEventResponse = z
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
            id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
            siteId: z.string(),
            placementId: z.string().optional(),
            status: z.enum(['active', 'cleared']),
            playbook: z.string(),
            acknowledgment: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const SafeModeClear = z
  .object({ acknowledgment: z.string() })
  .partial()
  .passthrough();
const EgressPolicyUpsert = z
  .object({
    siteId: z.string(),
    allowOverflow: z.boolean(),
    purposeTags: z.array(z.string()).optional(),
  })
  .passthrough();
const EgressPolicyId = z.string();
const EgressPolicy = z
  .object({
    id: z.string().regex(/^egr_[0-9a-z]{26}$/),
    siteId: z.string(),
    allowOverflow: z.boolean(),
    purposeTags: z.array(z.string()),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const EgressPolicyResponse = z
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
            id: z.string().regex(/^egr_[0-9a-z]{26}$/),
            siteId: z.string(),
            allowOverflow: z.boolean(),
            purposeTags: z.array(z.string()),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );
const OverflowExceptionId = z.string();
const OverflowException = z
  .object({
    id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
    siteId: z.string(),
    purposeTag: z.string(),
    rationale: z.string().optional(),
    status: z.enum(['pending', 'approved', 'revoked']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const OverflowExceptionListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
          siteId: z.string(),
          purposeTag: z.string(),
          rationale: z.string().optional(),
          status: z.enum(['pending', 'approved', 'revoked']),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const OverflowExceptionListResponse = z
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
                  id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
                  siteId: z.string(),
                  purposeTag: z.string(),
                  rationale: z.string().optional(),
                  status: z.enum(['pending', 'approved', 'revoked']),
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
const OverflowExceptionCreate = z
  .object({
    siteId: z.string(),
    purposeTag: z.string(),
    rationale: z.string().min(1),
  })
  .passthrough();
const OverflowExceptionResponse = z
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
            id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
            siteId: z.string(),
            purposeTag: z.string(),
            rationale: z.string().optional(),
            status: z.enum(['pending', 'approved', 'revoked']),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
      })
      .partial()
      .passthrough()
  );

export const schemas: any = {
  freezeSitePlacements_Body,
  enterSafeMode_Body,
  upsertEgressPolicy_Body,
  requestOverflowException_Body,
  Problem,
  ResponseMeta,
  PageInfo,
  PagedDataEnvelope,
  SiteFreezeId,
  SiteFreeze,
  SiteFreezeListData,
  SiteFreezeListResponse,
  SiteFreezeCreate,
  DataEnvelope,
  SiteFreezeResponse,
  SafeModeEventId,
  SafeModeEvent,
  SafeModeEventListData,
  SafeModeEventListResponse,
  SafeModeEnter,
  SafeModeEventResponse,
  SafeModeClear,
  EgressPolicyUpsert,
  EgressPolicyId,
  EgressPolicy,
  EgressPolicyResponse,
  OverflowExceptionId,
  OverflowException,
  OverflowExceptionListData,
  OverflowExceptionListResponse,
  OverflowExceptionCreate,
  OverflowExceptionResponse,
};

const endpoints = makeApi([
  {
    method: 'put',
    path: '/v1/governance/egress-policies',
    alias: 'upsertEgressPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: upsertEgressPolicy_Body,
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
                id: z.string().regex(/^egr_[0-9a-z]{26}$/),
                siteId: z.string(),
                allowOverflow: z.boolean(),
                purposeTags: z.array(z.string()),
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
    path: '/v1/governance/overflow-exceptions',
    alias: 'listOverflowExceptions',
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
                      id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      purposeTag: z.string(),
                      rationale: z.string().optional(),
                      status: z.enum(['pending', 'approved', 'revoked']),
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
    path: '/v1/governance/overflow-exceptions',
    alias: 'requestOverflowException',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestOverflowException_Body,
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
                id: z.string().regex(/^ovx_[0-9a-z]{26}$/),
                siteId: z.string(),
                purposeTag: z.string(),
                rationale: z.string().optional(),
                status: z.enum(['pending', 'approved', 'revoked']),
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
    path: '/v1/governance/safe-mode',
    alias: 'listSafeModeEvents',
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
                      id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      placementId: z.string().optional(),
                      status: z.enum(['active', 'cleared']),
                      playbook: z.string(),
                      acknowledgment: z.string().optional(),
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
    path: '/v1/governance/safe-mode',
    alias: 'enterSafeMode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: enterSafeMode_Body,
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
                id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
                siteId: z.string(),
                placementId: z.string().optional(),
                status: z.enum(['active', 'cleared']),
                playbook: z.string(),
                acknowledgment: z.string().optional(),
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
    path: '/v1/governance/safe-mode/:eventId/clear',
    alias: 'clearSafeMode',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ acknowledgment: z.string() })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'eventId',
        type: 'Path',
        schema: z.string().regex(/^sfe_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^sfe_[0-9a-z]{26}$/),
                siteId: z.string(),
                placementId: z.string().optional(),
                status: z.enum(['active', 'cleared']),
                playbook: z.string(),
                acknowledgment: z.string().optional(),
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
    path: '/v1/governance/site-freezes',
    alias: 'listSiteFreezes',
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
                      id: z.string().regex(/^frz_[0-9a-z]{26}$/),
                      siteId: z.string(),
                      active: z.boolean(),
                      reason: z.string().optional(),
                      frozenByUserId: z.string().optional(),
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
    path: '/v1/governance/site-freezes',
    alias: 'freezeSitePlacements',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: freezeSitePlacements_Body,
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
                id: z.string().regex(/^frz_[0-9a-z]{26}$/),
                siteId: z.string(),
                active: z.boolean(),
                reason: z.string().optional(),
                frozenByUserId: z.string().optional(),
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
    path: '/v1/governance/site-freezes/:freezeId/unfreeze',
    alias: 'unfreezeSitePlacements',
    requestFormat: 'json',
    parameters: [
      {
        name: 'freezeId',
        type: 'Path',
        schema: z.string().regex(/^frz_[0-9a-z]{26}$/),
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
                id: z.string().regex(/^frz_[0-9a-z]{26}$/),
                siteId: z.string(),
                active: z.boolean(),
                reason: z.string().optional(),
                frozenByUserId: z.string().optional(),
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
