import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { testimonialsData } from "@/data/testimonialsData";
import { imagesData } from "@/data/imagesData";
export default function BasicSwiper() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="testimonial-swiper"
      >
        {testimonialsData.map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center py-4">
              <p>{testimonial.quote}</p>
              <p className="mt-4 text-md text-gray-500">
                - {testimonial.title}
              </p>
              <p className="text-2xl mb-3">{testimonial.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
