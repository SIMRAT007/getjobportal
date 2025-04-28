import React from "react";
import TestimonialsData from "../../data/TestimonialsData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS

const Testimonials = () => {
  const setting = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="py-0 mb-10 max-md:mb-[-40px] mt-20 max-sm:mt-0">
      <div className="container">

        {/* Testimonials Cards */}
        <div>
          <Slider {...setting}>
            {TestimonialsData.map((data) => (
              <div key={data.id} className="my-2">
                <div className="flex flex-col gap-0 p-4 shadow-lg mx-4 rounded-3xl bg-[#173a96]">
                  {/* upper section */}
                  <div className="flex justify-start items-center gap-2">
                    <div>
                    <p className="text-xl text-white">{data.text}</p>
                    </div>
                  </div>
                  {/* bottom section */}
                  <div className=" py-4 space-y-2">
                  <p className="text-xl  text-gray-400">
                        {data.name}
                      </p>
                      <span className="text-yellow-400">{data.stars}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;