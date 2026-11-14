import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="p-4 size-full">{children}</div>;
}

export default AuthLayout;
