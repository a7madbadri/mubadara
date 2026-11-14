import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"button"> & {
  size?: "normal" | "small" | "large";
  variant?: "default" | "accent";
};

function Button({
  className,
  children,
  size = "normal",
  variant = "default",
}: Props) {
  const sizes = {
    normal: "h-8 px-5 text-sm",
    small: "h-8 px-2 text-sm",
    large: "h-10 px-7",
  };
  const variants = {
    default: "bg-slate-200 text-slate-900",
    accent: "bg-accent text-white font-semibold",
  };
  return (
    <button
      className={twMerge(
        "h-8 bg-slate-200 px-5 rounded-full duration-150 hover:scale-97",
        sizes[size],
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
