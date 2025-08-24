import React from "react";
import { motion } from "framer-motion"; // ✅ animations
import { Github, ExternalLink } from "lucide-react"; // ✅ icons
import Button from "../ui/Button"; // ✅ custom button component
import { fade } from "../../data/animations";


const ProjectCard = ({ project, index }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    custom={index + 1}
    variants={fade}
    className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
  >
    {/* Image + hover overlay */}
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <img
        src={project.image}
        loading="lazy"
        alt={`${project.title} cover`}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
        {project.demo && (
          <Button
            as="a"
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon={ExternalLink}
            className="backdrop-blur"
          >
            Live Demo
          </Button>
        )}
        {project.github && (
          <Button
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            icon={Github}
            className="backdrop-blur"
          >
            GitHub
          </Button>
        )}
      </div>
    </div>

    {/* Project info */}
    <div className="p-5">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border px-2 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;

