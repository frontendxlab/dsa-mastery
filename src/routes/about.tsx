import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="nb-page-wrap px-4 pb-16 pt-10 sm:pt-14">
      <section className="relative mb-8 overflow-hidden rounded-2xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] p-8 sm:p-12 shadow-[8px_8px_0px_var(--nb-border-color,#0f0f0f)]">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] opacity-70" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-pink,#ff9ec4)] opacity-50" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-3 py-1 shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)]">
            <span className="text-sm">ℹ️</span>
            <span className="text-[11px] font-black uppercase tracking-widest text-[var(--nb-on-accent,#111)]">
              About
            </span>
          </div>

          <h1 className="nb-display mt-6 text-4xl font-black tracking-tight text-[var(--nb-on-accent,#111)] sm:text-5xl">
            Built for
            <br />
            <span className="relative inline-block">
              serious DSA practice
              <span className="absolute -bottom-2 left-0 h-3 w-full bg-[var(--nb-yellow,#ffe566)]" style={{ zIndex: -1, transform: 'rotate(-1deg)' }} />
            </span>
          </h1>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] p-6 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] text-2xl shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)]">
            🎯
          </div>
          <h2 className="nb-heading-sm text-xl font-black tracking-tight text-[var(--nb-ink,#111)]">
            The Mission
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--nb-ink-soft,#3a3a3a)]">
            <strong className="text-[var(--nb-ink,#111)]">frontendx DSA Inventory</strong> was built to solve a
            simple problem: finding good DSA practice problems shouldn't require jumping between 10 different
            platforms.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--nb-ink-soft,#3a3a3a)]">
            We've curated <strong className="text-[var(--nb-ink,#111)]">38,000+ problems</strong> from{' '}
            <strong className="text-[var(--nb-ink,#111)]">50+ platforms</strong> — LeetCode, Codeforces, AtCoder,
            GeeksforGeeks, CSES, Baekjoon, and beyond — organized them by topic, deduplicated them, and made
            everything searchable and filterable.
          </p>
        </section>

        <section className="rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] p-6 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-pink,#ff9ec4)] text-2xl shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)]">
            📦
          </div>
          <h2 className="nb-heading-sm text-xl font-black tracking-tight text-[var(--nb-ink,#111)]">
            Open & Transparent
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--nb-ink-soft,#3a3a3a)]">
            All problem data lives in <strong className="text-[var(--nb-ink,#111)]">plain CSV files</strong>.
            No black boxes. No proprietary APIs. Every problem is auditable, portable, and Git-friendly.
          </p>
          <div className="mt-4 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] px-3 py-1.5 text-[11px] font-black shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)]">
              ✅ CSV-backed
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-green,#a8f0b8)] px-3 py-1.5 text-[11px] font-black shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)]">
              ✅ Open Source
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] px-3 py-1.5 text-[11px] font-black shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)]">
              ✅ Deduplicated
            </div>
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] p-6 sm:p-8 text-center shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
        <h2 className="nb-heading-sm text-xl font-black tracking-tight text-[var(--nb-on-accent,#111)]">
          Ready to start practicing?
        </h2>
        <p className="mt-2 text-sm text-[var(--nb-on-accent,#111)] opacity-80">
          Jump into topics, explore problems, or learn through patterns.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-6 py-3 text-sm font-black shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)] transition-all duration-150 hover:shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <span>📚</span>
            <span>Browse Topics</span>
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-pink,#ff9ec4)] px-6 py-3 text-sm font-black shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)] transition-all duration-150 hover:shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            <span>🔍</span>
            <span>Explore All Problems</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
