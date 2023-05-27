import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

export default function Button({ label, onClick, type }: ButtonProps) {
  return (
    <button
      className="border-solid border-black border-2 rounded-lg px-2"
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  onClick: undefined,
};
