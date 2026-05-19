import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: 'About \u2014 DSA Mastery' },
      { name: 'description', content: 'DSA Mastery helps developers master Data Structures & Algorithms with 38,000+ curated problems across 25+ platforms. Learn by topic, book, or pattern.' },
    ],
  }),
  component: About,
});

function About() {
	return (
		<main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:pt-14">
			<section className="relative mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-8 sm:p-12 shadow-sm">
				<div className="absolute -right-8 -top-8 h-32 w-32 rounded-xl border border-[var(--border)] bg-[var(--warning,#fcd34d)]/30 opacity-70" />
				<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-xl border border-[var(--border)] bg-[var(--destructive,#fca5a5)]/20 opacity-50" />

				<div className="relative z-10">
					<div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 shadow-sm">
						<span className="text-sm">ℹ️</span>
						<span className="text-[11px] font-black uppercase tracking-widest text-[var(--foreground)]">
							About
						</span>
					</div>

					<h1 className="mt-6 text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl">
						Built for
						<br />
						<span className="relative inline-block">
							serious DSA practice
							<span
								className="absolute -bottom-2 left-0 h-3 w-full bg-[var(--primary)]/20"
								style={{ zIndex: -1, transform: "rotate(-1deg)" }}
							/>
						</span>
					</h1>
				</div>
			</section>

			<div className="grid gap-6 lg:grid-cols-2">
				<section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
					<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--warning,#fcd34d)]/30 text-2xl shadow-sm">
						🎯
					</div>
					<h2 className="text-xl font-black tracking-tight text-[var(--foreground)]">
						The Mission
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
						<strong className="text-[var(--foreground)]">
							frontendx DSA Inventory
						</strong>{" "}
						was built to solve a simple problem: finding good DSA practice
						problems shouldn't require jumping between 10 different platforms.
					</p>
					<p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
						We've curated{" "}
						<strong className="text-[var(--foreground)]">
							38,000+ problems
						</strong>{" "}
						from{" "}
						<strong className="text-[var(--foreground)]">50+ platforms</strong>{" "}
						— LeetCode, Codeforces, AtCoder, GeeksforGeeks, CSES, Baekjoon, and
						beyond — organized them by topic, deduplicated them, and made
						everything searchable and filterable.
					</p>
				</section>

				<section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
					<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--destructive,#fca5a5)]/20 text-2xl shadow-sm">
						📦
					</div>
					<h2 className="text-xl font-black tracking-tight text-[var(--foreground)]">
						Open & Transparent
					</h2>
					<p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
						All problem data lives in{" "}
						<strong className="text-[var(--foreground)]">
							plain CSV files
						</strong>
						. No black boxes. No proprietary APIs. Every problem is auditable,
						portable, and Git-friendly.
					</p>
					<div className="mt-4 space-y-2">
						<div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-[11px] font-black text-[var(--foreground)] shadow-sm">
							✅ CSV-backed
						</div>
						<div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-[11px] font-black text-[var(--foreground)] shadow-sm">
							✅ Open Source
						</div>
						<div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-[11px] font-black text-[var(--foreground)] shadow-sm">
							✅ Deduplicated
						</div>
					</div>
				</section>
			</div>

			<section className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-6 sm:p-8 text-center shadow-sm">
				<h2 className="text-xl font-black tracking-tight text-[var(--foreground)]">
					Ready to start practicing?
				</h2>
				<p className="mt-2 text-sm text-[var(--muted-foreground)]">
					Jump into topics, explore problems, or learn through patterns.
				</p>
				<div className="mt-6 flex flex-wrap justify-center gap-3">
					<Link
						to="/"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-black text-[var(--foreground)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
					>
						<span>📚</span>
						<span>Browse Topics</span>
					</Link>
					<Link
						to="/explore"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--foreground)] px-6 py-3 text-sm font-black text-[var(--background)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
					>
						<span>🔍</span>
						<span>Explore All Problems</span>
					</Link>
				</div>
			</section>
		</main>
	);
}
