import React, { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"input"> & {};

function InputField({ ref, className, ...props }: Props) {
  return (
    <input
      className={twMerge(
        "h-9 bg-slate-200 rounded-full text-sm px-2 text-slate-800",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export default InputField;
