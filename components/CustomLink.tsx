import Link from "next/link";
import React, {
  ComponentPropsWithRef,
  CustomComponentPropsWithRef,
} from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<typeof Link> & {
  size?: "normal" | "small" | "large";
  variant?: "default" | "accent";
};

export default function CustomLink({
  className,
  children,
  size = "normal",
  variant = "default",
  ...props
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
    <Link
      className={twMerge(
        "h-8 bg-slate-200 px-5 rounded-full flex items-center duration-150 hover:scale-97",
        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
