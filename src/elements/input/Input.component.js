import React from "react";

import styles from "./Input.module.scss";

const Input = ({ className, name, value, placeholder, onChange, size }) => {
  // Defensive
  if (!name || !onChange) return null;

  const classNames = [styles.input, styles[size], className].join(" ").trim();

  return (
    <textarea
      className={classNames}
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
