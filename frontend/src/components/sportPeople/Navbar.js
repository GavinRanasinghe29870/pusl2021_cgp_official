import React from 'react'
import { Link } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    const [open, setOpen] = React.useState(false);
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
                        <ul className='flex items-center gap-2'>
                            <li>
                                <a href='#' className='font-body text-sm xl:text-base inline-block py-1 px-1 xl:px-3 text-gray-700 hover:text-primary font-semibold'>Home</a>
                            </li>
                            <li>
                                <a href='#' className='font-body text-sm xl:text-base inline-block py-1 px-1 xl:px-3 text-gray-700 hover:text-primary font-semibold'>Club Center</a>
                            </li>
                            <li>
                                <a href='#' className='font-body text-sm xl:text-base inline-block py-1 px-1 xl:px-3 text-gray-700 hover:text-primary font-semibold'>Friend Zone</a>
                            </li>
                            <li>
                                <a href='#' className='font-body text-sm xl:text-base inline-block py-1 px-1 xl:px-3 text-gray-700 hover:text-primary font-semibold'>About Us</a>
                            </li>
                            <li>
                                <a href='#' className='font-body text-sm xl:text-base py-1 px-1 xl:px-3 text-gray-700 hover:text-primary font-semibold flex items-center'><MdOutlineShoppingBag className='text-xl font-body' />Shop</a>
                            </li>
                        </ul>
                    </div>
                    {/* Icon Section */}
                    <div className='flex items-center gap-3 lg:gap-6'>
                        <button>
                            <LuSearch className='text-xl xl:text-2xl' />
                        </button>
                        <button>
                            <IoNotifications className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                        <button>
                            <FaShoppingCart className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                        <button>
                            <FiUser className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar