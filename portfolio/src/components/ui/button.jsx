const Button = ({ as: As = "button", href, onClick, children, className = "", icon: Icon, variant = "primary", type }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-zinc-900 text-white hover:scale-[1.02] hover:bg-zinc-800 focus:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white dark:focus:ring-zinc-100",
    ghost:
      "bg-transparent text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-900 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 dark:focus:ring-zinc-100",
    outline:
      "border border-zinc-300 text-zinc-800 hover:bg-zinc-100 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-zinc-100",
  };
  const Comp = As === "a" ? "a" : As;
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </Comp>
  );
};

export default Button;
