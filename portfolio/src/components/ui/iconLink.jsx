import React from "react";

const IconLink = ({ href, icon: Icon, label, className }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 hover:text-blue-600 transition-colors duration-300 ${className}`}
    >
      <Icon className="w-5 h-5" />
      {label && <span>{label}</span>}
    </a>
  );
};

export default IconLink;
