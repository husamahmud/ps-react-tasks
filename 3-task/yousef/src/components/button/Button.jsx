import React from "react";
import "./button.module.css";

const Button = ({ text, className }) => {
  return <button className={className}>{text}</button>;
};

export default Button;
