import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Navbar = () => {
    const [animationParent] = useAutoAnimate();
    const [isSideMenuOpen, setSideMenue] = useState(false);
    function openSideMenu() {
        setSideMenue(true);
    }
    function closeSideMenu() {
        setSideMenue(false);
    }
    const [searchOpen, setSearchOpen] = React.useState(false);

    return (
        <nav className='sticky top-0 z-50 shadow-md'>
            <div className='hidden md:flex mb-1 px-6 bg-primary-light py-1 justify-end gap-6 rounded-b-2xl text-xs xl:text-base'>
                <div>
                    <p>info@sportnest.com | 011-123-4567</p>
                </div>
                <div>
                    <a href='#'>Help Center</a>
                </div>
            </div>
            <div className='bg-primary-light'>
                <div className='container flex justify-between items-center' ref={animationParent}>
                    {/* Mobile Hamburger Menu Section */}
                    <FiMenu onClick={openSideMenu} className='md:hidden text-3xl cursor-pointer' />
                    {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
                    {/* Logo Section */}
                    <Link to="/">
                        <div className='text-1xl xl:text-2xl flex items-center gap-2 font-bold py-4'>
                            <a href='#' className='text-primary logo-txt'><span className='underline'>SPORT</span><span className='parallelogram-bg'>NEST</span></a>
                        </div>
                    </Link>
                    {/* Menu Section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-2 lg:gap-5 xl:gap-8'>
                            <li>
                                <Link to="/" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Home</Link>
                            </li>
                            <li className="relative group">
                                <a className="relative cursor-pointer flex items-center gap-2 font-body text-sm xl:text-base py-2 px-3 text-gray-700 group-hover:text-primary font-semibold">
                                    Club Center <IoIosArrowUp className="text-xl rotate-180 transition-all group-hover:rotate-0" />
                                </a>
                                <div className="absolute top-full left-0 hidden w-44 xl:w-64 flex-col rounded-xl bg-white py-4 shadow-lg transition-all group-hover:flex">
                                    <Link to="" className="flex items-center font-body text-sm xl:text-base gap-3 px-5 py-3 text-gray-700 hover:text-primary hover:bg-primary-light font-semibold">
                                        Registered Clubs
                                    </Link>
                                    <Link to="/club/chat" className="flex items-center font-body text-sm xl:text-base gap-3 px-5 py-3 text-gray-700 hover:text-primary font-semibold hover:bg-primary-light">
                                        Club Chat
                                    </Link>
                                </div>
                            </li>

                            <li>
                                <Link to="" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Friend Zone</Link>
                            </li>
                            <li>
                                <Link to="" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>About Us</Link>
                            </li>
                            <li>
                                <Link to="/shop" className='nav-line font-body text-sm xl:text-base py-1 px-1 text-gray-700 hover:text-primary font-semibold flex items-center'><MdOutlineShoppingBag className='text-xl font-body' />Shop</Link>
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
                        <Link to="">
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                <FaShoppingCart className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                            </button>
                        </Link>
                        <Link to="/Signin">
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                <FiUser className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='relative flex justify-center'>
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.div
                                className='absolute top-6 w-[90%] md:w-[80%] lg:w-[65%] xl:w-[60%] bg-white shadow-xl rounded-full'
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className='container mx-auto py-1 md:py-2 lg:py-3 text-black flex items-center'>
                                    <LuSearch className='text-3xl mr-5' />
                                    <input placeholder='Search...' className='w-full text-grey-800 transition focus:outline-none focus:border-transparent p-2 appearance-none leading-normal text-xl lg:text-2xl' />
                                    <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2' onClick={() => setSearchOpen(!searchOpen)}>
                                        <IoClose className='text-3xl' />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    )
}

function MobileNav({ closeSideMenu }) {
    const [animationParent] = useAutoAnimate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className='fixed left-0 top-0 flex h-full min-h-screen w-full justify-start bg-black/60 md:hidden'>
            <div className='h-full w-[75%] bg-primary-light px-4 py-4'>
                <section className='flex justify-start'>
                    <AiOutlineClose onClick={closeSideMenu} className='text-3xl cursor-pointer' />
                </section>
                {/* Menu Section */}
                <ul className='flex flex-col gap-7 pt-16 pl-7'>
                    <li>
                        <a href='#' className='font-body text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Home</a>
                    </li>
                    <li className='relative group' ref={animationParent}>
                        <a onClick={toggleDropdown} className='relative flex items-center gap-2 font-body text-base py-1 px-1 text-gray-700 group-hover:text-primary font-semibold cursor-pointer'>
                            Club Center <IoIosArrowUp className={`text-xl transition-transform ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
                        </a>
                        <div className={`right-0 top-10 flex-col gap-4 px-5 transition-all ${isDropdownOpen ? 'flex' : 'hidden'}`}>
                            <a href='#' className='font-body text-base inline-block pt-5 pb-3 px-3 text-gray-700 hover:text-primary font-semibold'>Registered Clubs</a>
                            <a href='#' className='font-body text-base inline-block px-3 text-gray-700 hover:text-primary font-semibold'>Club Chat</a>
                        </div>
                    </li>
                    <li>
                        <a href='#' className='font-body text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Friend Zone</a>
                    </li>
                    <li>
                        <a href='#' className='font-body text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>About Us</a>
                    </li>
                    <li>
                        <a href='#' className='font-body text-base py-1 px-1 text-gray-700 hover:text-primary font-semibold flex items-center'><MdOutlineShoppingBag className='text-xl font-body' />Shop</a>
                    </li>
                    <li>
                        <a href='#' className='font-body text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold'>Help Center</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar