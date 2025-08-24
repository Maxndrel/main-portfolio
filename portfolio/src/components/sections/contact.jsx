import React, { useState } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react"; 
import IconLink from "../ui/IconLink";
import { PROFILE } from "../../data/profile";

import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Container from "../layout/Container";
import Button from "../ui/Button";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!emailRegex.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    // For production, integrate your email service (e.g., Resend, EmailJS, AWS SES).
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <Section id="contact" className="bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <SectionTitle eyebrow="Contact" title="Let's work together" subtitle="Have a question, a project, or just want to say hi?" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="order-2 md:order-1 md:col-span-2">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Name</label>
                <input
                  className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Email</label>
                <input
                  className={`w-full rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200">Message</label>
                <textarea
                  rows={5}
                  className={`w-full resize-y rounded-xl border bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-1 ring-black/0 transition placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-zinc-900 dark:focus:ring-zinc-100"
                  }`}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit">Send Message</Button>
                {sent && <span className="text-sm text-green-600">Thanks! I'll get back to you soon.</span>}
              </div>
            </form>
          </div>
          <div className="order-1 space-y-3 md:order-2">
            <div className="rounded-2xl border p-5 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Prefer socials?</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <IconLink href={PROFILE.socials.github} label="GitHub" icon={Github} />
                <IconLink href={PROFILE.socials.linkedin} label="LinkedIn" icon={Linkedin} />
                <IconLink href={PROFILE.socials.twitter} label="Twitter" icon={Twitter} />
                <IconLink href={PROFILE.socials.email} label="Email" icon={Mail} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;
