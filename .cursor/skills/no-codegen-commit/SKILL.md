---
name: no-codegen-commit
description: >-
  Ensures .codegen is never committed or pushed to GitHub. Use when staging,
  committing, pushing, or setting up zero-codegen in this repo.
---

# Never commit `.codegen`

## Hard rule

- **Never** stage, commit, or push `.codegen/` to GitHub.
- `.codegen/` is listed in `.gitignore` as a safeguard — do not remove that entry.
- Also never commit `packages/openapi-core/src/.bundled/`, `**/zero_codegen/`, or Postman generated paths under `platform/tests/postman/generated/`.

## How agents get the tool

The vendored `zero-codegen` lives under `.codegen/codegen/` for **local** use only. Restore or refresh it by copying from the baseline scaffold:

```bash
rsync -a --exclude node_modules \
  /path/to/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
```

Do not add `.codegen` to git history even if a force-add would work.

## Related

- Cursor rule: `.cursor/rules/no-codegen-commit.mdc`
- Codegen workflow: `.cursor/skills/ddd-codegen/SKILL.md` (local `PYTHONPATH=.codegen/codegen/src`)
