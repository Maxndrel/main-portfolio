import React from "react";
import { motion } from "framer-motion"; 
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Container from "../layout/Container";
import { PROFILE } from "../../data/profile.js"; 
import { fade } from "../../data/animations"; 


const About = () => (
  <Section id="about">
    <Container>
      <SectionTitle
        eyebrow="About"
        title="A bit about me"
        subtitle="I enjoy crafting delightful, reliable user interfaces that scale."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fade}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {/* Text + Skills */}
        <div className="md:col-span-2">
          <p className="text-zinc-700 dark:text-zinc-300">
            With a background in product design and frontend engineering, I build systems that balance
            aesthetics and performance. I write accessible code, collaborate closely with designers and
            backend teams, and ship iteratively.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {PROFILE.skills.map((s, i) => (
              <motion.li
                key={s}
                custom={i + 1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className="flex items-center gap-2 rounded-xl border p-2 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                {s}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Profile Image */}
        <div>
          <div className="group relative overflow-hidden rounded-3xl border shadow-sm ring-1 ring-black/5 dark:border-zinc-800">
            <img
              src={PROFILE.avatar}
              loading="lazy"
              alt="Profile"
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
      </motion.div>
    </Container>
  </Section>
);

export default About;
