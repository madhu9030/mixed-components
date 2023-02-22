import React from "react";
import "./button.scss";
import Spinner from "../spinner/spinner";

const Button = ({
  buttonLink,
  label,
  type = "button",
  disabled = false,
  isLoading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={`button animation${buttonLink ? " button-link" : ""}`}
    >
      {isLoading && <Spinner/>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
