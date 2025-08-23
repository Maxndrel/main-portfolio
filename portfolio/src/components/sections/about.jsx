import React from "react";
import Section from "../components/layout/Section";
import SectionTitle from "../components/layout/SectionTitle";
import Container from "../components/layout/Container";

const About = () => {
  return (
    <Section id="about">
      <Container>
        <SectionTitle subtitle="Who I Am">About Me</SectionTitle>
        <div className="mt-8 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I’m a frontend developer with experience in React.js, Tailwind CSS, and modern
            web technologies. I enjoy turning complex problems into simple, beautiful, and
            intuitive designs. When I’m not coding, you’ll find me exploring new tools,
            learning about UI/UX, or contributing to open-source projects.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default About;
