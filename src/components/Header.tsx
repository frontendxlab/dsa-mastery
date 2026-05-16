import { Link as RouterLink } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Palette, Menu, X, Github, BookOpen, Compass, LayoutGrid, Zap } from 'lucide-react';
import { Button } from "@heroui/react/button";
import ThemeToggle from "./ThemeToggle";

const NB_THEMES = [
	{ key: "default", label: "Default", swatch: "#ffe566" },
	{ key: "sunset", label: "Sunset", swatch: "#ffb347" },
	{ key: "midnight", label: "Midnight", swatch: "#6060cc" },
	{ key: "forest", label: "Forest", swatch: "#80cbc4" },
	{ key: "candy", label: "Candy", swatch: "#ff99cc" },
	{ key: "ocean", label: "Ocean", swatch: "#40a8ff" },
] as const;

const navItems = [
	{ label: "Topics", to: "/", icon: LayoutGrid },
	{ label: "Learn", to: "/learn", icon: BookOpen },
	{ label: "Patterns", to: "/patterns", icon: Zap },
	{ label: "Explore", to: "/explore", icon: Compass },
];

export default function Header() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [accentOpen, setAccentOpen] = useState(false);
	const [activeAccent, setActiveAccent] = useState("default");

	useEffect(() => {
		const saved = localStorage.getItem("nb-theme") ?? "default";
		setActiveAccent(saved);
		document.documentElement.setAttribute("data-nb-theme", saved === "default" ? "" : saved);
	}, []);

	const pickAccent = (key: string) => {
		setActiveAccent(key);
		setAccentOpen(false);
		localStorage.setItem("nb-theme", key);
		document.documentElement.setAttribute("data-nb-theme", key === "default" ? "" : key);
	};

	return (
		<header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
			<nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">

				{/* Logo */}
				<RouterLink to="/" className="flex items-center gap-2.5 no-underline shrink-0">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--foreground)] shadow-sm">
						<span className="text-sm font-black text-[var(--background)]">fx</span>
					</div>
					<span className="hidden sm:block text-sm font-bold text-[var(--foreground)]">
						frontendx<span className="text-[var(--muted)] font-normal"> · DSA</span>
					</span>
				</RouterLink>

				{/* Desktop nav */}
				<div className="hidden sm:flex items-center gap-1 ml-4 flex-1">
					{navItems.map((item) => (
						<RouterLink
							key={item.to}
							to={item.to}
							className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--muted)] no-underline rounded-lg transition-colors hover:text-[var(--foreground)] hover:bg-[var(--default)]"
							activeProps={{ className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--foreground)] no-underline rounded-lg bg-[var(--default)]" }}
						>
							<item.icon size={14} />
							{item.label}
						</RouterLink>
					))}
				</div>

				{/* Right actions */}
				<div className="ml-auto flex items-center gap-2">
					{/* Accent picker */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setAccentOpen(o => !o)}
							className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--default)] transition-colors"
							aria-label="Choose accent color"
						>
							<Palette size={16} />
						</button>
						{accentOpen && (
							<div className="absolute right-0 top-10 z-50 flex gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--overlay)] p-2 shadow-[var(--overlay-shadow)]">
								{NB_THEMES.map((t) => (
									<button
										key={t.key}
										type="button"
										title={t.label}
										onClick={() => pickAccent(t.key)}
										className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${activeAccent === t.key ? "border-white scale-110" : "border-transparent"}`}
										style={{ backgroundColor: t.swatch }}
									/>
								))}
							</div>
						)}
					</div>

					<ThemeToggle />

					<a
						href="https://github.com/rashidtvmr/dsa-inventory"
						className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[var(--muted)] no-underline rounded-lg hover:text-[var(--foreground)] hover:bg-[var(--default)] transition-colors"
						target="_blank"
						rel="noreferrer"
					>
						<Github size={15} />
						<span>GitHub</span>
					</a>

					{/* Mobile hamburger */}
					<button
						type="button"
						className="flex sm:hidden h-8 w-8 items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--default)] transition-colors"
						onClick={() => setMobileOpen(o => !o)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? <X size={18} /> : <Menu size={18} />}
					</button>
				</div>
			</nav>

			{/* Mobile menu */}
			{mobileOpen && (
				<div className="sm:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 space-y-1">
					{navItems.map((item) => (
						<RouterLink
							key={item.to}
							to={item.to}
							className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--muted)] no-underline rounded-lg hover:text-[var(--foreground)] hover:bg-[var(--default)] transition-colors"
							activeProps={{ className: "flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--foreground)] no-underline rounded-lg bg-[var(--default)]" }}
							onClick={() => setMobileOpen(false)}
						>
							<item.icon size={16} />
							{item.label}
						</RouterLink>
					))}
					<a
						href="https://github.com/rashidtvmr/dsa-inventory"
						className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--muted)] no-underline rounded-lg hover:text-[var(--foreground)] hover:bg-[var(--default)] transition-colors"
						target="_blank" rel="noreferrer"
					>
						<Github size={16} />GitHub
					</a>
				</div>
			)}
		</header>
	);
}
