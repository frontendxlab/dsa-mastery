import { Link } from "@tanstack/react-router";

type InternalLink = {
	type?: "internal";
	label: string;
	to: string;
};

type ExternalLink = {
	type: "external";
	label: string;
	href: string;
};

type NavLink = InternalLink | ExternalLink;

const navSections: { title: string; links: NavLink[] }[] = [
	{
		title: "Explore",
		links: [
			{ label: "All Topics", to: "/" },
			{ label: "Problem Explorer", to: "/explore" },
			{ label: "Learn DSA", to: "/learn" },
		],
	},
	{
		title: "Topics",
		links: [
			{ label: "Dynamic Programming", to: "/problems/dp" },
			{ label: "Binary Search", to: "/problems/binary_search" },
			{ label: "Graph", to: "/problems/graph" },
			{ label: "Tree", to: "/problems/tree" },
			{ label: "Math", to: "/problems/math" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Patterns Cheat Sheet", to: "/learn/patterns" },
			{
				type: "external",
				label: "GitHub",
				href: "https://github.com/rashidtvmr/dsa-inventory",
			},
		],
	},
];

function FooterLink({ link }: { link: NavLink }) {
	if (link.type === "external") {
		return (
			<a
				href={link.href}
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-1 text-sm font-medium text-[var(--muted-foreground)] no-underline transition-all duration-150 hover:text-[var(--foreground)] hover:pl-1"
			>
				{link.label}
				<span className="text-xs opacity-50">↗</span>
			</a>
		);
	}

	return (
		<Link
			to={link.to}
			className="inline-flex items-center text-sm font-medium text-[var(--muted-foreground)] no-underline transition-all duration-150 hover:text-[var(--foreground)] hover:pl-1"
		>
			{link.label}
		</Link>
	);
}

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="site-footer mt-20 border-t border-[var(--border)] bg-[var(--card)]">
			<div className="page-wrap py-12">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<Link
							to="/"
							className="inline-flex items-center gap-3 no-underline"
						>
							<div className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] shadow-sm">
								<span className="text-2xl font-black text-[var(--foreground)]">
									fx
								</span>
							</div>
							<div>
								<p className="text-lg font-black text-[var(--foreground)] tracking-tight">
									DSA Mastery
								</p>
								<p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
									by frontendx
								</p>
							</div>
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
							38,000+ curated DSA problems from 50+ platforms. Organized by
							topic, tagged by concept, ready for practice.
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-black text-[var(--foreground)]">
								38k+ Problems
							</span>
							<span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-black text-[var(--foreground)]">
								50+ Platforms
							</span>
							<span className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-[10px] font-black text-[var(--foreground)]">
								14 Topics
							</span>
						</div>
					</div>

					{navSections.map((section) => (
						<div key={section.title}>
							<h3 className="mb-4 text-sm font-black uppercase tracking-widest text-[var(--foreground)]">
								{section.title}
							</h3>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<li key={link.label}>
										<FooterLink link={link} />
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
					<p className="text-sm text-[var(--muted-foreground)]">
						© {year} DSA Mastery. Built for DSA practice.
					</p>
					<div className="flex items-center gap-4">
						<a
							href="https://github.com/rashidtvmr/dsa-inventory"
							target="_blank"
							rel="noreferrer"
							className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-all duration-150 hover:bg-[var(--secondary)] hover:-translate-y-0.5"
						>
							<span className="sr-only">GitHub</span>
							<svg
								viewBox="0 0 16 16"
								aria-hidden="true"
								width="18"
								height="18"
							>
								<path
									fill="currentColor"
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
