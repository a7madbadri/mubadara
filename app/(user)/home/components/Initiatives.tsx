"use client";

import Button from "@/components/Button";
import CustomLink from "@/components/CustomLink";
import { useDemo } from "@/context/demo-context";
import Image from "next/image";
import Initiative from "../../components/Initiative";

export default function Initiatives() {
  const { getInitiatives, isReady } = useDemo();
  const initiatives = getInitiatives();
  return (
    <section className="container mx-auto grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-3">
      {initiatives.map((init) => (
        <Initiative {...init} key={init.id} />
      ))}
    </section>
  );
}
