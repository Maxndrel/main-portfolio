import React from "react";
import Section from "../components/layout/Section";
import SectionTitle from "../components/layout/SectionTitle";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

const projects = [
  {
    title: "Portfolio Website",
    description: "A personal portfolio built with React and TailwindCSS.",
    image: "/projects/portfolio.png",
    link: "#",
  },
  {
    title: "E-commerce App",
    description: "A full-stack MERN e-commerce application with authentication and payments.",
    image: "/projects/ecommerce.png",
    link: "#",
  },
  {
    title: "Bank Dashboard",
    description: "A responsive banking dashboard with charts and account management.",
    image: "/projects/bank.png",
    link: "#",
  },
];

const Projects = () => {
  return (
    <Section id="projects">
      <Container>
        <SectionTitle subtitle="My Work">Projects</SectionTitle>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  View Project
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Projects;
