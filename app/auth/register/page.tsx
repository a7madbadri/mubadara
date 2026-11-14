"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { SignUpInput, useDemo } from "@/context/demo-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Register() {
  const router = useRouter();
  const { currentUser: user, signUp } = useDemo();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<SignUpInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const onChange = (name: string, value: string) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = () => {
    const result = signUp(userData);
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
    <div className="p-3 h-full w-full max-w-160 mx-auto">
      <h1 className="text-lg font-bold text-center mb-1">إنشاء حساب</h1>
      <p className="text-center text-sm mb-5">
        إنضم إلى <span className="text-accent font-bold">مُــبادرة</span> وكن
        جزءاً من تطور المجتمع
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label className="text-sm mb-1 block">الإسم الاول</label>
            <InputField
              placeholder="الإسم الاول"
              className="mb-2"
              value={userData.firstName}
              onChange={({ target }) => onChange("firstName", target.value)}
            />
          </div>
          <div className="">
            <label className="text-sm mb-1 block">الإسم الثاني</label>
            <InputField
              placeholder="الإسم الثاني"
              className="mb-2"
              value={userData.lastName}
              onChange={({ target }) => onChange("lastName", target.value)}
            />
          </div>
        </div>
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
          إنشاء الحساب
        </Button>
      </form>
      <hr className="border-slate-200 w-[75%] mx-auto my-4" />
      <Link
        href="/auth/login"
        className="text-sm underline text-accent block text-center w-fit mx-auto"
      >
        تسجيل الدخول إلى حسابك
      </Link>
    </div>
  );
}

export default Register;
