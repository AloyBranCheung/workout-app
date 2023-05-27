import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="border-solid border-black border-2 p-2 rounded-lg">
      {children}
    </div>
  );
}
