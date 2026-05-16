import { Link, createFileRoute } from "@tanstack/react-router";
import { topics, totalProblems, uniquePlatforms } from "#/data/topics";
import { useState, useMemo, useEffect, useRef } from "react";
import { BookOpen, Globe, Search, Target, Zap, BarChart2, CheckCircle, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

function AnimatedCounter({
	target,
	suffix = "",
	duration = 1500,
}: {
	target: number;
	suffix?: string;
	duration?: number;
}) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);
	const counted = useRef(false);

	useEffect(() => {
		if (!ref.current || counted.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting || counted.current) return;
				counted.current = true;
				const start = performance.now();
				const animate = (now: number) => {
					const elapsed = now - start;
					const progress = Math.min(elapsed / duration, 1);
					const eased = 1 - (1 - progress) * (1 - progress) * (1 - progress);
					setCount(Math.floor(eased * target));
					if (progress < 1) requestAnimationFrame(animate);
				};
				requestAnimationFrame(animate);
			},
			{ threshold: 0.3 },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [target, duration]);

	return (
		<span ref={ref}>
			{count.toLocaleString()}
			{suffix}
		</span>
	);
}

function TypewriterText({
	texts,
	speed = 80,
	pause = 2000,
}: {
	texts: string[];
	speed?: number;
	pause?: number;
}) {
	const [displayText, setDisplayText] = useState("");
	const [textIndex, setTextIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentText = texts[textIndex];
		let timeout: ReturnType<typeof setTimeout>;

		if (!isDeleting) {
			if (displayText.length < currentText.length) {
				timeout = setTimeout(() => {
					setDisplayText(currentText.slice(0, displayText.length + 1));
				}, speed);
			} else {
				timeout = setTimeout(() => setIsDeleting(true), pause);
			}
		} else {
			if (displayText.length > 0) {
				timeout = setTimeout(() => {
					setDisplayText(displayText.slice(0, -1));
				}, speed / 2);
			} else {
				setIsDeleting(false);
				setTextIndex((prev) => (prev + 1) % texts.length);
			}
		}

		return () => clearTimeout(timeout);
	}, [displayText, isDeleting, textIndex, texts, speed, pause]);

	return (
		<span className="inline-block">
			{displayText}
			<span
				className="tw-cursor inline-block w-1 bg-[var(--primary)] animate-pulse"
				style={{ marginLeft: "2px" }}
			>
				&nbsp;
			</span>
		</span>
	);
}

function FloatingShape({
	delay,
	color,
	size,
	x,
	y,
}: {
	delay: number;
	color: string;
	size: number;
	x: string;
	y: string;
}) {
	return (
		<div
			className="float-shape absolute pointer-events-none rounded-lg border border-[var(--border)]"
			style={{
				width: size,
				height: size,
				left: x,
				top: y,
				backgroundColor: color,
				animationDelay: `${delay}ms`,
			}}
		/>
	);
}

function MarqueeRow({
	children,
	direction = "left",
	speed = 30,
}: {
	children: React.ReactNode;
	direction?: "left" | "right";
	speed?: number;
}) {
	return (
		<div
			className="marquee-wrap overflow-hidden"
			style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
		>
			<div
				className={`marquee-track ${direction === "right" ? "marquee-reverse" : ""}`}
			>
				{children}
				{children}
			</div>
		</div>
	);
}

function StatCard({
	icon: Icon,
	label,
	value,
	suffix,
	color,
	delay = 0,
}: {
	icon: LucideIcon;
	label: string;
	value: number;
	suffix?: string;
	color: string;
	delay?: number;
}) {
	return (
		<div
			className="card-enter relative rounded-xl border border-[var(--border)] p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
			style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
		>
			<div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] shadow-sm">
				<Icon size={15} />
			</div>
			<p className="text-[10px] font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70">
				{label}
			</p>
			<p className="mt-1 text-4xl font-black text-[var(--foreground)] tracking-tight">
				<AnimatedCounter target={value} suffix={suffix} duration={2000} />
			</p>
		</div>
	);
}

function FeatureCard({
	icon: Icon,
	title,
	description,
	color,
	delay = 0,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
	color: string;
	delay?: number;
}) {
	return (
		<div
			className="card-enter group relative rounded-xl border border-[var(--border)] p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
			style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
		>
			<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-sm">
				<Icon size={22} className="opacity-70" />
			</div>
			<h3 className="text-lg font-black text-[var(--foreground)] tracking-tight">
				{title}
			</h3>
			<p className="mt-2 text-sm leading-relaxed text-[var(--foreground)] opacity-75">
				{description}
			</p>
		</div>
	);
}

function TopicCard({
	topic,
	index,
}: {
	topic: (typeof topics)[0];
	index: number;
}) {
	const colors = [
		"oklch(0.88 0.104 90 / 40%)",
		"oklch(0.82 0.112 355 / 30%)",
		"oklch(0.82 0.096 191 / 30%)",
		"oklch(0.85 0.104 145 / 30%)",
		"oklch(0.72 0.112 240 / 20%)",
		"oklch(0.75 0.112 290 / 20%)",
		"oklch(0.82 0.112 60 / 30%)",
		"oklch(0.72 0.144 25 / 20%)",
	];
	const bgColor = colors[index % colors.length];
	const delay = index * 60;

	return (
		<Link
			to="/problems/$topic"
			params={{ topic: topic.slug }}
			className="card-enter group block no-underline"
			style={{ animationDelay: `${delay}ms` }}
		>
			<article
				className="relative rounded-xl border border-[var(--border)] p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
				style={{ backgroundColor: bgColor }}
			>
				<div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-sm font-black shadow-sm transition-all duration-200 group-hover:rotate-12 text-[var(--foreground)]">
					{topic.name.charAt(0)}
				</div>

				<div className="pr-8">
					<h3 className="text-base font-black text-[var(--foreground)] tracking-tight">
						{topic.name}
					</h3>
					<p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--foreground)] opacity-70">
						{topic.description}
					</p>
				</div>

				<div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
					<div className="flex items-baseline gap-1">
						<span className="text-2xl font-black tabular-nums text-[var(--foreground)]">
							{topic.count.toLocaleString()}
						</span>
						<span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
							problems
						</span>
					</div>
					<span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-50 transition-opacity group-hover:opacity-100">
						Explore →
					</span>
				</div>

				<div className="mt-2 flex gap-1">
					<span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-2 py-0.5 text-[9px] font-bold text-[var(--foreground)]">
						{topic.platforms} platforms
					</span>
				</div>
			</article>
		</Link>
	);
}

function SectionDivider({ text, color }: { text: string; color: string }) {
	return (
		<div className="my-16 flex items-center gap-4">
			<div className="h-px flex-1 bg-[var(--border)]" />
			<span
				className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-sm text-[var(--foreground)]"
				style={{ backgroundColor: color }}
			>
				{text}
			</span>
			<div className="h-px flex-1 bg-[var(--border)]" />
		</div>
	);
}

