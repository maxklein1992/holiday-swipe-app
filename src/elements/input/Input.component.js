import React from "react";

import styles from "./Input.module.scss";

const Input = ({ className, name, value, placeholder, onChange }) => {
  // Defensive
  if (!name || !onChange) return null;

  const classNames = [styles.input, className].join(" ").trim();

  return (
    <input
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
