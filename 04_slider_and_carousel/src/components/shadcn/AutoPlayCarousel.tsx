"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { testimonialsData } from "@/data/testimonialsData";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function AutoplayCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {testimonialsData.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex rounded-lg border-2 border-red-500 aspect-square items-center justify-center p-6">
                  <div className="text-center py-4">
                    <p>{testimonial.quote}</p>
                    <p className="mt-4 text-md text-gray-500">
                      - {testimonial.title}
                    </p>
                    <p className="text-2xl mb-3">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
