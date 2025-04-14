import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ShopSlider = () => {
    const shopitemslider = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <div>
            <div className='px-4 lg:px-8'>
                <Carousel
                    showDots={false}
                    responsive={shopitemslider}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    customTransition="all 1s ease-in-out"
                    transitionDuration={2000}
                    containerClass="carousel-container"
                >
                    <div style={{ padding: '0 10px' }}><img src='/Cricket.png' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                    <div style={{ padding: '0 10px' }}><img src='/swimming.jpeg' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                    <div style={{ padding: '0 10px' }}><img src='/netBall.jpg' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                    <div style={{ padding: '0 10px' }}><img src='/chess.jpg' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                    <div style={{ padding: '0 10px' }}><img src='/football.jpg' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                    <div style={{ padding: '0 10px' }}><img src='/Tennis.jpg' className='w-full h-36 sm:h-48 md:h-56 lg:h-56 xl:h-60 2xl:h-80 object-cover carousel-image' /></div>
                </Carousel>
            </div>
        </div>
    )
}

export default ShopSlider