// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import banner_1 from "../../../assets/Banner_1.jpeg";
import banner_2 from "../../../assets/Banner_2.jpeg";
import banner_3 from "../../../assets/Banner_3.jpeg";
import banner_4 from "../../../assets/Banner_4.jpeg";
import banner_5 from "../../../assets/Banner_5.jpeg";
import banner_6 from "../../../assets/Banner_6.jpeg";

import SwiperInfo from "./SwiperInfo";

const SwiperDesign = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper rounded-sm"
      >
        <SwiperSlide>
          <SwiperInfo
            image={banner_1}
            title="Explore the Power of AI — Transform Ideas Into Innovation"
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo
            image={banner_2}
            title={"Accelerate Your AI Journey with Cutting-Edge Models"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo
            image={banner_3}
            title={"Build Faster. Scale Smarter. Innovate Without Limits"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo
            image={banner_4}
            title={"Your All-in-One Platform for Intelligent Solutions"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo
            image={banner_5}
            title={"Empowering Developers to Create the Future"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo
            image={banner_6}
            title={"xperience the Future — One Model at a Time"}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperDesign;
