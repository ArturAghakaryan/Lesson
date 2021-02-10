import React from "react";

import './Button.scss'

const Button = ({className = "", onClick,  children} ) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
