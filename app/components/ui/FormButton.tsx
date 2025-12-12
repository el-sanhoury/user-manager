"use client";

import React from "react";
import clsx from "clsx";

type FormButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export default function FormButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className,
  icon,
  iconPosition = "right",
}: FormButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-200";

  const variantStyles = {
    primary: "bg-primary-700 text-white hover:bg-primary-700",
    secondary:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 bg-white",
    success: "bg-green-700 text-white hover:bg-green-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], className)}
    >
      {icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
