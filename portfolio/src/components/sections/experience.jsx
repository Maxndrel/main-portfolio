import React from "react";
import { motion } from "framer-motion"; // ✅ for animations
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Container from "../layout/Container";
import { EXPERIENCE } from "../../data/experience"; // ✅ experience data
import { fade } from "../../data/animations"; 

const Experience = () => (
  <Section id="experience">
    <Container>
      <SectionTitle
        eyebrow="Experience"
        title="Work & Education"
        subtitle="Recent roles and highlights."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {EXPERIENCE.map((e, i) => (
          <motion.article
            key={e.org + e.role}
            custom={i + 1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fade}
            className="rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800"
          >
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {e.role}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {e.org} • {e.period}
            </p>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {e.summary}
            </p>
          </motion.article>
        ))}
      </div>
    </Container>
  </Section>
);

export default Experience;
