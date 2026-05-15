import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { articles } from '#/data/articles'
import { getCurriculum, countCurriculumChapters } from '#/data/curricula'
import type { Curriculum } from '#/data/curricula'

export const Route = createFileRoute('/learn/$track')({
  component: TrackPage,
  notFoundComponent: () => (
    <main className="nb-page-wrap px-4 pb-20 pt-10 sm:pt-14">
      <div className="nb-card p-8 text-center">
        <h1 className="nb-heading mb-4">Track Not Found</h1>
        <p className="mb-4 opacity-75">The learning track you're looking for doesn't exist.</p>
        <Link to="/learn" className="nb-chip inline-block bg-[var(--nb-teal)] font-bold no-underline">
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
    <main className="nb-page-wrap px-4 pb-20 pt-10 sm:pt-14">
      {/* Hero */}
      <CurriculumHero curriculum={curriculum} />

      {/* Table of Contents */}
      <div className="mb-8 space-y-10">
        {curriculum.parts.map((section) => {
          const articleMap = Object.fromEntries(articles.map(a => [a.slug, a]))
          const validChapters = section.chapters
            .map(ch => ({
              ...ch,
              article: articleMap[ch.slug],
            }))
            .filter(({ article }) => !!article)

          return (
            <section key={section.title}>
              <div className="mb-4 flex items-center gap-3 border-b-2 border-[var(--nb-border-color)] pb-3">
                <span
                  className="h-3 w-3 rounded-full border-2 border-[var(--nb-border-color)] shrink-0"
                  style={{ background: section.color }}
                />
                <h2 className="nb-heading-sm text-[var(--nb-ink)]">{section.title}</h2>
                <span className="ml-auto text-xs font-bold opacity-50">{validChapters.length} chapters</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Footer */}
      <div className="nb-card nb-accent-bg bg-[var(--nb-green)] p-6 text-center">
        <p className="nb-heading-sm mb-1">Looking for the full textbook?</p>
        <Link to="/learn/full" className="text-sm underline">
          Switch to Full Textbook →
        </Link>
      </div>
    </main>
  )
}

function CurriculumHero({ curriculum }: { curriculum: Curriculum }) {
  return (
    <section className="nb-card nb-accent-bg mb-10 p-8 sm:p-12" style={{ background: `linear-gradient(135deg, var(--nb-yellow), var(--nb-orange))` }}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="nb-kicker mb-3">{curriculum.emoji} {curriculum.title}</p>
          <h1 className="nb-display mb-4 text-[clamp(2rem,6vw,4rem)] leading-tight">
            {curriculum.tagline}
          </h1>
          <p className="max-w-2xl text-sm font-medium leading-relaxed opacity-80">
            {curriculum.description}
          </p>
        </div>
        <Link
          to="/learn"
          className="nb-chip bg-white no-underline hover:bg-[var(--nb-teal)] transition-colors"
        >
          ← All Tracks
        </Link>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="nb-chip bg-white">
          {curriculum.parts.length} sections
        </div>
        <div className="nb-chip bg-white">
          {countCurriculumChapters(curriculum)} chapters
        </div>
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
  return (
    <Link
      to="/learn/$pattern"
      params={{ pattern: article.slug }}
      className="group nb-card nb-card-hover flex gap-4 p-4 no-underline"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-[var(--nb-border-color)] text-sm font-black shadow-[2px_2px_0px_var(--nb-border-color)] transition-shadow group-hover:shadow-none"
        style={{ background: accentColor, color: 'var(--nb-on-accent)' }}
      >
        {num}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <span className="text-lg leading-none">{article.emoji}</span>
          <h3 className="nb-heading-sm truncate leading-tight">{article.title}</h3>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed opacity-60">
          {description || article.tagline}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {difficulty && (
              <span
                className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  difficulty === 'beginner' ? 'bg-[var(--nb-teal)] text-white' :
                  difficulty === 'intermediate' ? 'bg-[var(--nb-blue)] text-white' :
                  difficulty === 'advanced' ? 'bg-[var(--nb-purple)] text-white' :
                  'bg-[var(--nb-rose)] text-white'
                }`}
              >
                {difficulty}
              </span>
            )}
            {focus && focus !== 'both' && (
              <span className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-[var(--nb-gray-200)]">
                {focus}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-[var(--lagoon-deep)] opacity-0 transition-opacity group-hover:opacity-100">
            Start →
          </span>
        </div>
      </div>
    </Link>
  )
}
