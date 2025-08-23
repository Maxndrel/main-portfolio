// Navbar.jsx
// Responsive navigation with dark mode toggle

import { useEffect, useState } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";
import Container from "./Container";
import { PROFILE } from "../../data/profile";

const Navbar = ({ onToggleTheme, dark }) => {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const [open, setOpen] = useState(false);

  // Close mobile menu on hash change
  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/60">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#home"
          className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {PROFILE.name}
        </a>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="mx-2 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
          <button
            aria-label="Toggle dark mode"
            onClick={onToggleTheme}
            className="rounded-xl p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Open menu"
            className="rounded-xl p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <Container className="flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={onToggleTheme}
              className="mt-1 rounded-xl px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Toggle {dark ? "Light" : "Dark"} Mode
            </button>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Navbar;
