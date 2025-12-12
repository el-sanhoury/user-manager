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
  ariaLabel?: string;
};

export default function FormButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className,
  icon,
  iconPosition = "right",
  ariaLabel
}: FormButtonProps) {
  const baseStyles = clsx(
    "rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200",
    "px-4 py-2 text-sm",          
    "sm:px-6 sm:py-3 sm:text-base" 
  );

  const variantStyles = {
    primary: "bg-primary-700 text-white hover:bg-primary-800",
    secondary:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 bg-white",
    success: "bg-green-700 text-white hover:bg-green-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variantStyles[variant], className)}
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {icon && iconPosition === "left" && icon}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
