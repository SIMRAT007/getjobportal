import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
  import Autoplay from "embla-carousel-autoplay";
  import companies from "../../data/companies.json";

const Companies = () => {
  return (
     <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full pt-5 pb-5 max-sm:pt-5 max-sm:pb-5 bg-[#173a96] mt-10 md:mt-20"
          >
            <CarouselContent className="flex gap-5 sm:gap-20 items-center py-12 max-sm:py-2">
              {companies.map(({ name, id, path }) => (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-12 object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
  )
}

export default Companies
