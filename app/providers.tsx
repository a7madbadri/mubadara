"use client";

import { DemoProvider } from "@/context/demo-context";
import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
