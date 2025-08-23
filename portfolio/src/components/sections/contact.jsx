import React from "react";
import Section from "../components/layout/Section";
import SectionTitle from "../components/layout/SectionTitle";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";

const Contact = () => {
  return (
    <Section id="contact" className="bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle subtitle="Get In Touch">Contact</SectionTitle>
        <form className="mt-8 max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          ></textarea>
          <Button type="submit" variant="primary" className="w-full">
            Send Message
          </Button>
        </form>
      </Container>
    </Section>
  );
};

export default Contact;
