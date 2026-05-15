import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { getPattern, PATTERN_PARTS, getPatternVariations } from '#/data/patterns-inventory'
import { articles, getArticle } from '#/data/articles'
import { ShikiCodeBlock } from '#/components/ShikiCodeBlock'
import type { PatternInventoryEntry, PatternVariation } from '#/data/patterns-inventory'
import type { Section, Intuition } from '#/data/articles'

export const Route = createFileRoute('/patterns/$pattern')({
  loader: ({ params }) => {
    const pattern = getPattern(params.pattern)
    if (!pattern) throw notFound()
    const article = getArticle(params.pattern)
    return { pattern, article }
  },
  component: PatternDetailPage,
  notFoundComponent: () => (
    <main className="nb-page-wrap px-4 py-20 text-center">
      <div className="nb-card mx-auto max-w-md bg-[var(--nb-pink)] p-8">
        <p className="nb-display text-4xl">404</p>
        <p className="mt-2 font-bold">Pattern not found</p>
        <Link to="/patterns" className="nb-btn mt-4 inline-block no-underline">← Back to Patterns</Link>
      </div>
    </main>
  ),
})

interface RawProblem {
  platform: string
  name: string
  url: string
  difficulty: string
  keyConcept: string
}

function md(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="nb-inline-code">$1</code>')
    .replace(/\n/g, '<br/>')
}

function diffColor(d: string) {
  const l = d.toLowerCase()
  if (l === 'easy' || l === '1') return 'text-green-600 dark:text-green-400'
  if (l === 'medium' || l === '2') return 'text-amber-600 dark:text-amber-400'
  if (l === 'hard' || l === '3') return 'text-red-600 dark:text-red-400'
  const n = parseInt(d)
  if (!isNaN(n) && n < 1500) return 'text-green-600 dark:text-green-400'
  if (!isNaN(n) && n < 2200) return 'text-amber-600 dark:text-amber-400'
  if (!isNaN(n)) return 'text-red-600 dark:text-red-400'
  return 'text-[var(--sea-ink-soft)]'
}

function RecognitionTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="nb-table-wrap my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map(h => <th key={h} className="nb-th">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[var(--nb-surface)]' : 'bg-[var(--nb-surface-strong)]'}>
              {row.map((cell, j) => <td key={j} className="nb-td font-medium">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function IntuitionBlock({ intuition, idx }: { intuition: Intuition; idx: number }) {
  const [open, setOpen] = useState(false)
  const colors = [
    'bg-[var(--nb-yellow)]',
    'bg-[var(--nb-blue)]',
    'bg-[var(--nb-green)]',
    'bg-[var(--nb-pink)]',
  ]
  return (
    <div className={`nb-card ${colors[idx % colors.length]} mb-3`}>
      <button className="w-full text-left" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start gap-3 p-4">
          <span className="nb-intuition-badge mt-0.5 shrink-0">{idx + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug">{intuition.label}</p>
            <p className="mt-1 text-sm leading-relaxed" style={{ opacity: 0.8 }}>{intuition.explanation}</p>
          </div>
          <span className="shrink-0 font-bold text-lg" style={{ transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 150ms' }}>
            ›
          </span>
        </div>
      </button>
      {open && intuition.code && (
        <div className="border-t-2 border-[var(--nb-border-color)]">
          {intuition.codeCaption && (
            <p className="px-4 pt-3 text-xs font-bold uppercase tracking-wider opacity-60">{intuition.codeCaption}</p>
          )}
          <ShikiCodeBlock code={intuition.code} lang={intuition.lang || 'javascript'} />
        </div>
      )}
    </div>
  )
}

function ProblemCard({ section }: { section: Extract<Section, { type: 'problem' }> }) {
  const diffClass: Record<string, string> = {
    easy: 'nb-diff-easy', medium: 'nb-diff-medium', hard: 'nb-diff-hard', 'n/a': '',
  }
  return (
    <div className="nb-problem-card my-6">
      <div className="nb-problem-header">
        <span className="nb-problem-num">{section.num}</span>
        <div className="flex-1 min-w-0">
          <a href={section.url} target="_blank" rel="noopener noreferrer" className="nb-problem-title">
            {section.title}
          </a>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`nb-diff-badge ${diffClass[section.difficulty.toLowerCase()] ?? ''}`}>
              {section.difficulty}
            </span>
          </div>
        </div>
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-800 font-bold border-2 rounded"
          style={{
            borderColor: 'var(--nb-yellow)',
            color: 'var(--nb-yellow)',
            background: 'transparent',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 120ms',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--nb-yellow)'
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--nb-ink)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--nb-yellow)'
          }}
        >
          Solve ↗
        </a>
      </div>

      {section.note && (
        <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 border-[var(--nb-border-color)] opacity-70" style={{ background: 'var(--nb-surface)' }}>
          💬 {section.note}
        </p>
      )}

      <div className="px-4 pb-4 pt-3 space-y-2">
        {section.intuitions.map((intuition, i) => (
          <IntuitionBlock key={i} intuition={intuition} idx={i} />
        ))}
      </div>
    </div>
  )
}

function renderSection(section: Section, i: number) {
  switch (section.type) {
    case 'heading':
      return section.level === 2
        ? <h2 key={i} className="nb-heading mt-10 mb-4">{section.text}</h2>
        : <h3 key={i} className="nb-heading-sm mt-7 mb-3">{section.text}</h3>
    case 'text':
      return <p key={i} className="my-4 text-base leading-relaxed">{section.content}</p>
    case 'callout':
      return (
        <div key={i} className={`nb-sticky-note my-6`} style={{ backgroundColor: section.color === 'teal' ? 'var(--nb-teal)' : section.color === 'amber' ? 'var(--nb-yellow)' : section.color === 'gray' ? 'var(--nb-surface-strong)' : section.color === 'green' ? 'var(--nb-green)' : 'var(--nb-pink)' }}>
          <span className="mr-2 text-xl flex-shrink-0">{section.icon}</span>
          <div className="flex-1 text-sm font-medium leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: md(section.content) }} />
        </div>
      )
    case 'code':
      return <ShikiCodeBlock key={i} lang={section.lang || 'javascript'} code={section.code} caption={section.caption} />
    case 'table':
      return <RecognitionTable key={i} headers={section.headers} rows={section.rows} />
    case 'problem':
      return <ProblemCard key={i} section={section} />
    case 'divider':
      return <hr key={i} className="my-8 border-t-2 border-[var(--nb-border-color)]" />
    case 'list':
      return (
        <ul key={i} className="my-4 space-y-2">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--nb-ink)] opacity-60" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'variation':
      return (
        <div key={i} className="my-8">
          <h3 className="nb-heading-sm mb-4">{section.title}</h3>
          <ShikiCodeBlock code={section.baseCode} lang="javascript" />
          <div className="mt-6 space-y-4">
            {section.variants.map((v, j) => (
              <div key={j} className="nb-card bg-[var(--nb-yellow)]">
                <div className="p-4">
                  <p className="font-bold text-sm">
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-[var(--nb-ink)] hover:underline">
                      {v.problem}
                    </a>
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-60">One-line Change:</p>
                  <div className="mt-1 font-mono text-sm bg-[var(--nb-surface)] p-3 rounded border-2 border-[var(--nb-border-color)]">
                    {v.change}
                  </div>
                  <p className="mt-2 text-sm opacity-75">{v.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    default:
      return null
  }
}

function PatternSidebarNav({ currentSlug }: { currentSlug: string }) {
  const patterns = useMemo(() => {
    const all: { slug: string; title: string; emoji: string; part: string }[] = []
    for (const part of PATTERN_PARTS) {
      for (const p of part.patterns) {
        all.push({ ...p, part: part.part })
      }
    }
    return all
  }, [])

  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 nb-card bg-[var(--nb-surface)] p-4">
        <p className="nb-kicker text-xs mb-3">All Patterns</p>
        <ul className="space-y-0.5 max-h-96 overflow-y-auto">
          {patterns.map(p => (
            <li key={p.slug}>
              <Link
                to="/patterns/$pattern"
                params={{ pattern: p.slug }}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-[var(--nb-yellow)] ${p.slug === currentSlug ? 'bg-[var(--nb-yellow)] font-black' : ''}`}
              >
                <span>{p.emoji}</span>
                <span className="truncate">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function ConceptGroup({ concept, problems }: { concept: string; problems: RawProblem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--nb-border-color)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 bg-[var(--nb-surface)] px-4 py-3 text-left transition-colors hover:bg-[var(--nb-surface-strong)]"
      >
        <span className="text-xs font-bold text-[var(--sea-ink-soft)]">{isOpen ? '▼' : '▶'}</span>
        <span className="flex-1 font-semibold text-[var(--nb-ink)]">{concept}</span>
        <span className="rounded-full bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--sea-ink-soft)] border border-[var(--chip-line)]">
          {problems.length}
        </span>
      </button>

      {isOpen && (
        <div className="divide-y divide-[var(--line)] border-t border-[var(--nb-border-color)] bg-[var(--chip-bg)]">
          {problems.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-5 shrink-0 text-center text-[10px] tabular-nums text-[var(--sea-ink-soft)]">{i + 1}</span>
              <div className="min-w-0 flex-1">
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="block truncate text-sm font-medium text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]">
                      {p.name}
                    </a>
                  : <span className="block truncate text-sm font-medium text-[var(--sea-ink)]">{p.name}</span>
                }
              </div>
              <span className="shrink-0 text-[10px] font-bold text-[var(--sea-ink-soft)] hidden sm:inline">{p.platform}</span>
              <span className={`shrink-0 text-[10px] font-bold ${diffColor(p.difficulty)}`}>{p.difficulty || '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function VariationBlogSection({
  variation,
  index,
  problems,
  search,
}: {
  variation: PatternVariation
  index: number
  problems: RawProblem[]
  search: string
}) {
  const [showProblems, setShowProblems] = useState(false)

  const matchingProblems = useMemo(() => {
    if (!variation.keyConceptKeywords || variation.keyConceptKeywords.length === 0) {
      return []
    }
    const keywords = variation.keyConceptKeywords.map(k => k.toLowerCase())
    let filtered = problems.filter(p => {
      const concept = (p.keyConcept || '').toLowerCase()
      return keywords.some(kw => concept.includes(kw))
    })
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.keyConcept.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [problems, variation.keyConceptKeywords, search])

  const groups = useMemo(() => {
    const map = new Map<string, RawProblem[]>()
    for (const p of matchingProblems) {
      const key = p.keyConcept || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [matchingProblems])

  return (
    <section className="mb-12">
      {/* Variation Header */}
      <div className="mb-6 flex items-center gap-4">
        <span
          className="nb-intuition-badge flex h-10 w-10 items-center justify-center text-lg font-black"
          style={{ background: 'var(--nb-yellow)', color: 'var(--nb-ink)' }}
        >
          {index + 1}
        </span>
        <div>
          <h2 className="nb-heading text-xl mb-1">{variation.name}</h2>
          <p className="text-sm text-[var(--sea-ink-soft)]">{variation.description}</p>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="nb-card bg-[var(--nb-teal)] mb-6 p-6">
        <p className="nb-kicker text-xs mb-2">How This Variation Works</p>
        <p className="text-sm font-medium leading-relaxed">{variation.description}</p>
        <div className="mt-4 pt-4 border-t-2 border-[var(--nb-border-color)]">
          <p className="nb-kicker text-xs mb-2">What Changes Across Problems</p>
          <p className="text-sm font-bold">{variation.minChange}</p>
        </div>
      </div>

      {/* Code Template */}
      <div className="mb-6">
        <p className="nb-kicker text-xs mb-3">The Template</p>
        <ShikiCodeBlock
          code={variation.templateSnippet}
          lang="javascript"
          caption={`${variation.name} — Core Template`}
        />
      </div>

      {/* Problems for this Variation */}
      {matchingProblems.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="nb-heading-sm text-base mb-1">
                {matchingProblems.length} Problems Using This Variation
              </h3>
              <p className="text-xs text-[var(--sea-ink-soft)]">
                These problems all follow the template above — only the details change.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowProblems(!showProblems)}
              className="nb-chip bg-[var(--nb-teal)] text-xs font-bold"
            >
              {showProblems ? '▲ Hide Problems' : `▼ Show ${matchingProblems.length} Problems`}
            </button>
          </div>

          {showProblems && (
            <div className="space-y-2">
              {groups.map(([concept, probs]) => (
                <ConceptGroup key={concept} concept={concept} problems={probs} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Transition to next variation */}
      {matchingProblems.length === 0 && (
        <div className="nb-card bg-[var(--nb-surface-strong)] p-6 text-center">
          <p className="text-sm text-[var(--sea-ink-soft)]">
            Problems for this variation are being categorized. Check back soon!
          </p>
        </div>
      )}

      <hr className="my-10 border-t-2 border-[var(--nb-border-color)]" />
    </section>
  )
}

function UncategorizedProblems({
  problems,
  variations,
  search,
}: {
  problems: RawProblem[]
  variations?: PatternVariation[]
  search: string
}) {
  const [showProblems, setShowProblems] = useState(false)

  const uncategorized = useMemo(() => {
    const allKeywords: string[] = []
    if (variations) {
      for (const v of variations) {
        if (v.keyConceptKeywords) {
          allKeywords.push(...v.keyConceptKeywords.map(k => k.toLowerCase()))
        }
      }
    }
    let filtered = problems.filter(p => {
      const concept = (p.keyConcept || '').toLowerCase()
      return !allKeywords.some(kw => concept.includes(kw))
    })
    if (search.trim()) {
      const q = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.keyConcept.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [problems, variations, search])

  const groups = useMemo(() => {
    const map = new Map<string, RawProblem[]>()
    for (const p of uncategorized) {
      const key = p.keyConcept || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [uncategorized])

  if (uncategorized.length === 0) return null

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="nb-heading text-lg mb-1">More Problems (Not Yet Categorized)</h2>
          <p className="text-sm text-[var(--sea-ink-soft)]">
            These problems use this pattern but haven't been mapped to a specific variation yet.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowProblems(!showProblems)}
          className="nb-chip bg-[var(--nb-surface)] text-xs font-bold border border-[var(--nb-border-color)]"
        >
          {showProblems ? '▲ Hide' : `▼ Show ${uncategorized.length}`}
        </button>
      </div>

      {showProblems && (
        <div className="space-y-2">
          {groups.map(([concept, probs]) => (
            <ConceptGroup key={concept} concept={concept} problems={probs} />
          ))}
        </div>
      )}
    </section>
  )
}

function getPart(slug: string) {
  for (const p of PATTERN_PARTS) {
    if (p.patterns.some(e => e.slug === slug)) return p
  }
  return undefined
}

function PatternDetailPage() {
  const { pattern, article } = Route.useLoaderData()
  const variations = pattern.variations
  const part = getPart(pattern.slug)

  const [problems, setProblems] = useState<RawProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`/data/${pattern.topicSlug}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.problems) setProblems(d.problems) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [pattern.topicSlug])

  const totalCategorized = useMemo(() => {
    if (!variations) return 0
    const allKeywords: string[] = []
    for (const v of variations) {
      if (v.keyConceptKeywords) {
        allKeywords.push(...v.keyConceptKeywords.map(k => k.toLowerCase()))
      }
    }
    return problems.filter(p => {
      const concept = (p.keyConcept || '').toLowerCase()
      return allKeywords.some(kw => concept.includes(kw))
    }).length
  }, [problems, variations])

  return (
    <main className="nb-page-wrap px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
        <Link to="/patterns" className="no-underline hover:opacity-100">Patterns</Link>
        <span>/</span>
        {part && (
          <>
            <span className="opacity-70">{part.part}</span>
            <span>/</span>
          </>
        )}
        <span className="opacity-100">{pattern.title}</span>
      </div>

      <div className="flex gap-8">
        <PatternSidebarNav currentSlug={pattern.slug} />

        <div className="min-w-0 flex-1">
          {/* Hero */}
          <div className="nb-card bg-[var(--nb-teal)] mb-10 p-7 sm:p-10">
            <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
              <span className="text-5xl flex-shrink-0">{pattern.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="nb-kicker mb-1">Pattern Reference</p>
                <h1 className="nb-display text-[clamp(1.6rem,4vw,2.8rem)] leading-tight mb-2">
                  {pattern.title}
                </h1>
                <p className="text-sm font-bold italic mb-3" style={{ opacity: 0.7 }}>
                  "{pattern.tagline}"
                </p>
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="nb-chip bg-[var(--nb-surface)]">
                    {loading ? 'Loading...' : `${problems.length.toLocaleString()} problems`}
                  </span>
                  {variations && variations.length > 0 && (
                    <span className="nb-chip bg-[var(--nb-yellow)]">
                      {variations.length} variations
                    </span>
                  )}
                  {variations && totalCategorized > 0 && (
                    <span className="nb-chip bg-[var(--nb-green)]">
                      {totalCategorized} mapped to variations
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Variations Section (Blog-style) */}
          {variations && variations.length > 0 && (
            <div className="mb-8">
              <div className="mb-8 flex flex-wrap items-end gap-4">
                <div>
                  <h2 className="nb-heading">Variations</h2>
                  <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
                    One core pattern — multiple approaches. Each variation solves a different set of problems.
                  </p>
                </div>
                {!loading && problems.length > 0 && (
                  <div className="relative ml-auto w-full sm:w-72">
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search across all problems…"
                      className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 pl-9 text-sm text-[var(--sea-ink)] outline-none focus:border-[var(--lagoon)]"
                    />
                    <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="13" height="13" viewBox="0 0 16 16" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex items-center gap-2 py-8 text-sm text-[var(--sea-ink-soft)]">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--lagoon)] border-t-transparent" />
                  Loading problems…
                </div>
              ) : (
                <>
                  {variations.map((v, i) => (
                    <VariationBlogSection
                      key={i}
                      variation={v}
                      index={i}
                      problems={problems}
                      search={search}
                    />
                  ))}

                  {problems.length > 0 && (
                    <UncategorizedProblems
                      problems={problems}
                      variations={variations}
                      search={search}
                    />
                  )}
                </>
              )}
            </div>
          )}

          {/* Deep Dive Article (if exists) */}
          {article && article.sections.length > 0 && (
            <div className="mt-16 border-t-2 border-[var(--nb-border-color)] pt-10">
              <h2 className="nb-heading mb-6">Deep Dive Tutorial</h2>
              <div className="nb-article-body">
                {article.sections.map((section, i) => renderSection(section, i))}
              </div>
            </div>
          )}

          {/* All Problems (if no variations defined) */}
          {!variations && !loading && problems.length > 0 && (
            <div className="mt-16">
              <AllProblemsSimple
                topicName={pattern.title}
                problems={problems}
                loading={loading}
              />
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-12 flex gap-4 flex-wrap border-t-2 border-[var(--nb-border-color)] pt-8">
            <Link to="/patterns" className="nb-btn nb-btn-outline no-underline">
              ← All Patterns
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function AllProblemsSimple({
  topicName,
  problems,
  loading,
}: {
  topicName: string
  problems: RawProblem[]
  loading: boolean
}) {
  const [search, setSearch] = useState('')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search.trim()) return problems
    const q = search.toLowerCase()
    return problems.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.keyConcept.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q),
    )
  }, [problems, search])

  const groups = useMemo(() => {
    const map = new Map<string, RawProblem[]>()
    for (const p of filtered) {
      const key = p.keyConcept || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [filtered])

  const toggleGroup = useCallback((key: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  if (!loading && problems.length === 0) return null

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div>
          <h2 className="nb-heading">All {topicName} Problems</h2>
          <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
            {loading ? 'Loading…' : `${problems.length.toLocaleString()} problems · ${groups.length} concept groups`}
          </p>
        </div>
        {!loading && (
          <div className="relative ml-auto w-full sm:w-72">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search problems…"
              className="w-full rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 pl-9 text-sm text-[var(--sea-ink)] outline-none focus:border-[var(--lagoon)]"
            />
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sea-ink-soft)]" width="13" height="13" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-8 text-sm text-[var(--sea-ink-soft)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--lagoon)] border-t-transparent" />
          Loading problems…
        </div>
      ) : groups.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--sea-ink-soft)]">No problems match "{search}"</p>
      ) : (
        <div className="space-y-2">
          {groups.map(([concept, probs]) => {
            const isOpen = openGroups.has(concept)
            return (
              <div key={concept} className="overflow-hidden rounded-xl border border-[var(--nb-border-color)]">
                <button
                  onClick={() => toggleGroup(concept)}
                  className="flex w-full items-center gap-3 bg-[var(--nb-surface)] px-4 py-3 text-left transition-colors hover:bg-[var(--nb-surface-strong)]"
                >
                  <span className="text-xs font-bold text-[var(--sea-ink-soft)]">{isOpen ? '▼' : '▶'}</span>
                  <span className="flex-1 font-semibold text-[var(--nb-ink)]">{concept}</span>
                  <span className="rounded-full bg-[var(--chip-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--sea-ink-soft)] border border-[var(--chip-line)]">
                    {probs.length}
                  </span>
                </button>

                {isOpen && (
                  <div className="divide-y divide-[var(--line)] border-t border-[var(--nb-border-color)] bg-[var(--chip-bg)]">
                    {probs.map((p, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                        <span className="w-5 shrink-0 text-center text-[10px] tabular-nums text-[var(--sea-ink-soft)]">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          {p.url
                            ? <a href={p.url} target="_blank" rel="noopener noreferrer"
                                className="block truncate text-sm font-medium text-[var(--sea-ink)] no-underline hover:text-[var(--lagoon-deep)]">
                                {p.name}
                              </a>
                            : <span className="block truncate text-sm font-medium text-[var(--sea-ink)]">{p.name}</span>
                          }
                        </div>
                        <span className="shrink-0 text-[10px] font-bold text-[var(--sea-ink-soft)] hidden sm:inline">{p.platform}</span>
                        <span className={`shrink-0 text-[10px] font-bold ${diffColor(p.difficulty)}`}>{p.difficulty || '—'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
