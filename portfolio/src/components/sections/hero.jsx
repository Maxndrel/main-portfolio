import React from "react";
import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <Section className="pt-20 md:pt-32 bg-gradient-to-b from-gray-50 dark:from-gray-900 dark:to-black">
      <Container className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          Hi, I’m <span className="text-blue-600">Your Name</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I’m a passionate frontend developer who loves building clean, scalable, and user-friendly applications with modern web technologies.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="primary" className="flex items-center gap-2">
            View Projects <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary">Contact Me</Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
