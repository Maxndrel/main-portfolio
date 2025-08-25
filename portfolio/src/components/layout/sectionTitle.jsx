const SectionTitle = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10 text-center">
    {eyebrow && (
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
