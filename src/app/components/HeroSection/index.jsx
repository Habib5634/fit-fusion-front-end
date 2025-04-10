"use client";
import React from "react";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const slides = [
    {
      id: 1,
      bgClass: "bg-herobg",
      quote:
        "Exercise is a celebration of what your body can do. Not a punishment for what you ate.",
    },
    {
      id: 2,
      bgClass: "bg-herobg2",
      quote:
        "Healthy eating is a way of life, so it’s important to establish habits that are simple, realistic, and sustainable.",
    },
    {
      id: 3,
      bgClass: "bg-herobg3",
      quote:
        "Take care of your body. It’s the only place you have to live.",
    },
    {
      id: 4,
      bgClass: "bg-herobg4",
      quote:
        "Health is not just about what you’re eating. It’s also about what you’re thinking and saying.",
    },
    {
      id: 5,
      bgClass: "bg-herobg5",
      quote:
        "It never gets easier; you just get stronger.",
    },
    {
      id: 6,
      bgClass: "bg-herobg6",
      quote:
        "Let food be thy medicine and medicine be thy food.",
    },
  ];

  return (
    <div className="h-screen overflow-x-hidden relative -mt-[83px]">
      <div className="absolute inset-0 z-0 bg-black/40"></div>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${slide.bgClass} bg-center bg-no-repeat bg-cover h-screen`}
          >
            <div
              id="home"
              data-aos="fade-up"
              data-aos-duration="1000"
              className="relative w-full h-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10 xl:px-20 2xl:px-10"
            >
              <div className="h-full flex flex-col justify-center items-center mt-16">
                <h2 className="text-yellow text-[15px] lg:text-[25px] bg-black/60 px-6 max-w-6xl  py-2 rounded-xl font-bold text-start text-wrap  pb-2.5">
                  {slide.quote}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
