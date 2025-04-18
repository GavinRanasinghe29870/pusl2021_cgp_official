import React from "react";
import "../../App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const AdminHome = (props) => {
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

  const categories = [
    { name: 'Product Manage', path: '/admin/productManaging', image: '/productmanage.png' },
    { name: 'Sales Manage', path: '/salesManage', image: '/salesmanage.png' },
    { name: 'Club Requests', path: '/ClubApprovingPage1', image: '/clubapprove.png' },
  ]

  return (
    <div className="">
      <Carousel
        showDots={false}
        responsive={adminhomeslider}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        customTransition="all 1s ease-in-out"
        transitionDuration={2000}
        containerClass="carousel-container relative z-10"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        <div class="w-full object-cover flex items-center">
          <img
            src="/back.png"
            className="w-full h-[550px] object-cover"
          />
        </div>
        <div>
          <img
            src="/sample.png"
            className="w-full  object-cover h-[550px]"
          />
        </div>
        <div>
          <img
            src="/basketball.png"
            className="w-full  object-cover h-[550px]"
          />
        </div>
      </Carousel>
      {/* Categories */}
      <div className="container py-10">
        <div className='bg-primary py-16 container flex justify-around place-items-center'>
          {
            categories.map(category => (
              <div>
                <Link to={`${category.path}`} className="flex flex-col items-center">
                  <div className="size-40 border-white border-8 bg-white rounded-2xl p-5 hover:scale-105 hover:border-primary-dark transition-transform duration-300">
                    <img
                      key={category.name}
                      src={category.image}
                      alt={category.name}
                    />
                  </div>
                  <h4 className='font-body text-white pt-6 text-xl font-bold'>{category.name}</h4>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
