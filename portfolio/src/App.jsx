import { useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Moon, Sun, ExternalLink, ArrowRight, ChevronDown } from "lucide-react";

/**
 * Production‑ready React + Tailwind CSS portfolio in a single file.
 * - Modern, minimal design
 * - Smooth scroll + Framer Motion animations
 * - Reusable components
 * - Dark mode w/ localStorage
 * - Responsive across mobile/tablet/desktop
 * - Lazy‑loaded images
 */

// -----------------------------
// Helpers & Reusable Primitives
// -----------------------------
const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>{children}</section>
);

const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">{subtitle}</p>
    )}
  </div>
);

const Button = ({ as: As = "button", href, onClick, children, className = "", icon: Icon, variant = "primary", type }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-zinc-900 text-white hover:scale-[1.02] hover:bg-zinc-800 focus:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus:ring-zinc-100",
    ghost:
      "bg-transparent text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-900 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 dark:focus:ring-zinc-100",
    outline:
      "border border-zinc-300 text-zinc-800 hover:bg-zinc-100 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-zinc-100",
  };
  const Comp = As === "a" ? "a" : As;
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </Comp>
  );
};

const IconLink = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
    aria-label={label}
  >
    <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
    <span className="hidden sm:inline">{label}</span>
  </a>
);

// -----------------------------
// Demo Data (swap with your info)
// -----------------------------
const PROFILE = {
  name: "Your Name",
  role: "Frontend Engineer",
  intro:
    "I design and build fast, accessible web experiences with React, TypeScript, and a keen eye for detail.",
  location: "Lagos, Nigeria",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60",
  resumeUrl: "#", // link a real PDF
  socials: {
    github: "https://github.com/yourname",
    linkedin: "https://www.linkedin.com/in/yourname/",
    twitter: "https://twitter.com/yourname",
    email: "mailto:hello@yourdomain.com",
  },
  skills: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Framer Motion",
    "REST / GraphQL",
    "Testing (Jest, RTL)",
    "Accessibility (a11y)",
  ],
};

const PROJECTS = [
  {
    title: "Vision V – Swap Electronics",
    description:
      "A platform for trading electronics with secure profiles, listings, and deal flow.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=60",
    tech: ["React", "Bootstrap", "Vite"],
    github: "https://github.com/yourname/vision-v",
    demo: "https://visionv.example.com",
  },
  {
    title: "Qetra Bank Dashboard",
    description:
      "Responsive banking dashboard with charts, transactions, and account controls.",
    image:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=900&auto=format&fit=crop&q=60",
    tech: ["React", "Chart.js", "Tailwind"],
    github: "https://github.com/yourname/qetra",
    demo: "https://qetra.example.com",
  },
  {
    title: "DibaTech Site",
    description:
      "Corporate site introducing services, education, and community initiatives.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=60",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    github: "https://github.com/yourname/dibatech",
    demo: "https://dibatech.example.com",
  },
];

const EXPERIENCE = [
  {
    org: "DibaTech",
    role: "Frontend Engineer (Contract)",
    period: "Feb 2024 – Present",
    summary:
      "Built high‑performance landing pages and dashboards. Led component library standardization.",
  },
  {
    org: "Qetra (Personal Project)",
    role: "Creator",
    period: "Aug 2024 – Dec 2024",
    summary:
      "Implemented banking UI with charts, balance privacy toggles, and local state persistence.",
  },
  {
    org: "Freelance",
    role: "Frontend Developer",
    period: "2022 – 2024",
    summary:
      "Delivered client websites, optimized Lighthouse scores, and improved accessibility.",
  },
];

// -----------------------------
// Utility hooks
// -----------------------------
function useDarkMode(defaultDark = false) {
  const [dark, setDark] = useState(defaultDark);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setDark(stored === "dark");
    } else {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefers);
      localStorage.setItem("theme", prefers ? "dark" : "light");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, setDark };
}

// Basic email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Framer Motion variants
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const card = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" },
  }),
};

