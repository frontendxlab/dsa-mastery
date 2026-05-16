import { Link as RouterLink } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Menu, X } from 'lucide-react';
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Learn",    to: "/learn"     },
  { label: "Explore",  to: "/explore"   },
  { label: "Patterns", to: "/patterns"  },
  { label: "Books",    to: "/books"     },
  { label: "Geo Book", to: "/geometry-book" },
] as const;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="hdr-root">
        <nav className="hdr-pill">

          {/* Logo */}
          <RouterLink to="/" className="hdr-logo" aria-label="Home">
            <div className="hdr-logo-mark">
              <span>fx</span>
            </div>
            <span className="hdr-logo-name">
              DSA Mastery
            </span>
          </RouterLink>

          {/* Desktop nav links */}
          <div className="hdr-links">
            {navItems.map((item) => (
              <RouterLink
                key={item.to}
                to={item.to}
                className="hdr-link"
                activeProps={{ className: "hdr-link hdr-link-active" }}
              >
                {item.label}
              </RouterLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="hdr-actions">
            <ThemeToggle />
            <a
              href="https://github.com/rashidtvmr/dsa-inventory"
              className="hdr-icon-btn"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            {/* Mobile hamburger */}
            <button
              type="button"
              className="hdr-icon-btn hdr-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="hdr-mobile">
            {navItems.map((item) => (
              <RouterLink
                key={item.to}
                to={item.to}
                className="hdr-mobile-link"
                activeProps={{ className: "hdr-mobile-link hdr-mobile-link-active" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </RouterLink>
            ))}
            <a
              href="https://github.com/rashidtvmr/dsa-inventory"
              className="hdr-mobile-link"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        )}
      </header>

      {/* Spacer so fixed header doesn't overlap content */}
      <div className="hdr-spacer" />
    </>
  );
}
