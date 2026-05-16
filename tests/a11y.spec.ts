import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = 'https://learn-dsa.frontendx.dev'

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'learn', path: '/learn' },
  { name: 'explore', path: '/explore' },
  { name: 'patterns', path: '/patterns' },
  { name: 'article', path: '/learn/sliding-window' },
  { name: 'pattern-detail', path: '/pattern/two-pointers' },
]

for (const { name, path } of PAGES) {
  test(`a11y: ${name} (${path})`, async ({ page }) => {
    await page.goto(`${BASE}${path}`)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .exclude('#tanstack-router-devtools') // dev overlay
      .analyze()

    if (results.violations.length > 0) {
      const report = results.violations.map(v => {
        const nodes = v.nodes.map(n => `    selector: ${n.target.join(', ')}\n    html: ${n.html.slice(0, 120)}`).join('\n')
        return `[${v.impact?.toUpperCase()}] ${v.id}: ${v.description}\n${nodes}`
      }).join('\n\n')
      console.log(`\n=== ${name} violations ===\n${report}`)
    }

    expect(results.violations).toHaveLength(0)
  })
}
