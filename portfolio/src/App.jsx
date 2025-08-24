import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";
import { useReducedMotion } from "framer-motion";

import Section from "./components/layout/Section";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Footer from "./components/sections/Footer"; 

function App() {
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

export default App;
