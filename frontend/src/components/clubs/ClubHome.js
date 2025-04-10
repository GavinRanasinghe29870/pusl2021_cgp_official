import React from "react";
import "../../App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ClubHome = () => {
  const FirstSlider = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const secondslider = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <div className="px-8">
        <Carousel
          showDots={false}
          responsive={FirstSlider}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          customTransition="all 1s ease-in-out"
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          <div class="w-full object-cover flex items-center mb-8">
            <img src="/back.png" className="w-full h-[600px] object-cover" />
          </div>
          <div>
            <img src="/sample.png" className="w-full  object-cover h-[600px]" />
          </div>
          <div>
            <img
              src="/basketball.png"
              className="w-full  object-cover h-[600px]"
            />
          </div>
        </Carousel>
        <Carousel
          showDots={false}
          responsive={secondslider}
          S
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          customTransition="all 1s ease-in-out"
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          <div class="w-full object-cover flex items-center">
            <img src="/pool.jpg" className="w-full h-80 object-cover" />
          </div>
          <div style={{ padding: "0 10px" }}>
            <img src="/beach.jpg" className="w-full  object-cover h-80" />
          </div>
          <div style={{ padding: "0 10px" }}>
            <img src="/rugby.png" className="w-full  object-cover h-80" />
          </div>
        </Carousel>
      </div>
      <div className="container">
        <div class="bg-primary py-10 px-10 mt-10 mx-7 pt-[47px] grid grid-cols-1 md:grid-cols-3 gap-7 m-auto relative mb-9">
          <div class="w-full h-40 bg-gray-300"></div>
          <div class="w-full h-40 bg-gray-300"></div>
          <div class="w-full h-40 bg-gray-300"></div>
          <div class="w-full h-40 bg-gray-300"></div>
          <div class="w-full h-40 bg-gray-300"></div>
          <div class="w-full h-40 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default ClubHome;
