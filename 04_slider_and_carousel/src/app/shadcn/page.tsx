
import React from 'react'
import { AutoplayCarousel } from '@/components/shadcn/AutoPlayCarousel';
import { BasicCarousel } from '@/components/shadcn/BasicCarousel';

export default function Shadcn() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl ">
          ShadCN
        </h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 ">
          Digital Salt Task
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <BasicCarousel />
        </div>
        <h1 className='text-3xl'>Autoplay Carousel</h1>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <AutoplayCarousel />
        </div>
      </div>
    </section>
  );
}
