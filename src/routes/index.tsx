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
				className="nb-cursor inline-block w-1 bg-[var(--nb-pink,#ff9ec4)] animate-pulse"
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
			className="nb-float-shape absolute pointer-events-none rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)]"
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
			className="nb-marquee overflow-hidden"
			style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
		>
			<div
				className={`nb-marquee-track ${direction === "right" ? "nb-marquee-reverse" : ""}`}
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
			className="nb-stat-card relative rounded-xl border border-[var(--nb-border-color)] p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
			style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
		>
			<div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--nb-border-color)] bg-[var(--nb-surface)] shadow-sm">
				<Icon size={15} />
			</div>
			<p className="text-[10px] font-bold uppercase tracking-widest text-[var(--nb-on-accent,#111)] opacity-70">
				{label}
			</p>
			<p className="nb-display mt-1 text-4xl font-black text-[var(--nb-on-accent,#111)] tracking-tight">
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
			className="nb-feature-card group relative rounded-xl border border-[var(--nb-border-color)] p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
			style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
		>
			<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--nb-border-color)] bg-[var(--nb-surface)] shadow-sm">
				<Icon size={22} className="opacity-70" />
			</div>
			<h3 className="nb-heading-sm text-lg font-black text-[var(--nb-on-accent,#111)] tracking-tight">
				{title}
			</h3>
			<p className="mt-2 text-sm leading-relaxed text-[var(--nb-on-accent,#111)] opacity-75">
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
		"var(--nb-yellow)",
		"var(--nb-pink)",
		"var(--nb-teal)",
		"var(--nb-green)",
		"var(--nb-blue)",
		"var(--nb-purple)",
		"var(--nb-orange)",
		"var(--nb-red)",
	];
	const bgColor = colors[index % colors.length];
	const delay = index * 60;

	return (
		<Link
			to="/problems/$topic"
			params={{ topic: topic.slug }}
			className="nb-topic-card group block no-underline"
			style={{ animationDelay: `${delay}ms` }}
		>
			<article
				className="relative rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] p-5 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)] transition-all duration-200 hover:shadow-[6px_6px_0px_var(--nb-border-color,#0f0f0f)] hover:-translate-x-[2px] hover:-translate-y-[2px]"
				style={{ backgroundColor: bgColor }}
			>
				<div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] text-sm font-black shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)] transition-all duration-200 group-hover:rotate-12">
					{topic.name.charAt(0)}
				</div>

				<div className="pr-8">
					<h3 className="nb-heading-sm text-base font-black text-[var(--nb-on-accent,#111)] tracking-tight">
						{topic.name}
					</h3>
					<p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--nb-on-accent,#111)] opacity-70">
						{topic.description}
					</p>
				</div>

				<div className="mt-4 flex items-center justify-between border-t-2 border-[var(--nb-border-color,#0f0f0f)] pt-3">
					<div className="flex items-baseline gap-1">
						<span className="nb-display text-2xl font-black tabular-nums text-[var(--nb-on-accent,#111)]">
							{topic.count.toLocaleString()}
						</span>
						<span className="text-[10px] font-bold uppercase tracking-wider text-[var(--nb-on-accent,#111)] opacity-60">
							problems
						</span>
					</div>
					<span className="text-[10px] font-bold uppercase tracking-wider text-[var(--nb-on-accent,#111)] opacity-50 transition-opacity group-hover:opacity-100">
						Explore →
					</span>
				</div>

				<div className="mt-2 flex gap-1">
					<span className="inline-flex items-center rounded-full border border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-2 py-0.5 text-[9px] font-bold text-[var(--nb-on-accent,#111)]">
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
			<div className="h-1 flex-1 border-t-2 border-[var(--nb-border-color,#0f0f0f)]" />
			<span
				className="nb-heading-sm inline-flex items-center gap-2 rounded-full border-2 border-[var(--nb-border-color,#0f0f0f)] px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)]"
				style={{ backgroundColor: color }}
			>
				{text}
			</span>
			<div className="h-1 flex-1 border-t-2 border-[var(--nb-border-color,#0f0f0f)]" />
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
		<main className="nb-page-wrap px-4 pb-16 pt-10 sm:pt-14">
			{/* ── Hero Section ───────────────────────────────────────────────────────── */}
			<section className="nb-hero relative mb-8 overflow-hidden rounded-2xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] p-6 sm:p-10 shadow-[8px_8px_0px_var(--nb-border-color,#0f0f0f)]">
				<FloatingShape
					delay={0}
					color="var(--nb-yellow)"
					size={80}
					x="5%"
					y="10%"
				/>
				<FloatingShape
					delay={200}
					color="var(--nb-pink)"
					size={60}
					x="85%"
					y="15%"
				/>
				<FloatingShape
					delay={400}
					color="var(--nb-teal)"
					size={100}
					x="70%"
					y="60%"
				/>
				<FloatingShape
					delay={600}
					color="var(--nb-green)"
					size={50}
					x="15%"
					y="70%"
				/>
				<FloatingShape
					delay={800}
					color="var(--nb-orange)"
					size={70}
					x="45%"
					y="5%"
				/>

				<div className="relative z-10">
					<div className="nb-hero-badge inline-flex items-center gap-2 rounded-full border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] px-3 py-1 shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)]">
						<span className="text-sm">⚡</span>
						<span className="text-[11px] font-black uppercase tracking-widest text-[var(--nb-on-accent,#111)]">
							Now with 38,000+ problems
						</span>
					</div>

					<h1 className="nb-hero-title nb-display mt-6 text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.95] tracking-tighter text-[var(--nb-ink,#111)]">
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
								className="absolute -bottom-1 left-0 h-4 w-full -rotate-1 bg-[var(--nb-yellow,#ffe566)]"
								style={{ zIndex: 0 }}
							/>
						</span>
						<br />
						<span className="text-[var(--nb-ink-soft,#3a3a3a)]">
							One problem at a time.
						</span>
					</h1>

					<p className="nb-hero-subtitle mt-6 max-w-2xl text-base leading-relaxed text-[var(--nb-ink-soft,#3a3a3a)]">
						Curated, deduplicated DSA problems from{" "}
						<span className="inline-flex items-center rounded border border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] px-1.5 py-0.5 text-[11px] font-black">
							50+ platforms
						</span>{" "}
						including LeetCode, Codeforces, AtCoder, and beyond. Organized by
						topic, tagged by concept, ready for practice.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							to="/learn"
							className="nb-btn inline-flex items-center gap-2 rounded-xl border border-[var(--nb-border-color)] bg-[var(--nb-pink)] px-6 py-3 text-sm font-bold shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
						>
							<BookOpen size={16} />
							<span>Start Learning</span>
						</Link>
						<Link
							to="/explore"
							className="nb-btn-outline inline-flex items-center gap-2 rounded-xl border border-[var(--nb-border-color)] bg-[var(--nb-surface-strong)] px-6 py-3 text-sm font-bold shadow-sm transition-all duration-150 hover:bg-[var(--nb-teal)] hover:shadow-md hover:-translate-y-0.5"
						>
							<Search size={16} />
							<span>Explore Problems</span>
						</Link>
					</div>
				</div>
			</section>

			{/* ── Marquee ──────────────────────────────────────────────────────────── */}
			<div className="mb-8 rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-yellow,#ffe566)] py-3 shadow-[4px_4px_0px_var(--nb-border-color,#0f0f0f)]">
				<MarqueeRow speed={40}>
					{platformNames.map((platform) => (
						<span
							key={platform}
							className="inline-flex items-center gap-3 px-6 text-sm font-black uppercase tracking-wider text-[var(--nb-on-accent,#111)]"
						>
							<span className="text-lg">◆</span>
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
						color="var(--nb-yellow)"
						delay={0}
					/>
					<StatCard
						icon={BookOpen}
						label="Topics"
						value={topics.length}
						color="var(--nb-teal)"
						delay={100}
					/>
					<StatCard
						icon={Globe}
						label="Platforms"
						value={uniquePlatforms}
						suffix="+"
						color="var(--nb-pink)"
						delay={200}
					/>
				</div>
			</section>

			{/* ── Features Section ─────────────────────────────────────────────────── */}
			<SectionDivider text="What You Can Do" color="var(--nb-green)" />

			<section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<FeatureCard
					icon={Search}
					title="Explore Problems"
					description="Browse 38,000+ problems across 50+ platforms. Filter by difficulty, platform, and topic. Find the perfect problem for your practice session."
					color="var(--nb-yellow)"
					delay={0}
				/>
				<FeatureCard
					icon={BookOpen}
					title="Learn Patterns"
					description="Master DSA through pattern-based learning. Each topic comes with explanations, examples, and carefully curated practice problems."
					color="var(--nb-pink)"
					delay={100}
				/>
				<FeatureCard
					icon={Target}
					title="Topic Grouping"
					description="Problems organized into 14 core topics: Dynamic Programming, Graphs, Trees, Binary Search, Sliding Window, and more. Practice systematically."
					color="var(--nb-teal)"
					delay={200}
				/>
				<FeatureCard
					icon={Zap}
					title="Quick Search"
					description="Full-text search across problem names, concepts, topics, and platforms. Find exactly what you need in milliseconds."
					color="var(--nb-green)"
					delay={300}
				/>
				<FeatureCard
					icon={BarChart2}
					title="Track by Difficulty"
					description="Filter by Easy, Medium, Hard, or rating ranges. Build your skills progressively from fundamentals to advanced challenges."
					color="var(--nb-orange)"
					delay={400}
				/>
				<FeatureCard
					icon={CheckCircle}
					title="Deduplicated & Clean"
					description="Every problem is carefully deduplicated across platforms. No more solving the same problem with different names. Focus on learning, not redundancy."
					color="var(--nb-purple)"
					delay={500}
				/>
			</section>

			{/* ── Topic Cards Section ───────────────────────────────────────────────── */}
			<SectionDivider text="Browse by Topic" color="var(--nb-orange)" />

			<section className="mb-8">
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<h2 className="nb-heading-sm text-xl font-black text-[var(--nb-ink,#111)] tracking-tight">
						{filtered.length} Topic{filtered.length !== 1 ? "s" : ""}
					</h2>

					<div className="relative max-w-md flex-1 sm:ml-4">
						<input
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search topics..."
							className="w-full rounded-xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-surface,#fff9f0)] px-5 py-3 pl-11 text-sm font-semibold text-[var(--nb-ink,#111)] outline-none shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)] transition-all placeholder:text-[var(--nb-ink-soft,#3a3a3a)] placeholder:opacity-60 focus:ring-2 focus:ring-[var(--nb-pink,#ff9ec4)]"
						/>
						<svg
							className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--nb-ink-soft,#3a3a3a)]"
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
					<div className="rounded-xl border border-[var(--nb-border-color)] bg-[var(--nb-surface)] p-12 text-center shadow-sm">
						<Search size={32} className="mx-auto mb-3 opacity-30" />
						<p className="mt-4 text-base font-bold text-[var(--nb-ink,#111)]">
							No topics match "{search}"
						</p>
						<button
							type="button"
							onClick={() => setSearch("")}
							className="mt-4 rounded-lg border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] px-4 py-2 text-xs font-black shadow-[3px_3px_0px_var(--nb-border-color,#0f0f0f)] transition-all hover:shadow-[2px_2px_0px_var(--nb-border-color,#0f0f0f)] hover:translate-x-[1px] hover:translate-y-[1px]"
						>
							Clear Search
						</button>
					</div>
				)}
			</section>

			{/* ── CTA Section ───────────────────────────────────────────────────────── */}
			<SectionDivider text="Ready to Start?" color="var(--nb-pink)" />

			<section className="rounded-2xl border-2 border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-teal,#7ee8e2)] p-8 sm:p-12 text-center shadow-[8px_8px_0px_var(--nb-border-color,#0f0f0f)]">
				<h2 className="nb-display text-3xl font-black text-[var(--nb-on-accent,#111)] tracking-tight sm:text-4xl">
					Start Your DSA Journey
				</h2>
				<p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-[var(--nb-on-accent,#111)] opacity-80">
					Whether you're preparing for interviews or building competitive
					programming skills, frontendx has the problems, patterns, and
					structure you need.
				</p>
				<div className="mt-8 flex flex-wrap justify-center gap-3">
					<Link
						to="/learn"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--nb-border-color)] bg-[var(--nb-pink)] px-8 py-4 text-base font-bold shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
					>
						<BookOpen size={18} />
						<span>Learn Patterns</span>
					</Link>
					<Link
						to="/explore"
						className="inline-flex items-center gap-2 rounded-xl border border-[var(--nb-border-color)] bg-[var(--nb-yellow)] px-8 py-4 text-base font-bold shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
					>
						<Target size={18} />
						<span>Browse Problems</span>
					</Link>
				</div>
			</section>
		</main>
	);
}
