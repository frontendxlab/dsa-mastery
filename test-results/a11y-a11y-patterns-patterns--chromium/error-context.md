# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: a11y.spec.ts >> a11y: patterns (/patterns)
- Location: tests/a11y.spec.ts:16:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: frame.evaluate: Test timeout of 30000ms exceeded.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import AxeBuilder from '@axe-core/playwright'
  3  | 
  4  | const BASE = 'https://learn-dsa.frontendx.dev'
  5  | 
  6  | const PAGES = [
  7  |   { name: 'home', path: '/' },
  8  |   { name: 'learn', path: '/learn' },
  9  |   { name: 'explore', path: '/explore' },
  10 |   { name: 'patterns', path: '/patterns' },
  11 |   { name: 'article', path: '/learn/sliding-window' },
  12 |   { name: 'pattern-detail', path: '/pattern/two-pointers' },
  13 | ]
  14 | 
  15 | for (const { name, path } of PAGES) {
  16 |   test(`a11y: ${name} (${path})`, async ({ page }) => {
  17 |     await page.goto(`${BASE}${path}`)
  18 |     await page.waitForLoadState('networkidle')
  19 | 
> 20 |     const results = await new AxeBuilder({ page })
     |                     ^ Error: frame.evaluate: Test timeout of 30000ms exceeded.
  21 |       .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  22 |       .exclude('#tanstack-router-devtools') // dev overlay
  23 |       .analyze()
  24 | 
  25 |     if (results.violations.length > 0) {
  26 |       const report = results.violations.map(v => {
  27 |         const nodes = v.nodes.map(n => `    selector: ${n.target.join(', ')}\n    html: ${n.html.slice(0, 120)}`).join('\n')
  28 |         return `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n${nodes}`
  29 |       }).join('\n\n')
  30 |       console.log(`\n=== ${name} violations ===\n${report}`)
  31 |     }
  32 | 
  33 |     expect(results.violations).toHaveLength(0)
  34 |   })
  35 | }
  36 | 
```