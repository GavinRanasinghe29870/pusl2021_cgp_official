import React from 'react'
import { Link } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineShoppingBag, MdMenu } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);

    return (
        <nav className='sticky top-0 z-50 shadow-lg'>
            <div className='hidden md:flex mb-1 px-6 bg-primary-light py-1 justify-end gap-6 rounded-b-2xl text-xs xl:text-base'>
                <div>
                    <p>info@sportnest.com | 011-123-4567</p>
                </div>
                <div>
                    <a href='#'>Help Center</a>
                </div>
            </div>
            <div className='bg-primary-light'>
                <div className='container flex justify-between items-center'>
                    {/* Mobile Hamburger Menu Section */}
                    <div className='md:hidden' onClick={() => setOpen(!open)}>
                        <MdMenu className='text-3xl' />
                    </div>
                    {/* Logo Section */}
                    <div className='text-1xl xl:text-2xl flex items-center gap-2 font-bold py-4'>
                        <a href='#' className='text-primary logo-txt'><span className='underline'>SPORT</span><span className='parallelogram-bg'>NEST</span></a>
                    </div>
                    {/* Menu Section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-2 lg:gap-5 xl:gap-8'>
                            <li>
                                <a href='#' className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Home</a>
                            </li>
                            <li>
                                <a href='#' className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Club Center</a>
                            </li>
                            <li>
                                <a href='#' className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Friend Zone</a>
                            </li>
                            <li>
                                <a href='#' className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>About Us</a>
                            </li>
                            <li>
                                <a href='#' className='nav-line font-body text-sm xl:text-base py-1 px-1 text-gray-700 hover:text-primary font-semibold flex items-center'><MdOutlineShoppingBag className='text-xl font-body' />Shop</a>
                            </li>
                        </ul>
                    </div>
                    {/* Icon Section */}
                    <div className='flex items-center gap-1 lg:gap-3'>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2' onClick={() => setSearchOpen(!searchOpen)}>
                            <LuSearch className='text-xl xl:text-2xl' />
                        </button>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                            <IoNotifications className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                            <FaShoppingCart className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                            <FiUser className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                    </div>
                </div>
                {searchOpen && (
                    <div className='absolute top-16 md:top-24 xl:top-28 w-[90%] md:w-[80%] lg:w-[65%] xl:w-[60%] left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-full'>
                        <div className='container mx-auto py-1 md:py-2 lg:py-3 text-black flex items-center'>
                            <LuSearch className='text-3xl mr-5' />
                            <input placeholder='Search...' className='w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl' />
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2' onClick={() => setSearchOpen(!searchOpen)}>
                                <IoClose className='text-3xl' />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar