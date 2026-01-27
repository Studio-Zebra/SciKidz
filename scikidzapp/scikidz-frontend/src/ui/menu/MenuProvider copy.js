import React from "react";
import { useMenu } from "./MenuProvider";

export default function HamburgerButton({ className = "" }) {
  const { toggleMenu } = useMenu();

  return (
    <button
      type="button"
      className={`sk-hamburger ${className}`}
      onClick={toggleMenu}
      aria-label="Open menu"
    >
      <span className="sk-hamburger-bar" />
      <span className="sk-hamburger-bar" />
      <span className="sk-hamburger-bar" />
    </button>
  );
}
