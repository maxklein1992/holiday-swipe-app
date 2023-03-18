import React from "react";

import styles from "./Button.module.scss";

const Button = ({ onClick, children, className, variant, disabled, size }) => {
  // Defensive
  if (!children) return null;

  const classNames = [styles.button, styles[variant], styles[size], className]
    .join(" ")
    .trim();

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
