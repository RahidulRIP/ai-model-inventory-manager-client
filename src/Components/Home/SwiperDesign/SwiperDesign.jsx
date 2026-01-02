import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner_1 from "../../../assets/Banner_1.jpeg";
import banner_2 from "../../../assets/Banner_2.jpeg";
import banner_3 from "../../../assets/Banner_3.jpeg";

import SwiperInfo from "./SwiperInfo";

const bannerData = [
  {
    id: 1,
    img: banner_1,
    title: "Explore the Power — of AI Innovation",
    subtitle:
      "Transform your visionary ideas into production-ready intelligence.",
  },
  {
    id: 2,
    img: banner_2,
    title: "Accelerate Your — AI Journey",
    subtitle: "Access cutting-edge neural networks designed for scalability.",
  },
  {
    id: 3,
    img: banner_3,
    title: "Build Faster. — Scale Smarter.",
    subtitle: "Eliminate infrastructure bottlenecks and focus on innovation.",
  },
];

const SwiperDesign = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative mx-auto mt-4 px-2 sm:px-4">
      <div className="relative overflow-hidden rounded-3xl md:rounded-[48px] shadow-2xl border border-white/5">
        <div className="absolute bottom-10 right-10 z-30 hidden lg:flex gap-4">
          <button
            ref={prevRef}
            className="w-14 h-14 rounded-2xl bg-black/20 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            ←
          </button>
          <button
            ref={nextRef}
            className="w-14 h-14 rounded-2xl bg-black/20 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            →
          </button>
        </div>

        <Swiper
          loop
          effect="fade"
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} custom-bullet"></span>`,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          className="h-[550px] sm:h-[600px] lg:h-[75vh] min-h-[500px] max-h-[800px]"
        >
          {bannerData.map((slide) => (
            <SwiperSlide key={slide.id} className="bg-slate-950">
              {({ isActive }) => (
                <SwiperInfo
                  image={slide.img}
                  title={slide.title}
                  subtitle={slide.subtitle}
                  isActive={isActive}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperDesign;
