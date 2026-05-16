import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { articles } from '#/data/articles'
import { getCurriculum, countCurriculumChapters } from '#/data/curricula'
import type { Curriculum } from '#/data/curricula'
import { ArrowRight } from 'lucide-react'
import { Card } from '@heroui/react/card'

export const Route = createFileRoute('/learn/$track')({
  component: TrackPage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:pt-14">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
        <h1 className="mb-4 text-xl font-bold text-[var(--foreground)]">Track Not Found</h1>
        <p className="mb-4 text-sm text-[var(--muted)]">The learning track you're looking for doesn't exist.</p>
        <Link
          to="/learn"
          className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
        >
          ← Choose a Track
        </Link>
      </div>
    </main>
  ),
})

function TrackPage() {
  const { track } = useParams({ from: '/learn/$track' })
  const curriculum = getCurriculum(track)

  if (!curriculum) return null

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:pt-14">
      <CurriculumHero curriculum={curriculum} />

      <div className="mb-8 space-y-10">
        {curriculum.parts.map((section) => {
          const articleMap = Object.fromEntries(articles.map(a => [a.slug, a]))
          const validChapters = section.chapters
            .map(ch => ({ ...ch, article: articleMap[ch.slug] }))
            .filter(({ article }) => !!article)

          return (
            <section key={section.title}>
              <div className="mb-4 flex items-center gap-3 border-b border-[var(--border)] pb-3">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: section.color }}
                />
                <h2 className="text-sm font-semibold text-[var(--foreground)]">{section.title}</h2>
                <span className="ml-auto text-xs text-[var(--muted)]">{validChapters.length} chapters</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {validChapters.map(({ article, difficulty, focus, description }, idx) => (
                  <ChapterCard
                    key={article.slug}
                    article={article}
                    num={idx + 1}
                    accentColor={section.color}
                    difficulty={difficulty}
                    focus={focus}
                    description={description}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Looking for the full textbook?</p>
        <Link to="/learn" className="text-sm text-[var(--accent)] no-underline hover:underline">
          Switch to Full Textbook →
        </Link>
      </div>
    </main>
  )
}

function CurriculumHero({ curriculum }: { curriculum: Curriculum }) {
  return (
    <section className="mb-10 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-secondary)] p-8 sm:p-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)]">{curriculum.title}</p>
          <h1 className="mb-4 text-[clamp(2rem,6vw,4rem)] font-bold leading-tight text-[var(--foreground)]">
            {curriculum.tagline}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
            {curriculum.description}
          </p>
        </div>
        <Link
          to="/learn"
          className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-4 py-2 text-sm font-medium text-[var(--foreground)] no-underline transition-colors hover:bg-[var(--default)]"
        >
          ← All Tracks
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
          {curriculum.parts.length} sections
        </span>
        <span className="inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--default)] px-3 py-1 text-xs font-medium text-[var(--foreground)]">
          {countCurriculumChapters(curriculum)} chapters
        </span>
      </div>
    </section>
  )
}

function ChapterCard({
  article,
  num,
  accentColor,
  difficulty,
  focus,
  description,
}: {
  article: (typeof articles)[0]
  num: number
  accentColor: string
  difficulty?: string
  focus?: string
  description?: string
}) {
  const difficultyColor =
    difficulty === 'beginner' ? 'oklch(0.75 0.15 160)' :
    difficulty === 'intermediate' ? 'oklch(0.65 0.15 240)' :
    difficulty === 'advanced' ? 'oklch(0.65 0.15 290)' :
    'oklch(0.65 0.15 15)'

  return (
    <Link
      to="/learn/$pattern"
      params={{ pattern: article.slug }}
      className="group block no-underline"
    >
      <Card className="h-full border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:shadow-[var(--surface-shadow)] hover:-translate-y-px">
        <div className="flex gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
            style={{ background: accentColor }}
          >
            {num}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-[var(--foreground)] leading-tight">{article.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
              {description || article.tagline}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1">
                {difficulty && (
                  <span
                    className="inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                    style={{ background: difficultyColor }}
                  >
                    {difficulty}
                  </span>
                )}
                {focus && focus !== 'both' && (
                  <span className="inline-block rounded border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[var(--muted)]">
                    {focus}
                  </span>
                )}
              </div>
              <ArrowRight size={12} className="text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-60" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
