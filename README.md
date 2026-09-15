# Rimcast

Latency-aware edge inference placement console (OpenAPI-first DDD monorepo).

Product specs: [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

## Layout

| Layer | Package |
|-------|---------|
| OpenAPI | `@rimcast/openapi-core` |
| Domain models | `@rimcast/core` |
| Use cases | `@rimcast/services` |
| Persistence | `@rimcast/adapters` |
| HTTP API | `@rimcast/api-server` |
| Web console | `@rimcast/webapp` |
| `zero-codegen` tool (local only — never commit) | `.codegen/codegen/` |

## Quick start

```bash
# Restore codegen tool if missing (never commit .codegen/)
rsync -a --exclude node_modules \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
# then re-apply package_scope @rimcast and run: pnpm codegen:paths

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: http://127.0.0.1:4000/health
# Demo key: X-API-Key: rimcast_demo_local_dev_key

pnpm dev:web
```

## Codegen

See [docs/CODEGEN.md](./docs/CODEGEN.md). **Never commit `.codegen/`** — see `.cursor/skills/no-codegen-commit/`.

- New domain: Mode A full multi-layer generate once, then hand-fit DI/routes.
- YAML edits on existing domains: bundle → **core only** → handwrite below.
