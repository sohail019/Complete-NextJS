"use client"
import BasicSwiper from '@/components/swiper/BasicSwiper'
import ImageSlider from '@/components/swiper/ImageSlider';

export default function Swiper() {
  return (
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ">
            Swiper JS
          </h1>
          <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 ">
            Digital Salt Task
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <BasicSwiper />
          </div>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <ImageSlider />
          </div>
        </div>
      </section>
  );
}
