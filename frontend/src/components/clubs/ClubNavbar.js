import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineClose } from "react-icons/ai";
import { IoChatbubble } from "react-icons/io5";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useClubAuthStore } from '../../store/useClubAuthStore';
import NotificationBell from '../common/NotificationBell';
const logo = '/logo.png';

const ClubNavbar = () => {
    const { club, logout } = useClubAuthStore();
    const navigate = useNavigate();
    const [animationParent] = useAutoAnimate();
    const [isSideMenuOpen, setSideMenue] = useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const profileDropdownRef = useRef(null);
    const backendURL = 'http://localhost:5000';

    function openSideMenu() {
        setSideMenue(true);
    }

    function closeSideMenu() {
        setSideMenue(false);
    }

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
                    <a href='#'>Help Center</a>
                </div>
            </div>
            <div className='bg-primary-light'>
                <div className='container flex justify-between items-center' ref={animationParent}>
                    {/* Mobile Hamburger Menu Section */}
                    <FiMenu onClick={openSideMenu} className='md:hidden text-3xl cursor-pointer' />
                    {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}
                    {/* Logo Section */}
                    <NavLink to="/club/home">
                        <img src={logo} alt="SportNest" className='w-20 p-2 md:p-0' />
                    </NavLink>
                    {/* Menu Section */}
                    <div className='hidden md:block'>
                        <ul className='flex items-center gap-2 lg:gap-5 xl:gap-12 py-4'>
                            <li>
                                <NavLink to="/club/home" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/adpost" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Ad Post</NavLink>
                            </li>
                            <li>
                                <NavLink to="/RequestMember" className='nav-line font-body text-sm xl:text-base inline-block py-1 px-1 text-gray-700 hover:text-primary font-semibold' activeClassName="active">Requested Members</NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Icon Section */}
                    <div className='flex items-center gap-1 lg:gap-3'>
                        <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2' onClick={() => setSearchOpen(!searchOpen)}>
                            <LuSearch className='text-xl xl:text-2xl' />
                        </button>

                        <NotificationBell />

                        <NavLink to="/club/chat">
                            <button className='hover:bg-opacity-15 hover:bg-primary rounded-full p-2'>
                                <IoChatbubble className='text-xl xl:text-2xl text-gray-700 hover:text-primary duration-200' />
                            </button>
                        </NavLink>
                        {club ? (
                            <div className='relative'>
                                <div
                                    className='gap-2 flex items-center hover:bg-opacity-15 hover:bg-primary rounded-full p-2'
                                    onClick={toggleDropdown}
                                >
                                    <div className="size-6 xl:size-8 rounded-full relative">
                                        <img src={club.profilePhoto ? `${backendURL}${club.profilePhoto}` : '/defaultProfilePic.jpg'} alt={club.ClubName} className='rounded-full' />
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
                                                <img src={club.profilePhoto ? `${backendURL}${club.profilePhoto}` : '/defaultProfilePic.jpg'} alt={club.ClubName} className='rounded-full' />
                                            </div>
                                            <div>Welcome, {club.ClubName}</div>
                                        </div>
                                        <div className='py-4'>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                                onClick={() => {
                                                    if (club?._id) {
                                                        navigate(`/club/${club._id}`);
                                                    }
                                                }}

                                            >
                                                Profile
                                            </button>
                                            <button
                                                className='w-full text-left px-6 py-3 text-sm text-gray-700 hover:text-primary font-semibold hover:bg-primary-light'
                                                onClick={logout}
                                            >
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
                        <NavLink to="/club/home" className='mobile-nav' activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/adpost" className='mobile-nav' activeClassName="active">Ad Post</NavLink>
                    </li>
                    <li>
                        <NavLink to="/RequestMember" className='mobile-nav' activeClassName="active">Reegisted Members</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ClubNavbar