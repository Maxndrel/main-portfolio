import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";

import Section from "../layout/Section";
import Container from "../layout/Container";
import Button from "../ui/Button";
import { PROFILE } from "../../data/profile.js";
import IconLink from "../ui/IconLink";
import { fade } from "../../data/animations"; 



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
        {/* Text content */}
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

          {/* Social links */}
          <div className="mt-6 flex items-center gap-2">
            <IconLink href={PROFILE.socials.github} label="GitHub" icon={Github} />
            <IconLink href={PROFILE.socials.linkedin} label="LinkedIn" icon={Linkedin} />
            <IconLink href={PROFILE.socials.twitter} label="Twitter" icon={Twitter} />
            <IconLink href={PROFILE.socials.email} label="Email" icon={Mail} />
          </div>
        </div>

        {/* Avatar */}
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

export default Hero;
