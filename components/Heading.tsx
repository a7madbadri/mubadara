import { ComponentPropsWithRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentPropsWithRef<"h2">;

function Heading({ children, className, ...props }: Props) {
  return (
    <h2
      className={twMerge(
        "text-lg font-bold mb-1 pr-1 relative before:border-10 before:border-transparent before:border-r-accent before:absolute before:top-1/2 before:translate-y-[-50%] before:-right-3",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export default Heading;
