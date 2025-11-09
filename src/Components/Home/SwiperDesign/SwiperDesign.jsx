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
        className="mySwiper"
      >
        <SwiperSlide>
          <SwiperInfo image={banner_1} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo image={banner_2} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo image={banner_3} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperInfo image={banner_4} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperDesign;
