import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
import { articles, getArticle } from '#/data/articles'
import type { Section, Intuition } from '#/data/articles'

export const Route = createFileRoute('/learn/$pattern')({
  loader: ({ params }) => {
    const article = getArticle(params.pattern)
    if (!article) throw notFound()
    return article
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <main className="nb-page-wrap px-4 py-20 text-center">
      <div className="nb-card mx-auto max-w-md bg-[var(--nb-pink)] p-8">
        <p className="nb-display text-4xl">404</p>
        <p className="mt-2 font-bold">Pattern not found</p>
        <Link to="/learn" className="nb-btn mt-4 inline-block">← Back to Learn</Link>
      </div>
    </main>
  ),
})

// ─── Helpers ───────────────────────────────────────────────────────────────

function md(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="nb-inline-code">$1</code>')
    .replace(/\n/g, '<br/>')
}

// ─── Section renderers ─────────────────────────────────────────────────────

function StickyCallout({ icon, color, content }: { icon: string; color: string; content: string }) {
  const bgMap: Record<string, string> = {
    teal:  'bg-[var(--nb-teal)]',
    green: 'bg-[var(--nb-green)]',
    amber: 'bg-[var(--nb-yellow)]',
    red:   'bg-[var(--nb-pink)]',
    blue:  'bg-[var(--nb-blue)]',
    gray:  'bg-[var(--nb-surface-strong)]',
  }
  return (
    <div className={`nb-sticky-note ${bgMap[color] ?? bgMap.gray} my-6`}>
      <span className="mr-2 text-xl flex-shrink-0">{icon}</span>
      <div
        className="flex-1 text-sm font-medium leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: md(content) }}
      />
    </div>
  )
}

