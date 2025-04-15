import React from "react";
import "../../App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import ShopSlider from "../../components/common/ShopSlider";

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

  const categories = [
    { name: 'Post Your Advertisement', path: '/adpost', image: '/postads.png' },
    { name: 'Requested Members', path: '/RequestMember', image: '/requestmember.png' },
    { name: 'Club Portfolio', path: '/ClubPortfolio', image: '/clubportfolio.png' },
  ]

  return (
    <div>
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
      
      <ShopSlider />

      <div className="container py-10">
        <div className='bg-primary-light py-16 container flex justify-around place-items-center'>
          {
            categories.map(category => (
              <div>
                <Link to={`${category.path}`} className="flex flex-col items-center">
                  <div className="size-40 border-secondary border-8 bg-white rounded-2xl p-5 hover:scale-105 hover:border-primary-dark transition-transform duration-300">
                    <img
                      key={category.name}
                      src={category.image}
                      alt={category.name}
                      className="border-secondary"
                    />
                  </div>
                  <h4 className='font-body text-black pt-6 text-xl font-bold'>{category.name}</h4>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default ClubHome;
