"use client";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import {
  CalendarClock,
  CalendarRange,
  Globe,
  HeartHandshake,
  MapPin,
  Users,
  Users2,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import InitiativeCarousel from "../components/InitiativeCarousel";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useDemo } from "@/context/demo-context";

function Initiative() {
  const { getInitiativeById, getActivitiesByInitiative } = useDemo();
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname.split("/")[2];
  const initiative = getInitiativeById(id);
  if (!initiative) redirect("/home");
  const {
    title,
    summary,
    followerIds,
    contributorIds,
    activityIds,
    region,
    description,
  } = initiative;
  const activities = getActivitiesByInitiative(id);
  return (
    <>
      <section className="px-6 h-dvh relative flex items-center">
        <Image
          src="/images/initiatives/init_1.avif"
          alt="initiative cover"
          width={1000}
          height={1000}
          className="h-full w-full absolute inset-0 object-cover z-0"
        />
        <div className="h-full w-full bg-linear-to-b from-black/80 from-60% to-white absolute inset-0 z-1" />
        <div className="relative z-10 container mx-auto text-white">
          <p className="text-2xl font-bold mb-2">{title}</p>
          <p className="mb-3">{summary}</p>
          <div className="flex gap-6 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-accent">
                <Globe />
              </span>
              <div className="">
                <h4 className="text-sm">المتابعين</h4>
                <p className="text-lg font-bold">{followerIds.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">
                <HeartHandshake />
              </span>
              <div className="">
                <h4 className="text-sm">المساهمين</h4>
                <p className="text-lg font-bold">{contributorIds.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">
                <CalendarRange />
              </span>
              <div className="">
                <h4 className="text-sm">النشاطات</h4>
                <p className="text-lg font-bold">{activityIds.length}</p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-1">
              <MapPin size={18} className="text-accent" />
              <p>
                ولاية {region.state}, مدينة {region.city}
              </p>
            </div>
          </div>
          <Button variant="accent" className="mb-10 px-6">
            متابعة المبادرة
          </Button>
        </div>
      </section>
      <section className="container mx-auto px-6 py-10">
        <Heading>حول المبادرة</Heading>
        <p className="indent-6">{description}</p>
      </section>
      <InitiativeCarousel />
      <section className="container mx-auto px-6 py-10">
        <Heading className="mb-3">نشاطات المبادرة</Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
          {activities.map(({ id, title, location, startDate }) => (
            <div
              className="border border-slate-200 bg-white rounded-xl p-2"
              key={id}
            >
              <h3 className="font-semibold mb-1">{title}</h3>
              <div className="mb-4">
                <div className="flex items-center text-sm gap-1 mb-1">
                  <MapPin size={15} className="text-accent" />
                  <p className="text-slate-700">{location}</p>
                </div>
                <div className="flex items-center text-sm gap-1 mb-1">
                  <CalendarClock size={15} className="text-accent" />
                  <p className="text-slate-700">
                    يوم {new Date(startDate).getDay()} أكتوبر
                  </p>
                </div>
                <div className="flex items-center text-sm gap-1">
                  <Users2 size={15} className="text-accent" />
                  <p className="text-slate-700">
                    المتبقي {(Math.random() * 50).toFixed()} شخص من العدد
                  </p>
                </div>
              </div>
              <Button variant="accent" className="w-full">
                التسجيل
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Initiative;
