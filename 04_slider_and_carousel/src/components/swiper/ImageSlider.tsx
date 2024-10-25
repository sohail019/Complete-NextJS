import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { imagesData } from "@/data/imagesData";


export default function ImageSlider() {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          loop
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1040: { slidesPerView: 3 },
          }}
          className=" rounded-lg p-4"
        >
          {imagesData.map((image, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={500}
                className="rounded-lg shadow-lg object-cover"
                quality={90}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}