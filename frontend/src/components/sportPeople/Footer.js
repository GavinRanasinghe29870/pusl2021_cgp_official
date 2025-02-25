import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="bg-primary-light text-gray-700 py-12 md:py-24">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 xl:gap-0">
        <div className='col-span-12 lg:col-span-3 xl:col-span-3 content-center'>
          <div className='text-xl lg:text-3xl flex gap-2 font-bold py-4'>
            <a href='#' className='text-primary logo-txt'><span className='underline'>SPORT</span><span className='parallelogram-bg'>NEST</span></a>
          </div>
          <p className="mt-4 font-body">011-123-4567</p>
          <p className='font-body'>info@sportnest.com</p>
        </div>

        <div className='col-span-6 lg:col-span-3 xl:col-span-2'>
          <h3 className="font-bold text-primary">SITEMAP</h3>
          <ul className="mt-4 space-y-1">
            <li><a href="#" className="font-body hover:text-primary hover:underline">Home</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Registered Clubs</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Club Chat</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Friend Zone</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Shop</a></li>
          </ul>
        </div>

        <div className='col-span-6 lg:col-span-3 xl:col-span-2'>
          <h3 className="font-bold font-body text-primary">Information</h3>
          <ul className="mt-4 space-y-1">
            <li><a href="#" className="font-body hover:text-primary hover:underline">FAQ</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Blog</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Help Center</a></li>
          </ul>
        </div>

        <div className='col-span-6 lg:col-span-3 xl:col-span-2'>
          <h3 className="font-bold font-body text-primary">Company</h3>
          <ul className="mt-4 space-y-1">
            <li><a href="#" className="font-body hover:text-primary hover:underline">About Us</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Careers</a></li>
            <li><a href="#" className="font-body hover:text-primary hover:underline">Contact Us</a></li>
          </ul>
        </div>

        <div className='col-span-12 xl:col-span-3'>
          <div className="grid grid-cols-1 grid-rows-2 bg-black bg-opacity-5 rounded-lg py-[45px] justify-items-center">
            <div>
              <h3 className="flex content-start font-bold font-body text-primary">
                Subscribe to our Newsletter
              </h3>
            </div>
            <div >
              <div className="flex justify-start ">
                <div className="bg-white rounded-md flex">
                  <input type="email" className="m-2 p-2 appearance-none font-body text-gray-700 text-sm focus:outline-none" placeholder="Get Product Updates" />
                  <button className="p-4 bg-primary rounded-r-md flex items-center justify-center">
                    <FaArrowRightLong className='text-white' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div>
        <hr className="container my-10 border-t-1 border-black border-opacity-5" />
      </div>

      <div className="container mx-auto mt-10 flex flex-col md:flex-row justify-between items-center font-body gap-5">
        <p>&copy; {today.getFullYear()} Sport Nest. All rights reserved</p>
        <p>A Product of <span className="font-bold">LOGO</span></p>
        <div className="flex space-x-4">
          <a href="#" className="text-primary border border-primary border-opacity-20 rounded-full p-2"><FaLinkedinIn /></a>
          <a href="#" className="text-primary border border-primary border-opacity-20 rounded-full p-2"><FaFacebookF /></a>
          <a href="#" className="text-primary border border-primary border-opacity-20 rounded-full p-2"><FaXTwitter /></a>
          <a href="#" className="text-primary border border-primary border-opacity-20 rounded-full p-2"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer