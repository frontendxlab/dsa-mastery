import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect, useRef } from "react";
import { Palette, Menu, X, Github, BookOpen, Compass, LayoutGrid, Zap } from "lucide-react";

const NB_THEMES = [
	{ key: "default", label: "Default", swatch: "#ffe566" },
	{ key: "sunset", label: "Sunset", swatch: "#ffb347" },
	{ key: "midnight", label: "Midnight", swatch: "#6060cc" },
	{ key: "forest", label: "Forest", swatch: "#80cbc4" },
	{ key: "candy", label: "Candy", swatch: "#ff99cc" },
	{ key: "ocean", label: "Ocean", swatch: "#40a8ff" },
] as const;

function NbThemePicker() {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("default");
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const saved = localStorage.getItem("nb-theme") ?? "default";
		setActive(saved);
		document.documentElement.setAttribute(
			"data-nb-theme",
			saved === "default" ? "" : saved,
		);
	}, []);

	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node))
				setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	const pick = (key: string) => {
		setActive(key);
		setOpen(false);
		localStorage.setItem("nb-theme", key);
		document.documentElement.setAttribute(
			"data-nb-theme",
			key === "default" ? "" : key,
		);
	};

	const current = NB_THEMES.find((t) => t.key === active) ?? NB_THEMES[0];

	return (
		<div ref={ref} className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				title="Pick learn page theme"
				className="nb-theme-btn"
				style={{ "--swatch": current.swatch } as React.CSSProperties}
				aria-label="Choose colour theme"
			>
				<Palette size={16} />
			</button>
			{open && (
				<div className="absolute right-0 top-10 z-50 flex gap-1.5 rounded-lg border border-[var(--nb-border-color)] bg-white p-2 shadow-md">
					{NB_THEMES.map((t) => (
						<button
							key={t.key}
							type="button"
							title={t.label}
							onClick={() => pick(t.key)}
							className={`nb-theme-btn ${active === t.key ? "active" : ""}`}
							style={{ "--swatch": t.swatch } as React.CSSProperties}
							aria-label={t.label}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function LogoLetter({
	char,
	delay,
	color,
}: {
	char: string;
	delay: number;
	color: string;
}) {
	return (
		<span
			className="nb-logo-letter inline-block"
			style={
				{
					animationDelay: `${delay}ms`,
					"--logo-color": color,
				} as React.CSSProperties
			}
		>
			{char}
		</span>
	);
}

function FrontendXLogo() {
	const colors = [
		"var(--nb-pink)",
		"var(--nb-yellow)",
		"var(--nb-teal)",
		"var(--nb-green)",
		"var(--nb-blue)",
		"var(--nb-purple)",
		"var(--nb-orange)",
		"var(--nb-red)",
		"var(--nb-pink)",
	];
	const text = "frontendx";

	return (
		<div className="nb-logo-text">
			{text.split("").map((char, i) => (
				<LogoLetter
					key={`${char}-${i}`}
					char={char}
					delay={i * 80}
					color={colors[i % colors.length]}
				/>
			))}
		</div>
	);
}

export default function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ label: "Topics", to: "/", icon: LayoutGrid },
		{ label: "Learn", to: "/learn", icon: BookOpen },
		{ label: "DSA Patterns", to: "/patterns", icon: Zap },
		{ label: "Explore", to: "/explore", icon: Compass },
	];

	return (
		<header
			className={`sticky top-0 z-50 border-b border-[var(--nb-border-color)] bg-[var(--nb-surface)] transition-all duration-200 ${
				scrolled ? "shadow-md" : ""
			}`}
		>
			<nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
				<h2 className="m-0 flex-shrink-0">
					<Link
						to="/"
						className="nb-logo inline-flex items-center gap-3 no-underline"
					>
						<div className="nb-logo-mark relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--nb-border-color)] bg-[var(--nb-yellow)] shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5">
							<span className="text-xl font-black text-[var(--nb-on-accent,#111)]">
								fx
							</span>
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--nb-border-color,#0f0f0f)] bg-[var(--nb-pink,#ff9ec4)] text-[8px] font-black text-[var(--nb-on-accent,#111)]">
								38k
							</span>
						</div>
						<div className="hidden sm:block">
							<FrontendXLogo />
							<p className="nb-logo-tagline text-[10px] font-bold uppercase tracking-widest text-[var(--nb-ink-soft,#3a3a3a)] opacity-70">
								DSA Problem Inventory
							</p>
						</div>
					</Link>
				</h2>

				<button
					type="button"
					onClick={() => setMobileMenuOpen((o) => !o)}
					className="ml-auto flex sm:hidden items-center justify-center h-9 w-9 rounded-lg border border-[var(--nb-border-color)] bg-[var(--nb-surface-strong)] transition-all duration-150"
					aria-label="Toggle menu"
				>
					{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
				</button>

				<div
					className={`order-3 ${mobileMenuOpen ? "flex" : "hidden"} sm:flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-x-4 gap-y-1 pb-2 sm:pb-0 sm:ml-4`}
				>
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="nb-nav-link group relative inline-flex items-center justify-center sm:justify-start gap-0 px-3 py-2 text-sm font-semibold text-[var(--nb-ink,#111)] no-underline rounded-lg border border-transparent transition-all duration-150 hover:border-[var(--nb-border-color)] hover:bg-[var(--nb-surface-strong)]"
							activeProps={{
								className:
									"nb-nav-link-active border-[var(--nb-border-color)] bg-[var(--nb-teal)] text-[var(--nb-ink)]",
							}}
							onClick={() => setMobileMenuOpen(false)}
						>
							<item.icon size={14} className="shrink-0 opacity-70" />
							<span className="relative z-10 ml-1.5">{item.label}</span>
							<span className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-[var(--nb-pink)] transition-all duration-200 group-hover:w-3/4 group-[.nb-nav-link-active]:w-3/4" />
						</Link>
					))}
					<a
						href="https://github.com/rashidtvmr/dsa-inventory"
						className="nb-nav-link inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--nb-ink,#111)] no-underline rounded-lg border border-[var(--nb-border-color)] bg-[var(--nb-surface-strong)] transition-all duration-150 hover:bg-[var(--nb-green)]"
						target="_blank"
						rel="noreferrer"
						onClick={() => setMobileMenuOpen(false)}
					>
						<Github size={16} />
						<span>GitHub</span>
					</a>
				</div>

				<div className="ml-auto hidden sm:flex items-center gap-1.5 sm:gap-2">
					<NbThemePicker />
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