function App() {
	const [search, setSearch] = useState("");

	const filtered = useMemo(
		() =>
			topics.filter(
				(t) =>
					t.name.toLowerCase().includes(search.toLowerCase()) ||
					t.description.toLowerCase().includes(search.toLowerCase()) ||
					t.slug.includes(search.toLowerCase()),
			),
		[search],
	);

	const platformNames = [
		"LeetCode",
		"Codeforces",
		"AtCoder",
		"GeeksforGeeks",
		"CSES",
		"Baekjoon",
		"SPOJ",
		"UVa",
		"HackerRank",
		"CodeChef",
		"Kattis",
		"TopCoder",
	];

	return (
		<main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:pt-14">
			{/* ── Hero Section ───────────────────────────────────────────────────────── */}
			<section className="relative mb-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 shadow-sm">
				<FloatingShape
					delay={0}
					color="oklch(0.88 0.104 90 / 40%)"
					size={80}
					x="5%"
					y="10%"
				/>
				<FloatingShape
					delay={200}
					color="oklch(0.82 0.112 355 / 30%)"
					size={60}
					x="85%"
					y="15%"
				/>
				<FloatingShape
					delay={400}
					color="oklch(0.82 0.096 191 / 30%)"
					size={100}
					x="70%"
					y="60%"
				/>
				<FloatingShape
					delay={600}
					color="oklch(0.85 0.104 145 / 30%)"
					size={50}
					x="15%"
					y="70%"
				/>
				<FloatingShape
					delay={800}
					color="oklch(0.82 0.112 60 / 30%)"
					size={70}
					x="45%"
					y="5%"
				/>

				<div className="relative z-10">
					<div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 shadow-sm">
						<span className="text-sm">⚡</span>
						<span className="text-[11px] font-black uppercase tracking-widest text-[var(--foreground)]">
							Now with 38,000+ problems
						</span>
					</div>

					<h1 className="mt-6 text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.95] tracking-tighter text-[var(--foreground)]">
						Master
						<br />
						<span className="relative inline-block">
							<span className="relative z-10">
								<TypewriterText
									texts={[
										"DSA",
										"Algorithms",
										"Dynamic Programming",
										"Graphs",
										"Trees",
										"Binary Search",
									]}
									speed={60}
									pause={1500}
								/>
							</span>
							<span
								className="absolute -bottom-1 left-0 h-4 w-full -rotate-1 bg-[var(--primary)]/20"
								style={{ zIndex: 0 }}
							/>
						</span>
						<br />
						<span className="text-[var(--muted-foreground)]">
							One problem at a time.
						</span>
					</h1>

					<p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)]">
						Curated, deduplicated DSA problems from{" "}
						<span className="inline-flex items-center rounded border border-[var(--border)] bg-[var(--secondary)] px-1.5 py-0.5 text-[11px] font-black text-[var(--foreground)]">
							50+ platforms
						</span>{" "}
						including LeetCode, Codeforces, AtCoder, and beyond. Organized by
						topic, tagged by concept, ready for practice.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							to="/learn"
							className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--foreground)] px-6 py-3 text-sm font-bold text-[var(--background)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
						>
							<BookOpen size={16} />
							<span>Start Learning</span>
						</Link>
						<Link
							to="/explore"
							className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-6 py-3 text-sm font-bold text-[var(--foreground)] shadow-sm transition-all duration-150 hover:bg-[var(--card)] hover:shadow-md hover:-translate-y-0.5 no-underline"
						>
							<Search size={16} />
							<span>Explore Problems</span>
						</Link>
					</div>
				</div>
			</section>

			{/* ── Marquee ──────────────────────────────────────────────────────────── */}
			<div className="mb-8 rounded-xl border border-[var(--border)] bg-[var(--secondary)] py-3 shadow-sm">
				<MarqueeRow speed={40}>
					{platformNames.map((platform) => (
						<span
							key={platform}
							className="inline-flex items-center gap-3 px-6 text-sm font-black uppercase tracking-wider text-[var(--foreground)]"
						>
							<span className="text-lg opacity-40">◆</span>
							{platform}
						</span>
					))}
				</MarqueeRow>
			</div>

			{/* ── Stats Section ────────────────────────────────────────────────────── */}
			<section className="mb-8">
				<div className="grid gap-4 sm:grid-cols-3">
					<StatCard
						icon={BarChart2}
						label="Total Problems"
						value={totalProblems}
						color="oklch(0.88 0.104 90 / 40%)"
						delay={0}
					/>
					<StatCard
						icon={BookOpen}
						label="Topics"
						value={topics.length}
						color="oklch(0.82 0.096 191 / 30%)"
						delay={100}
					/>
					<StatCard
						icon={Globe}
						label="Platforms"
						value={uniquePlatforms}
						suffix="+"
						color="oklch(0.82 0.112 355 / 30%)"
						delay={200}
					/>
				</div>
			</section>

			{/* ── Features Section ─────────────────────────────────────────────────── */}
			<SectionDivider text="What You Can Do" color="oklch(0.85 0.104 145 / 40%)" />

			<section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<FeatureCard
					icon={Search}
					title="Explore Problems"
					description="Browse 38,000+ problems across 50+ platforms. Filter by difficulty, platform, and topic. Find the perfect problem for your practice session."
					color="oklch(0.88 0.104 90 / 30%)"
					delay={0}
				/>
				<FeatureCard
					icon={BookOpen}
					title="Learn Patterns"
					description="Master DSA through pattern-based learning. Each topic comes with explanations, examples, and carefully curated practice problems."
					color="oklch(0.82 0.112 355 / 20%)"
					delay={100}
				/>
				<FeatureCard
					icon={Target}
					title="Topic Grouping"
					description="Problems organized into 14 core topics: Dynamic Programming, Graphs, Trees, Binary Search, Sliding Window, and more. Practice systematically."
					color="oklch(0.82 0.096 191 / 20%)"
					delay={200}
				/>
				<FeatureCard
					icon={Zap}
					title="Quick Search"
					description="Full-text search across problem names, concepts, topics, and platforms. Find exactly what you need in milliseconds."
					color="oklch(0.85 0.104 145 / 30%)"
					delay={300}
				/>
				<FeatureCard
					icon={BarChart2}
					title="Track by Difficulty"
					description="Filter by Easy, Medium, Hard, or rating ranges. Build your skills progressively from fundamentals to advanced challenges."
					color="oklch(0.82 0.112 60 / 30%)"
					delay={400}
				/>
				<FeatureCard
					icon={CheckCircle}
					title="Deduplicated & Clean"
					description="Every problem is carefully deduplicated across platforms. No more solving the same problem with different names. Focus on learning, not redundancy."
					color="oklch(0.75 0.112 290 / 20%)"
					delay={500}
				/>
			</section>

			{/* ── Topic Cards Section ───────────────────────────────────────────────── */}
			<SectionDivider text="Browse by Topic" color="oklch(0.82 0.112 60 / 40%)" />

			<section className="mb-8">
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="text-xl font-black text-[var(--foreground)] tracking-tight">
						{filtered.length} Topic{filtered.length !== 1 ? "s" : ""}
					</h2>

					<div className="relative max-w-md flex-1 sm:ml-4">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search topics..."
							className="w-full rounded-xl border border-[var(--border)] bg-[var(--secondary)] px-5 py-3 pl-11 text-sm font-semibold text-[var(--foreground)] outline-none shadow-sm transition-all placeholder:text-[var(--muted-foreground)] placeholder:opacity-60 focus:ring-2 focus:ring-[var(--primary)]"
						/>
						<svg
							className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
						>
							<circle
								cx="7"
								cy="7"
								r="5.5"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M11 11L14.5 14.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filtered.map((topic, i) => (
						<TopicCard key={topic.slug} topic={topic} index={i} />
					))}
				</div>

				{filtered.length === 0 && (
					<div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-12 text-center shadow-sm">
						<Search size={32} className="mx-auto mb-3 opacity-30 text-[var(--foreground)]" />
						<p className="mt-4 text-base font-bold text-[var(--foreground)]">
							No topics match "{search}"
						</p>
						<button
							type="button"
							onClick={() => setSearch("")}
							className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-4 py-2 text-xs font-black text-[var(--foreground)] shadow-sm transition-all hover:bg-[var(--card)] hover:-translate-y-0.5"
						>
							Clear Search
						</button>
					</div>
				)}
			</section>

			{/* ── CTA Section ───────────────────────────────────────────────────────── */}
			<SectionDivider text="Ready to Start?" color="oklch(0.82 0.112 355 / 30%)" />

			<section className="rounded-2xl border border-[var(--border)] bg-[var(--secondary)] p-8 sm:p-12 text-center shadow-sm">
				<h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight sm:text-4xl">
					Start Your DSA Journey
				</h2>
				<p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-[var(--muted-foreground)]">
					Whether you're preparing for interviews or building competitive
					programming skills, frontendx has the problems, patterns, and
					structure you need.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Link
						to="/learn"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--foreground)] px-8 py-4 text-base font-bold text-[var(--background)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
					>
						<BookOpen size={18} />
						<span>Learn Patterns</span>
					</Link>
					<Link
						to="/explore"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-8 py-4 text-base font-bold text-[var(--foreground)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 no-underline"
					>
						<Target size={18} />
						<span>Browse Problems</span>
					</Link>
				</div>
			</section>
		</main>
	);
}
