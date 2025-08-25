import React from "react";
import Container from "../layout/Container"; // ✅ import Container
import { PROFILE } from "../../data/profile.js"; // ✅ import profile data

const Footer = () => (
  <footer className="border-t py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
    <Container className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p>
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <a
          href="#home"
          className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Home
        </a>
        <a
          href="#projects"
          className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="rounded-xl px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Contact
        </a>
      </div>
    </Container>
  </footer>
);

export default Footer;
