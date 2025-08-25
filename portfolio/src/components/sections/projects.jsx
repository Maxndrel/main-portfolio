import React from "react";
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Container from "../layout/Container";
import ProjectCard from "../ui/ProjectCard"; // ✅ import your ProjectCard
import { PROJECTS } from "../../data/projects"; // ✅ import your projects data


const Projects = () => (
  <Section id="projects" className="bg-zinc-50 dark:bg-zinc-950">
    <Container>
      <SectionTitle
        eyebrow="Work"
        title="Selected Projects"
        subtitle="A few things I've built recently."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </Container>
  </Section>
);

export default Projects;