function CodeBlock({ code, caption }: { lang?: string; code: string; caption?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="nb-code-block my-6">
      {caption && <div className="nb-code-caption">{caption}</div>}
      <div className="relative">
        <button onClick={copy} className="absolute right-3 top-3 nb-chip bg-white text-xs py-1 px-2 z-10">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <pre className="overflow-x-auto p-4 pr-20 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
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
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed" style={{ background: 'var(--nb-code-bg)', color: 'var(--nb-code-text)' }}>
            <code>{intuition.code}</code>
          </pre>
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
      {/* Header row */}
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
        {/* ── SOLVE BUTTON ── */}
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

function VariationCard({ section }: { section: Extract<Section, { type: 'variation' }> }) {
  return (
    <div className="nb-card bg-[var(--nb-purple)] my-8">
      <div className="p-5 border-b-2 border-[var(--nb-border-color)]">
        <p className="nb-kicker mb-1">Variation Trick</p>
        <h3 className="nb-heading-sm">{section.title}</h3>
      </div>
      <div className="p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider opacity-60">Base template</p>
        <pre className="nb-code-inline mb-5 overflow-x-auto p-4 text-sm leading-relaxed">
          <code>{section.baseCode}</code>
        </pre>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider opacity-60">Change only one line to solve:</p>
        <div className="space-y-3">
          {section.variants.map((v, i) => (
            <div key={i} className="nb-card bg-[var(--nb-surface)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm mb-1">{v.problem}</p>
                  <div className="nb-code-inline px-3 py-1.5 text-xs font-mono mb-1.5">
                    {v.change}
                  </div>
                  <p className="text-xs opacity-70">{v.why}</p>
                </div>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-btn nb-btn-sm shrink-0 no-underline"
                >
                  Solve ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Quick Overview — template + problem list + view-more ──────────────────

function QuickOverview({ sections, topicSlug }: { sections: Section[]; topicSlug: string }) {
  const [expanded, setExpanded] = useState(false)
  const problems = sections.filter((s): s is Extract<Section, { type: 'problem' }> => s.type === 'problem')
  const templateSection = sections.find(
    (s): s is Extract<Section, { type: 'code' }> =>
      s.type === 'code' && (
        (s.caption ?? '').toLowerCase().includes('template') ||
        (s.caption ?? '').toLowerCase().includes('core') ||
        (s.caption ?? '').toLowerCase().includes('base')
      )
  ) ?? sections.find((s): s is Extract<Section, { type: 'code' }> => s.type === 'code')

  if (problems.length === 0) return null

  const PREVIEW = 4
  const visible = expanded ? problems : problems.slice(0, PREVIEW)
  const hidden = problems.length - PREVIEW

  return (
    <div className="nb-card bg-[var(--nb-surface)] mb-8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b-2 border-[var(--nb-border-color)] bg-[var(--nb-ink)]">
        <div>
          <p className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--nb-yellow)' }}>
            Problems you can solve with this pattern
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--nb-yellow)', opacity: 0.6 }}>
            {problems.length} problems · click any to start solving
          </p>
        </div>
        <Link
          to="/problems/$topic"
          params={{ topic: topicSlug }}
          className="nb-btn nb-btn-sm no-underline"
          style={{ background: 'var(--nb-yellow)', color: 'var(--nb-ink)' }}
        >
          All {topicSlug.replace('_', ' ')} →
        </Link>
      </div>

      <div className="lg:flex">
        {/* Problem list */}
        <div className="flex-1 min-w-0">
          <div className="divide-y-2 divide-[var(--nb-border-color)]" style={{ borderColor: 'var(--nb-border-color)' }}>
            {visible.map((p) => (
              <div key={p.num} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--nb-yellow)] transition-colors group">
                <span className="shrink-0 w-6 text-center text-xs font-black" style={{ opacity: 0.4 }}>{p.num}</span>
                <span className="flex-1 text-sm font-semibold truncate">{p.title}</span>
                <span className={`nb-diff-badge nb-diff-${p.difficulty.toLowerCase()} shrink-0 text-[10px]`}>
                  {p.difficulty}
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 nb-btn nb-btn-sm no-underline"
                  style={{ opacity: 0, transition: 'opacity 120ms' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onFocus={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                  onBlur={e => (e.currentTarget.style.opacity = '0')}
                >
                  Solve ↗
                </a>
              </div>
            ))}
          </div>

          {/* View more / less */}
          {hidden > 0 && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full py-3 px-4 text-sm font-bold border-t-2 border-[var(--nb-border-color)] hover:bg-[var(--nb-yellow)] transition-colors text-left"
            >
              {expanded ? `↑ Show fewer` : `↓ Show ${hidden} more problems`}
            </button>
          )}
        </div>

        {/* Template snippet — only shown on wider screens */}
        {templateSection && (
          <div className="lg:w-80 xl:w-96 shrink-0 border-t-2 lg:border-t-0 lg:border-l-2 border-[var(--nb-border-color)]">
            <div className="px-3 pt-3 pb-1 text-xs font-black uppercase tracking-wider opacity-50">
              {templateSection.caption ?? 'Core Template'}
            </div>
            <pre
              className="overflow-x-auto p-3 text-xs leading-relaxed h-full"
              style={{ background: 'var(--nb-code-bg)', color: 'var(--nb-code-text)', maxHeight: '280px' }}
            >
              <code>{templateSection.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Section dispatch ───────────────────────────────────────────────────────

function renderSection(section: Section, i: number) {
  switch (section.type) {
    case 'heading':
      return section.level === 2
        ? <h2 key={i} className="nb-heading mt-10 mb-4">{section.text}</h2>
        : <h3 key={i} className="nb-heading-sm mt-7 mb-3">{section.text}</h3>
    case 'text':
      return <p key={i} className="my-4 text-base leading-relaxed">{section.content}</p>
    case 'callout':
      return <StickyCallout key={i} icon={section.icon} color={section.color} content={section.content} />
    case 'code':
      return <CodeBlock key={i} lang={section.lang} code={section.code} caption={section.caption} />
    case 'table':
      return <RecognitionTable key={i} headers={section.headers} rows={section.rows} />
    case 'problem':
      return <ProblemCard key={i} section={section} />
    case 'variation':
      return <VariationCard key={i} section={section} />
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
    case 'divider':
      return <hr key={i} className="my-8 border-t-2 border-[var(--nb-border-color)]" />
    default:
      return null
  }
}

// ─── Sidebar nav ───────────────────────────────────────────────────────────

function ArticleNav({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 nb-card bg-[var(--nb-surface)] p-4">
        <p className="nb-kicker text-xs mb-3">All Patterns</p>
        <ul className="space-y-0.5">
          {articles.map(a => (
            <li key={a.slug}>
              <Link
                to="/learn/$pattern"
                params={{ pattern: a.slug }}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-[var(--nb-yellow)] ${a.slug === currentSlug ? 'bg-[var(--nb-yellow)] font-black' : ''}`}
              >
                <span>{a.emoji}</span>
                <span className="truncate">{a.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────

function ArticlePage() {
  const article = Route.useLoaderData()

  return (
    <main className="nb-page-wrap px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-60">
        <Link to="/" className="no-underline hover:opacity-100">Home</Link>
        <span>/</span>
        <Link to="/learn" className="no-underline hover:opacity-100">Learn</Link>
        <span>/</span>
        <span className="opacity-100">{article.title}</span>
      </div>

      <div className="flex gap-8">
        <ArticleNav currentSlug={article.slug} />

        <div className="min-w-0 flex-1">
          {/* Article hero */}
          <div className="nb-card bg-[var(--nb-yellow)] mb-8 p-7 sm:p-10">
            <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
              <span className="text-5xl flex-shrink-0">{article.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="nb-kicker mb-1">Pattern Guide</p>
                <h1 className="nb-display text-[clamp(1.6rem,4vw,2.8rem)] leading-tight mb-2">
                  {article.title}
                </h1>
                <p className="text-sm font-bold italic mb-3" style={{ opacity: 0.7 }}>
                  "{article.tagline}"
                </p>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ opacity: 0.85 }}>
                  {article.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="nb-chip bg-[var(--nb-surface)]">{article.readTime} read</span>
                  <Link
                    to="/problems/$topic"
                    params={{ topic: article.topicSlug }}
                    className="nb-btn nb-btn-sm no-underline"
                    style={{ background: 'var(--nb-ink)', color: 'var(--nb-yellow)' }}
                  >
                    {article.topicSlug.replace('_', ' ')} problems →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick overview: template + problems + view-more */}
          <QuickOverview sections={article.sections} topicSlug={article.topicSlug} />

          {/* Article body */}
          <div className="nb-article-body">
            {article.sections.map((section, i) => renderSection(section, i))}
          </div>

          {/* All problems for this topic, grouped by concept */}
          <AllTopicProblems topicSlug={article.topicSlug} topicName={article.title} />

          {/* Footer nav */}
          <div className="mt-12 flex gap-4 flex-wrap border-t-2 border-[var(--nb-border-color)] pt-8">
            {(() => {
              const idx = articles.findIndex(a => a.slug === article.slug)
              const prev = articles[idx - 1]
              const next = articles[idx + 1]
              return (
                <>
                  {prev && (
                    <Link to="/learn/$pattern" params={{ pattern: prev.slug }}
                      className="nb-btn nb-btn-outline flex-1 text-center no-underline min-w-[140px]">
                      ← {prev.emoji} {prev.title}
                    </Link>
                  )}
                  {next && (
                    <Link to="/learn/$pattern" params={{ pattern: next.slug }}
                      className="nb-btn flex-1 text-center no-underline min-w-[140px]">
                      {next.emoji} {next.title} →
                    </Link>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </div>
    </main>
  )
}

// ─── All Topic Problems ─────────────────────────────────────────────────────
interface RawProblem {
  platform: string
  name: string
  url: string
  difficulty: string
  keyConcept: string
}

function AllTopicProblems({ topicSlug, topicName }: { topicSlug: string; topicName: string }) {
  const [problems, setProblems] = useState<RawProblem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch(`/data/${topicSlug}.json`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.problems) setProblems(d.problems) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [topicSlug])

  const filtered = useMemo(() => {
    if (!search.trim()) return problems
    const q = search.toLowerCase()
    return problems.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.keyConcept.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q),
    )
  }, [problems, search])

  // Group by keyConcept
  const groups = useMemo(() => {
    const map = new Map<string, RawProblem[]>()
    for (const p of filtered) {
      const key = p.keyConcept || 'General'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(p)
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [filtered])

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const diffColor = (d: string) => {
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

  if (!loading && problems.length === 0) return null

  return (
    <div className="mt-16 border-t-2 border-[var(--nb-border-color)] pt-10">
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
                {/* Group header */}
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

                {/* Problems list */}
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
                        <span className="shrink-0 text-[10px] font-bold text-[var(--sea-ink-soft)]">{p.platform}</span>
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
