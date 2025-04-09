import React from "react";
import "../../App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const AdminHome = () => {
  const adminhomeslider = {
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
  return (
    <div>
      <div className="container">
        {/* Admin Home Slider */}
        <div className="px-8">
          <Carousel
            showDots={false}
            responsive={adminhomeslider}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            customTransition="all 1s ease-in-out"
            transitionDuration={2000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            <div class="w-full object-cover flex items-center">
              <img src="/back.png" className="w-full h-[600px] object-cover" />
            </div>
            <div>
              <img
                src="/sample.png"
                className="w-full  object-cover h-[600px]"
              />
            </div>
            <div>
              <img
                src="/basketball.png"
                className="w-full  object-cover h-[600px]"
              />
            </div>
          </Carousel>
        </div>
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

export default AdminHome;
