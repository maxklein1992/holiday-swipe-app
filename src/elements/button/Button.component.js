import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

import styles from "./Button.module.scss";

const Button = ({
  loading,
  onClick,
  children,
  className,
  variant,
  disabled,
  size,
}) => {
  // Defensive
  if (!children) return null;

  const classNames = [styles.button, styles[variant], styles[size], className]
    .join(" ")
    .trim();

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {loading ? <BeatLoader color="black" size={8} /> : children}
    </button>
  );
};

export default Button;
