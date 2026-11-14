"use client";

import Button from "@/components/Button";
import { useDemo } from "@/context/demo-context";
import Image from "next/image";

function Hero() {
  const { currentUser } = useDemo();
  return (
    <section className="px-6 h-dvh relative flex items-center">
      <Image
        src="/images/hero.png"
        alt="hero"
        width={1000}
        height={1000}
        className="h-full w-full absolute inset-0 object-cover z-0"
      />
      <div className="h-full w-full bg-linear-to-b from-black/80 from-60% to-white absolute inset-0 z-1" />

      <div className="relative z-10 container mx-auto text-white">
        <p className="text-2xl font-bold mb-2">
          من <span className="text-accent">الفكرة</span> إلى الأثر
          <span className="text-accent"> المجتمعي</span>؛ <br />
          اجمع طاقات <span className="text-accent">الشباب</span> ووثق
          <span className="text-accent"> مُبادراتك</span>.
        </p>
        <p className="mb-6">
          منصة تهدف إلى تسهيل تنظيم المبادرات المجتمعية والطلابية, <br />
          وربط المبادرين والمنظمين بالمتطوعين والداعمين محلياً.
        </p>
        {currentUser ? (
          <Button size="large" variant="accent" className="mb-10 px-10">
            إنشاء مُبادرة
          </Button>
        ) : (
          <Button size="large" variant="accent" className="mb-10 px-10">
            تسجيل الدخول
          </Button>
        )}
        {/* <p>يمكنك البدء بتصفح المبادرات:</p>
          <form>
            <InputField placeholder="عنوان المبادرة" />
          </form> */}
      </div>
    </section>
  );
}

export default Hero;
