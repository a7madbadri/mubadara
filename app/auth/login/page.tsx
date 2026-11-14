"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useDemo } from "@/context/demo-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { currentUser: user, login } = useDemo();
  const [error, setError] = useState("");
  const router = useRouter();

  const onChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    const result = login(userData.email, userData.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    router.push("/home");
  };

  useEffect(() => {
    if (user) router.push("/home");
  }, []);

  return (
    <div className="grid grid-cols-2 h-full max-w-300 mx-auto">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <Image
          src="/images/initiatives/init_1.avif"
          alt="login page image"
          width={1000}
          height={1000}
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute z-1 py-3 w-full text-white flex flex-col justify-end h-full bg-linear-to-b from-transparent  to-accent">
          <h1 className="bg-accen text-center text-2xl font-bold text-accent bg-white mb-2 py-1">
            مُــبادرة
          </h1>
          <p className="mb-6 text-center text-sm px-4">
            منصة تهدف إلى تسهيل تنظيم المبادرات المجتمعية والطلابية, وربط
            المبادرين والمنظمين بالمتطوعين والداعمين محلياً.
          </p>
        </div>
      </div>
      <div className="p-3 size-full">
        <h1 className="text-lg font-bold text-center mb-1">تسجيل دخول</h1>
        <p className="text-center text-sm mb-5">
          مرحباً بعودتك إلى{" "}
          <span className="text-accent font-bold">مُــبادرة</span>
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label className="text-sm mb-1 block">البريد الإلكتروني</label>
          <InputField
            placeholder="البريد الإلكتروني"
            className="mb-2"
            value={userData.email}
            onChange={({ target }) => onChange("email", target.value)}
          />
          <label className="text-sm mb-1 block">كلمة السر</label>
          <InputField
            placeholder="كلمة السر"
            className=""
            value={userData.password}
            onChange={({ target }) => onChange("password", target.value)}
          />
          {error && <p className="text-red-500 mb-1 mt-3 text-sm">{error}</p>}
          <Button variant="accent" className="w-full mt-4">
            تسجيل الدخول
          </Button>
        </form>
        <hr className="border-slate-200 w-[75%] mx-auto my-4" />
        <Link
          href="/auth/register"
          className="text-sm underline text-accent block text-center w-fit mx-auto"
        >
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  );
}

export default page;
