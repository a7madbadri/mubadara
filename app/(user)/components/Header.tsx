"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Nav from "./Nav";
import { useDemo } from "@/context/demo-context";
import Button from "@/components/Button";

function Header() {
  const { currentUser } = useDemo();
  return (
    <header className="bg-white/70 backdrop-blur-sm border-b border-slate-100/50 px-3 h-13 w-full fixed top-0 z-30">
      <div className="flex justify-between items-center  h-full container mx-auto">
        <h2 className="text-xl leading-relaxed font-bold text-accent">
          مُــبادرة
        </h2>
        <div className="flex items-center">
          {/* <Nav /> */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                <button className="size-7">
                  <Bell size={20} />
                </button>
                <Image
                  src="/images/profile-pic.png"
                  alt="profile pic"
                  width={28}
                  height={28}
                  className="rounded-full border border-slate-200"
                />
              </>
            ) : (
              <Button variant="accent">تسجيل الدخول</Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
