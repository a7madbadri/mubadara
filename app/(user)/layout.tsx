import { ReactNode } from "react";
import Header from "./components/Header";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-0">
      <Header />
      <main className="">{children}</main>
    </div>
  );
}

export default layout;
