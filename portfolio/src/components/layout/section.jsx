
const Section = ({ id, className = "", children }) => (
  <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>{children}</section>
);

export default Section;
