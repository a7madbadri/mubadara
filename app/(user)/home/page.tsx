import Image from "next/image";
import Hero from "./components/Hero";
import Button from "@/components/Button";
import Initiatives from "./components/Initiatives";

function Home() {
  return (
    <>
      <Hero />
      <Initiatives />
    </>
  );
}

export default Home;
