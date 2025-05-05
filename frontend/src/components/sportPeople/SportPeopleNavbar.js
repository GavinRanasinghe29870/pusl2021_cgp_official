import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { IoChatbubble } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiMenu, FiUser } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose, IoLogOut } from "react-icons/io5";
import { FaUserFriends, FaRegBuilding } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from "react-icons/ai";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useAuthStore } from '../../store/useAuthStore';
import NotificationBell from '../common/NotificationBell';
// import { useClubAuthStore } from '../../store/useClubAuthStore';
const logo = '/logo.png';

const SportPeopleNavbar = () => {
    const { user, logout } = useAuthStore();
    // const { club } = useClubAuthStore();
    const navigate = useNavigate();
    const [animationParent] = useAutoAnimate();
    const [isSideMenuOpen, setSideMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const profileDropdownRef = useRef(null);

    const backendURL = 'http://localhost:5000';

    const openSideMenu = () => {
        setSideMenu(true);
    };

    const closeSideMenu = () => {
        setSideMenu(false);
    };

    const toggleDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (profileDropdownRef.current &&
                    !profileDropdownRef.current.contains(event.target))
            ) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='sticky top-0 z-50 shadow-md'>
            <div className='hidden md:flex mb-1 px-6 bg-primary-light py-1 justify-end gap-6 rounded-b-2xl text-xs xl:text-base'>
                <div>
                    <p>info@sportnest.com | 011-123-4567</p>
                </div>
                <div>
                    <a href='http://localhost:3000/helpcenter'>Help Center</a>
                </div>
            </div>
            <div className='bg-primary-light'>
                <div className='px-3 lg:container flex justify-between items-center' ref={animationParent}>
                    {/* Mobile Hamburger Menu Section */}
                    <FiMenu onClick={openSideMenu} className='md:hidden text-3xl cursor-pointer' />
                    {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
                    {/* Logo Section */}
                    <NavLink to="/">
                        <img src={logo} alt="SportNest" className='w-20 p-2 md:p-0' />
                    </NavLink>
                    {/* Menu Section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-2 lg:gap-5 xl:gap-8 py-4'>
                            <li>
                                <NavLink to="/" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/aa" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Club Center</NavLink>
                            </li>
                            <li>
                                <NavLink to="/aa" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Friend Zone</NavLink>
                            </li>
                            <li>
                                <NavLink to="/aboutus" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/shop" className='nav-line font-body text-sm xl:text-base py-1 px-1 text-gray-700 hover:text-primary font-semibold flex items-center' activeClassName="active"><MdOutlineShoppingBag className='text-xl font-body' />Shop</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Icon Section */}
                    <div className='flex items-center gap-1 lg:gap-3'>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2' onClick={() => setSearchOpen(!searchOpen)}>
                            <LuSearch className='text-xl xl:text-2xl' />
                        </button>

                        <NotificationBell />

                        <NavLink to="/chat">
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                <IoChatbubble className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                            </button>
                        </NavLink>
                        <NavLink to="/cart">
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                <FaShoppingCart className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                            </button>
                        </NavLink>
                        {user ? (
                            <div className='relative'>
                                <div
                                    className='gap-2 flex items-center hover:bg-opacity-15 hover:bg-primary rounded-full p-2'
                                    onClick={toggleDropdown}
                                >
                                    <div className="size-6 xl:size-8 rounded-full relative">
                                        <img src={user.profilePhoto ? `${backendURL}${user.profilePhoto}` : '/defaultProfilePic.jpg'} alt={user.firstName} className='rounded-full' />
                                    </div>
                                    <IoIosArrowUp
                                        className={`text-md xl:text-xl transition-transform duration-200 ${profileDropdownOpen ? 'rotate-0' : 'rotate-180'
                                            }`}
                                    />
                                </div>
                                {profileDropdownOpen && (
                                    <div
                                        className='absolute right-0 mt-2 bg-white shadow-lg rounded-b-xl'
                                        ref={profileDropdownRef}
                                    >
                                        <div className='flex flex-col items-center w-60 gap-3 px-6 py-4 text-sm text-gray-700 font-semibold border-b'>
                                            <div className="size-12 xl:size-16 rounded-full relative">
                                                <img src={user.profilePhoto ? `${backendURL}${user.profilePhoto}` : '/defaultProfilePic.jpg'} alt={user.firstName} className='rounded-full' />
                                            </div>
                                            <div>{user.username}</div>
                                        </div>
                                        <div className='py-4'>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                            >
                                                <FaRegBuilding className='text-2xl inline-block mr-3' />
                                                Registered Clubs
                                            </button>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                            >
                                                <FaUserFriends className='text-2xl inline-block mr-3' />
                                                Friends
                                            </button>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                                onClick={() => {
                                                    if (user?._id) {
                                                        navigate(`/profile/${user._id}`);
                                                    }
                                                }}

                                            >
                                                <CgProfile className='text-2xl inline-block mr-3' />
                                                Profile
                                            </button>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                                onClick={logout}
                                            >
                                                <IoLogOut className='text-2xl inline-block mr-3' />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/Signin">
                                <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                    <FiUser className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                                </button>
                            </NavLink>
                        )}
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
                        <NavLink to="/" className='mobile-nav' activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="" className='mobile-nav' activeClassName="active">Club Center</NavLink>
                    </li>
                    <li>
                        <NavLink to="/friend-zone" className='mobile-nav' activeClassName="active">Friend Zone</NavLink>
                    </li>
                    <li>
                        <NavLink to="/aboutus" className='mobile-nav' activeClassName="active">About Us</NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop" className='mobile-nav flex items-center' activeClassName="active"><MdOutlineShoppingBag className='text-xl font-body' />Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/help-center" className='font-body text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Help Center</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SportPeopleNavbar;