// -----------------------------
// Components
// -----------------------------
const Navbar = ({ onToggleTheme, dark }) => {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/60">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {PROFILE.name}
        </a>
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
            className="rounded-xl p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={onToggleTheme}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
        {/* Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            className="rounded-xl p-2 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label="Open menu"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </Container>
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

const Hero = () => (
  <Section id="home" className="pt-8 sm:pt-12">
    <Container>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fade}
        className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2"
      >
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {PROFILE.location}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-200">{PROFILE.role}</p>
          <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-300">{PROFILE.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button as="a" href="#projects" icon={ArrowRight}>
              View Projects
            </Button>
            <Button as="a" href={PROFILE.resumeUrl} variant="outline">
              Download Resume
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <IconLink href={PROFILE.socials.github} label="GitHub" icon={Github} />
            <IconLink href={PROFILE.socials.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={PROFILE.socials.twitter} label="Twitter" icon={Twitter} />
            <IconLink href={PROFILE.socials.email} label="Email" icon={Mail} />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-zinc-200 to-transparent blur-2xl dark:from-zinc-800" />
          <img
            src={PROFILE.avatar}
            loading="lazy"
            alt="Profile"
            className="mx-auto h-56 w-56 rounded-3xl object-cover shadow-xl ring-1 ring-black/10 transition hover:-translate-y-1 hover:shadow-2xl sm:h-64 sm:w-64 md:h-72 md:w-72"
          />
        </div>
      </motion.div>
    </Container>
  </Section>
);

const About = () => (
  <Section id="about">
    <Container>
      <SectionTitle eyebrow="About" title="A bit about me" subtitle="I enjoy crafting delightful, reliable user interfaces that scale." />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fade}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        <div className="md:col-span-2">
          <p className="text-zinc-700 dark:text-zinc-300">
            With a background in product design and frontend engineering, I build systems that balance
            aesthetics and performance. I write accessible code, collaborate closely with designers and
            backend teams, and ship iteratively.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PROFILE.skills.map((s, i) => (
              <motion.li key={s} custom={i + 1} variants={card} className="flex items-center gap-2 rounded-xl border p-2 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="">
          <div className="group relative overflow-hidden rounded-3xl border shadow-sm ring-1 ring-black/5 dark:border-zinc-800">
            <img
              src={PROFILE.avatar}
              loading="lazy"
              alt="Profile alt"
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
      </motion.div>
    </Container>
  </Section>
);

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    custom={index + 1}
    variants={card}
    className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <img src={project.image} loading="lazy" alt="Project cover" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
        <Button as="a" href={project.demo} variant="primary" icon={ExternalLink} className="backdrop-blur">
          Live Demo
        </Button>
        <Button as="a" href={project.github} variant="outline" icon={Github} className="backdrop-blur">
          GitHub
        </Button>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full border px-2 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const Projects = () => (
  <Section id="projects" className="bg-zinc-50 dark:bg-zinc-950">
    <Container>
      <SectionTitle eyebrow="Work" title="Selected Projects" subtitle="A few things I've built recently." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />)
        )}
      </div>
    </Container>
  </Section>
);

const Experience = () => (
  <Section id="experience">
    <Container>
      <SectionTitle eyebrow="Experience" title="Work & Education" subtitle="Recent roles and highlights." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {EXPERIENCE.map((e, i) => (
          <motion.article
            key={e.org}
            custom={i + 1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={card}
            className="rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800"
          >
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">{e.role}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{e.org} • {e.period}</p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{e.summary}</p>
          </motion.article>
        ))}
      </div>
    </Container>
  </Section>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!emailRegex.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    // For production, integrate your email service (e.g., Resend, EmailJS, AWS SES).
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <Section id="contact" className="bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <SectionTitle eyebrow="Contact" title="Let's work together" subtitle="Have a question, a project, or just want to say hi?" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="order-2 md:order-1 md:col-span-2">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Name</label>
                <input
                  className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Email</label>
                <input
                  className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Message</label>
                <textarea
                  rows={5}
                  className={`w-full resize-y rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit">Send Message</Button>
                {sent && <span className="text-sm text-green-600">Thanks! I'll get back to you soon.</span>}
              </div>
            </form>
          </div>
          <div className="order-1 space-y-3 md:order-2">
            <div className="rounded-2xl border p-5 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Prefer socials?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <IconLink href={PROFILE.socials.github} label="GitHub" icon={Github} />
                <IconLink href={PROFILE.socials.linkedin} label="LinkedIn" icon={Linkedin} />
                <IconLink href={PROFILE.socials.twitter} label="Twitter" icon={Twitter} />
                <IconLink href={PROFILE.socials.email} label="Email" icon={Mail} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

const Footer = () => (
  <footer className="border-t py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
    <Container className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
      <div className="flex items-center gap-2">
        <a href="#home" className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Home</a>
        <a href="#projects" className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Projects</a>
        <a href="#contact" className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">Contact</a>
      </div>
    </Container>
  </footer>
);

// -----------------------------
// Main App
// -----------------------------
export default function PortfolioApp() {
  const { dark, setDark } = useDarkMode(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // enable smooth scrolling universally
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-zinc-900 antialiased dark:bg-zinc-900 dark:text-zinc-100">
        <Navbar onToggleTheme={() => setDark((d) => !d)} dark={dark} />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

// -----------------------------
// Tailwind Quick Reference (for your project)
// -----------------------------
// 1) Install & set up Tailwind in Vite or CRA. Example Vite commands:
//    npm create vite@latest my-portfolio -- --template react
//    cd my-portfolio
//    npm i
//    npm i -D tailwindcss postcss autoprefixer
//    npx tailwindcss init -p
//
// 2) tailwind.config.js ->
//    export default { content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], theme: { extend: {} }, darkMode: "class", plugins: [] };
//
// 3) src/index.css ->
//    @tailwind base;\n@tailwind components;\n@tailwind utilities;
//
// 4) Dependencies:
//    npm i framer-motion lucide-react
//
// 5) Replace PROFILE / PROJECTS / EXPERIENCE with your data.
//
// 6) For production: integrate a real mail service in Contact, add SEO meta, and deploy to Vercel/Netlify.
