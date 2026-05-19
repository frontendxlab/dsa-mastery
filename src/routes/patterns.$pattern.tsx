import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useCollection } from '#/components/CollectionProvider'
import type { CollectionItem } from '#/lib/collections'
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
    <main className="mx-auto max-w-5xl px-4 py-20 text-center">
      <div className="mx-auto max-w-md rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-8">
        <p className="text-4xl font-bold text-[var(--foreground)]">404</p>
        <p className="mt-2 font-bold text-[var(--foreground)]">Pattern not found</p>
        <Link to="/patterns" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90">← Back to Patterns</Link>
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
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
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
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map(h => <th key={h} className="text-left text-xs font-semibold text-[var(--muted-foreground)] px-3 py-2 border-b border-[var(--border)]">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--secondary)]'}>
              {row.map((cell, j) => <td key={j} className="px-3 py-2 text-sm text-[var(--foreground)] border-b border-[var(--border)] font-medium">{cell}</td>)}
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
    'bg-[var(--warning,#fcd34d)]/20',
    'bg-[var(--primary,#3b82f6)]/10',
    'bg-[var(--success,#86efac)]/20',
    'bg-[var(--destructive,#fca5a5)]/10',
  ]
  return (
    <div className={`rounded-xl border border-[var(--border)] ${colors[idx % colors.length]} mb-3`}>
      <button className="w-full text-left" onClick={() => setOpen(o => !o)}>
        <div className="flex items-start gap-3 p-4">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-white mt-0.5">{idx + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-snug text-[var(--foreground)]">{intuition.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">{intuition.explanation}</p>
          </div>
          <span className="shrink-0 font-bold text-lg text-[var(--muted-foreground)]" style={{ transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 150ms' }}>
            ›
          </span>
        </div>
      </button>
      {open && intuition.code && (
        <div className="border-t border-[var(--border)]">
          {intuition.codeCaption && (
            <p className="px-4 pt-3 text-xs font-bold uppercase tracking-wider opacity-60 text-[var(--foreground)]">{intuition.codeCaption}</p>
          )}
          <ShikiCodeBlock code={intuition.code} lang={intuition.lang || 'javascript'} />
        </div>
      )}
    </div>
  )
}

function ProblemCard({ section }: { section: Extract<Section, { type: 'problem' }> }) {
  const diffClass: Record<string, string> = {
    easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard', 'n/a': '',
  }
  return (
    <div data-focusable="card" className="my-6 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
      <div className="flex items-start gap-3 p-4 border-b border-[var(--border)] bg-[var(--secondary)]">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--foreground)] text-xs font-bold text-[var(--background)]">{section.num}</span>
        <div className="flex-1 min-w-0">
          <a href={section.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[var(--foreground)] no-underline hover:text-[var(--primary)]">
            {section.title}
          </a>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold ${diffClass[section.difficulty.toLowerCase()] ?? ''}`}>
              {section.difficulty}
            </span>
          </div>
        </div>
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold border rounded-lg text-[var(--foreground)] border-[var(--border)] no-underline transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
          style={{ whiteSpace: 'nowrap' }}
        >
          Solve ↗
        </a>
      </div>

      {section.note && (
        <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider border-b border-[var(--border)] opacity-70 text-[var(--foreground)] bg-[var(--secondary)]">
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
        ? <h2 key={i} className="text-2xl font-bold text-[var(--foreground)] mt-10 mb-4 border-b border-[var(--border)] pb-2">{section.text}</h2>
        : <h3 key={i} className="text-base font-semibold text-[var(--foreground)] mt-7 mb-3">{section.text}</h3>
    case 'text':
      return <p key={i} className="my-4 text-base leading-relaxed text-[var(--foreground)]">{section.content}</p>
    case 'callout': {
      const bgMap: Record<string, string> = {
        teal:  'bg-[var(--success,#86efac)]/10 border-[var(--success,#86efac)]/20',
        green: 'bg-[var(--success,#86efac)]/10 border-[var(--success,#86efac)]/20',
        amber: 'bg-[var(--warning,#fcd34d)]/10 border-[var(--warning,#fcd34d)]/20',
        red:   'bg-[var(--destructive,#fca5a5)]/10 border-[var(--destructive,#fca5a5)]/20',
        blue:  'bg-[var(--primary,#3b82f6)]/10 border-[var(--primary,#3b82f6)]/20',
        gray:  'bg-[var(--secondary)] border-[var(--border)]',
      }
      return (
        <div key={i} className={`flex gap-3 rounded-xl border p-4 my-6 ${bgMap[section.color] ?? bgMap.gray}`}>
          <span className="mr-2 text-xl flex-shrink-0">{section.icon}</span>
          <div className="flex-1 text-sm font-medium leading-relaxed whitespace-pre-wrap text-[var(--foreground)]" dangerouslySetInnerHTML={{ __html: md(section.content) }} />
        </div>
      )
    }
    case 'code':
      return <ShikiCodeBlock key={i} lang={section.lang || 'javascript'} code={section.code} caption={section.caption} />
    case 'table':
      return <RecognitionTable key={i} headers={section.headers} rows={section.rows} />
    case 'problem':
      return <ProblemCard key={i} section={section} />
    case 'divider':
      return <hr key={i} className="my-8 border-t border-[var(--border)]" />
    case 'list':
      return (
        <ul key={i} className="my-4 space-y-2">
          {section.items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)] opacity-60" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'variation':
      return (
        <div key={i} className="my-8">
          <h3 className="text-base font-semibold text-[var(--foreground)] mb-4">{section.title}</h3>
          <ShikiCodeBlock code={section.baseCode} lang="javascript" />
          <div className="mt-6 space-y-4">
            {section.variants.map((v, j) => (
              <div key={j} className="rounded-xl border border-[var(--border)] bg-[var(--warning,#fcd34d)]/10">
                <div className="p-4">
                  <p className="font-bold text-sm">
                    <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:underline no-underline">
                      {v.problem}
                    </a>
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider opacity-60 text-[var(--foreground)]">One-line Change:</p>
                  <div className="mt-1 font-mono text-sm bg-[var(--secondary)] p-3 rounded border border-[var(--border)] text-[var(--foreground)]">
                    {v.change}
                  </div>
                  <p className="mt-2 text-sm opacity-75 text-[var(--foreground)]">{v.why}</p>
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
      <div data-focusable="card" className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">All Patterns</p>
        <ul className="space-y-0.5 max-h-96 overflow-y-auto">
          {patterns.map(p => (
            <li key={p.slug}>
              <Link
                to="/patterns/$pattern"
                params={{ pattern: p.slug }}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] text-[var(--muted-foreground)] ${p.slug === currentSlug ? 'bg-[var(--secondary)] text-[var(--foreground)] font-black' : ''}`}
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
    <div className="overflow-hidden rounded-xl border border-[var(--border)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 bg-[var(--secondary)] px-4 py-3 text-left transition-colors hover:bg-[var(--card)]"
      >
        <span className="text-xs font-bold text-[var(--muted-foreground)]">{isOpen ? '▼' : '▶'}</span>
        <span className="flex-1 font-semibold text-[var(--foreground)]">{concept}</span>
        <span className="rounded-full bg-[var(--card)] px-2 py-0.5 text-[10px] font-bold text-[var(--muted-foreground)] border border-[var(--border)]">
          {problems.length}
        </span>
      </button>

      {isOpen && (
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)] bg-[var(--background)]">
          {problems.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-5 shrink-0 text-center text-[10px] tabular-nums text-[var(--muted-foreground)]">{i + 1}</span>
              <div className="min-w-0 flex-1">
                {p.url
                  ? <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="block truncate text-sm font-medium text-[var(--foreground)] no-underline hover:text-[var(--primary)]">
                      {p.name}
                    </a>
                  : <span className="block truncate text-sm font-medium text-[var(--foreground)]">{p.name}</span>
                }
              </div>
              <span className="shrink-0 text-[10px] font-bold text-[var(--muted-foreground)] hidden sm:inline">{p.platform}</span>
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
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foreground)] text-lg font-black text-[var(--background)]">
          {index + 1}
        </span>
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-1">{variation.name}</h2>
          <p className="text-sm text-[var(--muted-foreground)]">{variation.description}</p>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] mb-6 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2">How This Variation Works</p>
        <p className="text-sm font-medium leading-relaxed text-[var(--foreground)]">{variation.description}</p>
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-2">What Changes Across Problems</p>
          <p className="text-sm font-bold text-[var(--foreground)]">{variation.minChange}</p>
        </div>
      </div>

      {/* Code Template */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">The Template</p>
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
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-1">
                {matchingProblems.length} Problems Using This Variation
              </h3>
              <p className="text-xs text-[var(--muted-foreground)]">
                These problems all follow the template above — only the details change.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowProblems(!showProblems)}
              className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
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
        <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-6 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            Problems for this variation are being categorized. Check back soon!
          </p>
        </div>
      )}

      <hr className="my-10 border-t border-[var(--border)]" />
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
          <h2 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2 mb-1">More Problems (Not Yet Categorized)</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            These problems use this pattern but haven't been mapped to a specific variation yet.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowProblems(!showProblems)}
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
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
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
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
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] mb-10 p-7 sm:p-10">
            <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
              <span className="text-5xl flex-shrink-0">{pattern.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-1">Pattern Reference</p>
                <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-bold leading-tight mb-2 text-[var(--foreground)]">
                  {pattern.title}
                </h1>
                <p className="text-sm font-bold italic mb-3 text-[var(--muted-foreground)]">
                  "{pattern.tagline}"
                </p>
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm font-medium text-[var(--foreground)]">
                    {loading ? 'Loading...' : `${problems.length.toLocaleString()} problems`}
                  </span>
                  {variations && variations.length > 0 && (
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--warning,#fcd34d)]/20 px-3 py-1 text-sm font-medium text-[var(--foreground)]">
                      {variations.length} variations
                    </span>
                  )}
                  {variations && totalCategorized > 0 && (
                    <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--success,#86efac)]/20 px-3 py-1 text-sm font-medium text-[var(--foreground)]">
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
                  <h2 className="text-2xl font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-2">Variations</h2>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    One core pattern — multiple approaches. Each variation solves a different set of problems.
                  </p>
                </div>
                {!loading && problems.length > 0 && (
                  <div className="relative ml-auto w-full sm:w-72">
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search across all problems…"
                      className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 pl-9 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    />
                    <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" width="13" height="13" viewBox="0 0 16 16" fill="none">
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
            <div className="mt-16 border-t border-[var(--border)] pt-10">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Deep Dive Tutorial</h2>
              <div className="prose prose-sm max-w-none">
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
          <div className="mt-12 flex gap-4 flex-wrap border-t border-[var(--border)] pt-8">
            <Link to="/patterns" className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--default)]">
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
  const { toggleSelect, isSelected } = useCollection()
  const [search, setSearch]   = useState('')
  const [platFilter, setPlat] = useState('all')
  const [diffFilter, setDiff] = useState('all')
  const [sort, setSort]       = useState<'name' | 'platform' | 'difficulty'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const platforms = useMemo(() =>
    ['all', ...new Set(problems.map(p => p.platform).filter(Boolean))].sort()
  , [problems])

  const filtered = useMemo(() => {
    let res = problems
    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.keyConcept.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q))
    }
    if (platFilter !== 'all') res = res.filter(p => p.platform === platFilter)
    if (diffFilter !== 'all') {
      const d = diffFilter.toLowerCase()
      res = res.filter(p => {
        const l = p.difficulty.toLowerCase()
        if (d === 'easy') return l === 'easy' || l === '1'
        if (d === 'medium') return l === 'medium' || l === '2'
        if (d === 'hard') return l === 'hard' || l === '3'
        if (d === 'rating') return !isNaN(parseInt(p.difficulty)) && parseInt(p.difficulty) >= 800
        return true
      })
    }
    return [...res].sort((a, b) => {
      let cmp = 0
      if (sort === 'name') cmp = a.name.localeCompare(b.name)
      else if (sort === 'platform') cmp = a.platform.localeCompare(b.platform)
      else if (sort === 'difficulty') cmp = (a.difficulty || '').localeCompare(b.difficulty || '')
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [problems, search, platFilter, diffFilter, sort, sortDir])

  const groups = useMemo(() => {
    const map = new Map<string, RawProblem[]>()
    for (const p of filtered) {
      const key = p.keyConcept || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [filtered])

  const toggleSortDir = (col: typeof sort) => {
    if (sort === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSort(col); setSortDir('asc') }
  }

  const clearFilters = () => { setSearch(''); setPlat('all'); setDiff('all') }
  const hasFilters = search || platFilter !== 'all' || diffFilter !== 'all'

  if (!loading && problems.length === 0) return null

  return (
    <div>
      {/* ── Toolbar ─────────────────────────────────── */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-[var(--foreground)]">All {topicName} Problems</h2>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {loading ? 'Loading…' : `${filtered.length.toLocaleString()} / ${problems.length.toLocaleString()} problems · ${groups.length} categories`}
          </p>
        </div>

        {!loading && (
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-48 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 pl-8 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>
            {/* Platform */}
            <select
              value={platFilter}
              onChange={e => setPlat(e.target.value)}
              aria-label="Filter by platform"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-xs text-[var(--muted)] outline-none focus:border-[var(--accent)]"
            >
              {platforms.map(p => <option key={p} value={p}>{p === 'all' ? 'All platforms' : p}</option>)}
            </select>
            {/* Difficulty */}
            <select
              value={diffFilter}
              onChange={e => setDiff(e.target.value)}
              aria-label="Filter by difficulty"
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 text-xs text-[var(--muted)] outline-none focus:border-[var(--accent)]"
            >
              <option value="all">All difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="rating">Rating</option>
            </select>
            {/* Sort */}
            <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <span>Sort:</span>
              {(['name', 'platform', 'difficulty'] as const).map(col => (
                <button key={col} onClick={() => toggleSortDir(col)}
                  className={`rounded px-2 py-1 capitalize transition-colors ${sort === col ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--default)]'}`}>
                  {col}{sort === col ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button onClick={clearFilters} className="rounded px-2 py-1 text-xs text-[var(--muted)] hover:text-red-400 transition-colors">
                Clear ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────── */}
      {loading ? (
        <div className="flex items-center gap-2 py-8 text-sm text-[var(--muted)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          Loading problems…
        </div>
      ) : groups.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--muted)]">No problems match your filters.</p>
          <button onClick={clearFilters} className="mt-2 text-sm text-[var(--accent)] hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          {groups.map(([concept, probs], gi) => (
            <div key={concept}>
              {/* Category header */}
              <div className={`flex items-center gap-3 px-4 py-2.5 ${gi > 0 ? 'border-t border-[var(--border)]' : ''} bg-[var(--surface)]`}>
                <span className="flex-1 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">{concept}</span>
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] font-bold text-[var(--muted)]">{probs.length}</span>
              </div>
              {/* Problems */}
              {probs.map((p, i) => {
                const itemId = `${p.platform}::${p.name}`
                const selected = isSelected(itemId)
                const item: CollectionItem = {
                  id: itemId, name: p.name, url: p.url, platform: p.platform,
                  difficulty: p.difficulty, keyConcept: p.keyConcept,
                  topic: topicName, addedAt: Date.now(),
                }
                return (
                  <div key={i} className={`flex items-center gap-3 border-t border-[var(--border)] px-4 py-2.5 transition-colors ${selected ? 'bg-[var(--accent)]/8' : 'hover:bg-[var(--default)]'}`}>
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleSelect(item)}
                      className={`h-4 w-4 shrink-0 rounded border transition-colors ${selected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)] hover:border-[var(--accent)]'}`}
                      aria-label={selected ? 'Deselect' : 'Select'}
                    >
                      {selected && <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2,6 5,9 10,3"/></svg>}
                    </button>
                    <span className="w-6 shrink-0 text-center text-[10px] tabular-nums text-[var(--muted)]">{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      {p.url
                        ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-[var(--foreground)] no-underline hover:text-[var(--accent)]">{p.name}</a>
                        : <span className="block truncate text-sm font-medium text-[var(--foreground)]">{p.name}</span>
                      }
                    </div>
                    <span className="hidden sm:inline shrink-0 text-[10px] text-[var(--muted)]">{p.platform}</span>
                    <span className={`shrink-0 text-[10px] font-bold ${diffColor(p.difficulty)}`}>{p.difficulty || '—'}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
