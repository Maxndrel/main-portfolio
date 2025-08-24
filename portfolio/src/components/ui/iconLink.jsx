
const IconLink = ({ href, label, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
    aria-label={label}
  >
    <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
    <span className="hidden sm:inline">{label}</span>
  </a>
);


export default IconLink;
