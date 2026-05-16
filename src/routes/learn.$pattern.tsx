import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { useState, useEffect, useMemo } from 'react'
import { articles, getArticle } from '#/data/articles'
import type { Section, Intuition } from '#/data/articles'
import { ShikiCodeBlock, SimpleCodeBlock } from '#/components/ShikiCodeBlock'
import katex from 'katex'
import {
  Share2, Layers, TreePine, Hash, Link2, ChevronUp, Network,
  Type, List, Search, Zap, Binary, RotateCcw, Shuffle,
  Gamepad2, Triangle, Grid3X3, Calendar, Package, TrendingUp,
  GitMerge, Code2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const TOPIC_ICON: Record<string, LucideIcon> = {
  graph: Share2,
  dp: Layers,
  tree: TreePine,
  math: Hash,
  linked_list: Link2,
  heap: ChevronUp,
  trie: Network,
  string: Type,
  sequences: List,
  binary_search: Search,
  greedy: Zap,
  bit: Binary,
  backtrack: RotateCcw,
  combinatorics: Shuffle,
  game_theory: Gamepad2,
  geometry: Triangle,
  linear_algebra: Grid3X3,
  scheduling: Calendar,
  miscellaneous: Package,
  num_methods: TrendingUp,
  advanced_tree: GitMerge,
  sliding_window: Search,
  shape: Package,
}

export const Route = createFileRoute('/learn/$pattern')({
  loader: ({ params }) => {
    const article = getArticle(params.pattern)
    if (!article) throw notFound()
    return article
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-5xl px-4 py-20 text-center">
      <div className="mx-auto max-w-md rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-8">
        <p className="text-4xl font-bold text-[var(--foreground)]">404</p>
        <p className="mt-2 font-bold text-[var(--foreground)]">Pattern not found</p>
        <Link to="/learn" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90">← Back to Learn</Link>
      </div>
    </main>
  ),
})

// ─── Helpers ───────────────────────────────────────────────────────────────

function renderKatex(tex: string, display: boolean) {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'html' })
  } catch {
    return tex
  }
}

function md(text: string) {
  return text
    // Block math: $$...$$
    .replace(/\$\$([^$]+)\$\$/g, (_, tex) => `<span class="katex-block">${renderKatex(tex.trim(), true)}</span>`)
    // Inline math: $...$
    .replace(/\$([^$\n]+)\$/g, (_, tex) => renderKatex(tex.trim(), false))
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\n/g, '<br/>')
}

// ─── Section renderers ─────────────────────────────────────────────────────

function StickyCallout({ icon, color, content }: { icon: string; color: string; content: string }) {
  const bgMap: Record<string, string> = {
    teal:  'bg-[var(--success,#86efac)]/10 border-[var(--success,#86efac)]/20',
    green: 'bg-[var(--success,#86efac)]/10 border-[var(--success,#86efac)]/20',
    amber: 'bg-[var(--warning,#fcd34d)]/10 border-[var(--warning,#fcd34d)]/20',
    red:   'bg-[var(--destructive,#fca5a5)]/10 border-[var(--destructive,#fca5a5)]/20',
    blue:  'bg-[var(--primary,#3b82f6)]/10 border-[var(--primary,#3b82f6)]/20',
    gray:  'bg-[var(--secondary)] border-[var(--border)]',
  }
  return (
    <div className={`flex gap-3 rounded-xl border p-4 my-6 ${bgMap[color] ?? bgMap.gray}`}>
      <span className="mr-2 text-xl flex-shrink-0">{icon}</span>
      <div
        className="flex-1 text-sm font-medium leading-relaxed whitespace-pre-wrap text-[var(--foreground)]"
        dangerouslySetInnerHTML={{ __html: md(content) }}
      />
    </div>
  )
}



function RecognitionTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} className="text-left text-xs font-semibold text-[var(--muted-foreground)] px-3 py-2 border-b border-[var(--border)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[var(--background)]' : 'bg-[var(--secondary)]'}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-sm text-[var(--foreground)] border-b border-[var(--border)] font-medium">{cell}</td>
              ))}
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
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed rounded-b-xl" style={{ background: '#1a1a2e', color: '#e8f4fd' }}>
            <code>{intuition.code}</code>
          </pre>
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
    <div className="my-6 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
      {/* Header row */}
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
        {/* ── SOLVE BUTTON ── */}
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
        <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider border-b border-[var(--border)] opacity-70 text-[var(--foreground)]" style={{ background: 'var(--secondary)' }}>
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
    <div className="rounded-xl border border-[var(--border)] bg-[var(--primary)]/5 my-8">
      <div className="p-5 border-b border-[var(--border)]">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-1">Variation Trick</p>
        <h3 className="text-base font-semibold text-[var(--foreground)]">{section.title}</h3>
      </div>
      <div className="p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider opacity-60 text-[var(--foreground)]">Base template</p>
        <pre className="rounded-lg border border-[var(--border)] mb-5 overflow-x-auto p-4 text-sm leading-relaxed" style={{ background: '#1a1a2e', color: '#e8f4fd' }}>
          <code>{section.baseCode}</code>
        </pre>
        <p className="mb-3 text-xs font-bold uppercase tracking-wider opacity-60 text-[var(--foreground)]">Change only one line to solve:</p>
        <div className="space-y-3">
          {section.variants.map((v, i) => (
            <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm mb-1 text-[var(--foreground)]">{v.problem}</p>
                  <div className="rounded border border-[var(--border)] px-3 py-1.5 text-xs font-mono mb-1.5 text-[var(--foreground)] bg-[var(--secondary)]">
                    {v.change}
                  </div>
                  <p className="text-xs opacity-70 text-[var(--foreground)]">{v.why}</p>
                </div>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90 shrink-0"
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
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] mb-8 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--secondary)]">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-[var(--foreground)]">
            Problems you can solve with this pattern
          </p>
          <p className="text-xs mt-0.5 text-[var(--muted-foreground)]">
            {problems.length} problems · click any to start solving
          </p>
        </div>
        <Link
          to="/problems/$topic"
          params={{ topic: topicSlug }}
          className="inline-flex items-center gap-1 rounded-lg bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90"
        >
          All {topicSlug.replace('_', ' ')} →
        </Link>
      </div>

      <div className="lg:flex">
        {/* Problem list */}
        <div className="flex-1 min-w-0">
          <div className="divide-y divide-[var(--border)]">
            {visible.map((p) => (
              <div key={p.num} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--secondary)] transition-colors group">
                <span className="shrink-0 w-6 text-center text-xs font-black text-[var(--muted-foreground)]">{p.num}</span>
                <span className="flex-1 text-sm font-semibold truncate text-[var(--foreground)]">{p.title}</span>
                <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold shrink-0 diff-${p.difficulty.toLowerCase()}`}>
                  {p.difficulty}
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[var(--foreground)] px-2 py-1 text-[10px] font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90"
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
              className="w-full py-3 px-4 text-sm font-bold border-t border-[var(--border)] hover:bg-[var(--secondary)] transition-colors text-left text-[var(--foreground)]"
            >
              {expanded ? `↑ Show fewer` : `↓ Show ${hidden} more problems`}
            </button>
          )}
        </div>

        {/* Template snippet — only shown on wider screens */}
        {templateSection && (
          <div className="lg:w-80 xl:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--border)]">
            <div className="px-3 pt-3 pb-1 text-xs font-black uppercase tracking-wider opacity-50 text-[var(--foreground)]">
              {templateSection.caption ?? 'Core Template'}
            </div>
            <pre
              className="overflow-x-auto p-3 text-xs leading-relaxed h-full"
              style={{ background: '#1a1a2e', color: '#e8f4fd', maxHeight: '280px' }}
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
        ? <h2 key={i} className="text-2xl font-bold text-[var(--foreground)] mt-10 mb-4 border-b border-[var(--border)] pb-2">{section.text}</h2>
        : <h3 key={i} className="text-base font-semibold text-[var(--foreground)] mt-7 mb-3">{section.text}</h3>
    case 'text':
      return <p key={i} className="my-4 text-base leading-relaxed text-[var(--foreground)]">{section.content}</p>
    case 'callout':
      return <StickyCallout key={i} icon={section.icon} color={section.color} content={section.content} />
    case 'code':
      return <ShikiCodeBlock key={i} lang={section.lang || 'javascript'} code={section.code} caption={section.caption} />
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
            <li key={j} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)] opacity-60" />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'divider':
      return <hr key={i} className="my-8 border-t border-[var(--border)]" />
    default:
      return null
  }
}

// ─── Sidebar nav ───────────────────────────────────────────────────────────

function ArticleNav({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">All Patterns</p>
        <ul className="space-y-0.5">
          {articles.map(a => (
            <li key={a.slug}>
              <Link
                to="/learn/$pattern"
                params={{ pattern: a.slug }}
                className={`flex items-center gap-2 rounded px-2 py-1.5 text-xs font-semibold no-underline transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] text-[var(--muted-foreground)] ${a.slug === currentSlug ? 'bg-[var(--secondary)] text-[var(--foreground)] font-black' : ''}`}
              >
                {(() => { const Icon = TOPIC_ICON[a.topicSlug] ?? Code2; return <Icon size={12} className="shrink-0 opacity-60" />; })()}
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
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
        <Link to="/" className="no-underline hover:text-[var(--foreground)]">Home</Link>
        <span>/</span>
        <Link to="/learn" className="no-underline hover:text-[var(--foreground)]">Learn</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{article.title}</span>
      </div>

      <div className="flex gap-8">
        <ArticleNav currentSlug={article.slug} />

        <div className="min-w-0 flex-1">
          {/* Article hero */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--warning,#fcd34d)]/20 mb-8 p-7 sm:p-10">
            <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
              {(() => { const Icon = TOPIC_ICON[article.topicSlug] ?? Code2; return <Icon size={40} className="shrink-0 opacity-70 text-[var(--foreground)]" />; })()}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-1">Pattern Guide</p>
                <h1 className="text-[clamp(1.6rem,4vw,2.8rem)] font-bold leading-tight mb-2 text-[var(--foreground)]">
                  {article.title}
                </h1>
                <p className="text-sm font-bold italic mb-3 text-[var(--muted-foreground)]">
                  "{article.tagline}"
                </p>
                <p className="text-sm leading-relaxed max-w-2xl text-[var(--foreground)]" style={{ opacity: 0.85 }}>
                  {article.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                  <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-sm font-medium text-[var(--foreground)]">{article.readTime} read</span>
                  <Link
                    to="/problems/$topic"
                    params={{ topic: article.topicSlug }}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90"
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
          <div className="max-w-[760px]">
            {article.sections.map((section, i) => renderSection(section, i))}
          </div>


          {/* Footer nav */}
          <div className="mt-12 flex gap-4 flex-wrap border-t border-[var(--border)] pt-8">
            {(() => {
              const idx = articles.findIndex(a => a.slug === article.slug)
              const prev = articles[idx - 1]
              const next = articles[idx + 1]
              return (
                <>
                  {prev && (
                    <Link to="/learn/$pattern" params={{ pattern: prev.slug }}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--card)] flex-1 text-center min-w-[140px]">
                      ← {prev.title}
                    </Link>
                  )}
                  {next && (
                    <Link to="/learn/$pattern" params={{ pattern: next.slug }}
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] no-underline transition-opacity hover:opacity-90 flex-1 text-center min-w-[140px]">
                      {next.title} →
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

