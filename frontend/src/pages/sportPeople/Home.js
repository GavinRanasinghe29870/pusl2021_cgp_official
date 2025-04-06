import React from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = (props) => {
  const categories = [
    { name: 'Cricket', path: 'cricket', image: '/Cricket.png' },
    { name: 'Badminton', path: 'badminton', image: '/Badminton.jpg' },
    { name: 'Vollyball', path: 'vollyball', image: '/Vollyball.jpg' },
    { name: 'Basket Ball', path: 'basketball', image: '/basketball.jpeg' },
    { name: 'Table Tennis', path: 'tabletennis', image: '/tabletennis.jpg' },
    { name: 'Tennis', path: 'tennis', image: '/Tennis.jpg' },
    { name: 'Football', path: 'football', image: '/football.jpg' },
    { name: 'Chess', path: 'chess', image: '/chess.jpg' },
    { name: 'NetBall', path: 'netball', image: '/netBall.jpg' },
    { name: 'Swimming', path: 'swimming', image: '/swimming.jpeg' },
  ]

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

  const addslider = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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
      {/* Banner Section */}
      <div className='pb-14'>
        <div className='relative'>
          <img src='/Site Banner.jpg' alt='home' className='w-full object-cover h-screen bg-blend-darken brightness-50' />
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white px-4'>
            <h1 className='font-header text-header-01 font-bold'>Join Us and You’ll Never Have to Play Alone.</h1>
            <p className='mt-4 pb-[25px] text-center font-header text-header-04 font-bold w-[80%] xl:w-[50%] '>Bring your community together with the ultimate all-in-one sports web application. Connect, socialize, and access a variety of sports facilities-all in one place. Trusted by 500+ sports clubs in Sri Lanka.</p>
            <button className='btn'>About</button>
          </div>
        </div>
      </div>

      {/* Shop Item Slider */}
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

      {/* Categories Section */}
      <div>
        <h4 className='text-center font-header text-header-02 font-bold pt-[3.5rem]'>Sports <span className='text-primary'>Categories</span></h4>
        <div className='container category__grid place-items-center'>
          {
            categories.map(category => (
              <div>
                <Link to={`/categories/${category.path}`} className='category__card'>
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => console.log('hover started!')}
                    key={category.name}

                    src={category.image} alt={category.name} />
                  <h4 className='font-body font-bold'>{category.name}</h4>
                </Link>
              </div>
            ))
          }
        </div>
      </div>

      {/* Ad Slider */}
      <div className='pt-[4.5rem] pb-[2.5rem]'>
        <h4 className='text-center font-header text-header-02 font-bold'>Latest <span className='text-primary'>News & Events</span></h4>
        <h6 className='text-center font-body'>See the lates news,events and happenings at clubs</h6>
      </div>
      <div className='container'>
        <Carousel
          showDots={false}
          responsive={addslider}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          customTransition="all 1s ease-in-out"
          transitionDuration={2000}
          containerClass="carousel-container"
        >
          <div style={{ padding: '0 10px' }}><img src='/Cricket.png' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
          <div style={{ padding: '0 10px' }}><img src='/swimming.jpeg' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
          <div style={{ padding: '0 10px' }}><img src='/netBall.jpg' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
          <div style={{ padding: '0 10px' }}><img src='/chess.jpg' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
          <div style={{ padding: '0 10px' }}><img src='/football.jpg' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
          <div style={{ padding: '0 10px' }}><img src='/Tennis.jpg' className='w-full h-44 md:h-60 lg:h-64 xl:h-72 2xl:h-96 object-cover carousel-image' /></div>
        </Carousel>
      </div>

      {/* About Sports */}
      <div className='pb-[150px] pt-[7rem]'>
        <div className='bg-[#fafcff] rounded-md shadow-lg'>
          <div className='pt-[4.5rem] pb-[2.5rem]'>
            <h4 className='text-center font-header text-header-02 font-bold'>About <span className='text-primary'>Sports</span></h4>
            <h6 className='text-center font-body'>Learn more about the sports you love</h6>
          </div>
          <div className='container mt-0 lg:mt-[-5.5rem]'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 justify-center items-center">
              <div>
                <img src='/About Sports.png' className='w-full h-[100%] md:h-[40rem] object-cover' />
              </div>
              <div >
                <p className='font-body font-bold text-gray-600'>
                  "Sports bring us together, fostering a sense of community, dedication, and personal growth. Whether you're an athlete, a fan, or just looking to get active, sports offer a path to achieving both personal wellness and shared goals. From building lifelong friendships to pushing your limits, sports embody resilience, teamwork, and passion. Join us to explore a world of sports, connect with like-minded individuals, and discover the joy of movement, competition, and camaraderie. Let’s make every moment count in the game of life."
                  <br></br>
                  <br></br>
                  This gives users a sense of purpose and motivation, inspiring them to engage with the sports community through the app. Let me know if you'd like any adjustments to fit the tone or style of your web app!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home