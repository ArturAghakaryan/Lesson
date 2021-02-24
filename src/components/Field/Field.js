import React from "react";
import "./Field.scss";

const Field = ({
  className = "",
  label = null,
  type = "text",
  id = null,
  name = null,
  value = null,
  onChange = {},
  error = null,
  placeholder,
}) => {
  const switchResult = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
      default:
        return (
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className={`fild--grup ${className}${error ? " is-error" : ""}`}>
      {label && <label htmlFor={id}>{label}</label>}
      {switchResult()}
      {error && <span>{error}</span>}
    </div>
  );
};

export default Field;
