// Section.jsx
// Section wrapper with spacing & smooth scroll offset

const Section = ({ id, className = "", children }) => {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
