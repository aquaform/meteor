import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Drawer({ className = "", children }: Props) {
  return (
    <div className={`p-8 w-80 flex flex-col box-content ${className}`}>
      {children}
    </div>
  );
}
