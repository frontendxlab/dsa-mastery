---
status: investigating
trigger: "Debug why a TanStack Start app returns 500 on ALL routes in local dev (pnpm dev) with @cloudflare/vite-plugin"
created: 2026-05-14T00:00:00Z
updated: 2026-05-14T00:00:00Z
---

## Current Focus

hypothesis: A module imported by #tanstack-router-entry resolves to `0` (falsy non-function) in the Cloudflare Vite module runner SSR environment during dev
test: Examine what #tanstack-router-entry resolves to, check runner-worker/index.js line 107, check vite.config.ts for ssr/optimizeDeps misconfig
expecting: A specific module or virtual module that fails to resolve in the Cloudflare workers runner context
next_action: Gather vite.config.ts, package.json versions, runner-worker source, and virtual module definitions

## Symptoms

expected: All routes return 200 with rendered content in local dev (pnpm dev)
actual: ALL routes return 500 TypeError in local dev only; production build and wrangler deploy work fine
errors: |
  TypeError: 0 is not a function
    at runInRunnerObject (workers/runner-worker/index.js:107:3)
    at async Promise.all (index 0)
    at loadEntries (.../start-server-core/src/createStartHandler.ts:351:53)
reproduction: pnpm dev -> visit any route
started: Before recent changes (confirmed by git stash + test)

## Eliminated

(none yet)

## Evidence

(none yet)

## Resolution

root_cause:
fix:
verification:
files_changed: []
