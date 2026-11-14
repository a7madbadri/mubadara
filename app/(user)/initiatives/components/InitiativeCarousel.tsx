"use client";

import Heading from "@/components/Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper/modules";

function InitiativeCarousel() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538",
      alt: "صورة 1",
      width: 600,
      height: 400,
    },
    {
      src: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b",
      alt: "صورة 2",
      width: 400,
      height: 600,
    }, // صورة عمودية
    {
      src: "https://images.unsplash.com/photo-1682687220067-d4a4b1ca189e",
      alt: "صورة 3",
      width: 800,
      height: 400,
    }, // صورة عريضة
    {
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      alt: "صورة 4",
      width: 500,
      height: 500,
    }, // صورة مربعة
    {
      src: "https://unsplash.com/photos/jetski-on-body-of-water-MA8YoAoKpfY",
      alt: "صورة 4",
      width: 500,
      height: 500,
    }, // صورة مربعة
  ];
  return (
    <section className="container mx-auto px-6 py-10">
      <Heading className="mb-3">معرض المبادرة</Heading>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            style={{ width: "auto", maxWidth: "85%" }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
          >
            <div className="relative h-75 sm:h-95 max-w-full flex items-center justify-center">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="h-full w-auto max-w-full object-contain sm:object-cover rounded-2xl"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default InitiativeCarousel;
