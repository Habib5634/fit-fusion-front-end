'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MdOutlineDashboard } from "react-icons/md";
import { SiSession } from "react-icons/si";
import { TbBrandBooking, TbReport, TbTournament } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { FaBars, FaBell, FaDollarSign, FaGift, FaUsers } from 'react-icons/fa';
import { LuClipboardList } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import SidebarDropdown from '@/app/components/SidebarDropdown';
import { fetchUserData } from '@/app/Store/Actions/userAction';
import { CiGlobe } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { clearAuth } from '@/app/Store/ReduxSlice/userSlice';
const DashboardLayout = ({ children, pageTitle }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, userData } = useSelector((state) => state.userData)
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    // Function to toggle sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const router = useRouter();




    // Function to toggle profile dropdown
    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen); // Close notifications dropdown if open
    };
    // Effect to handle screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window?.innerWidth < 768) {
                setSidebarOpen(false); // Close sidebar on small screens
            } else {
                setSidebarOpen(true); // Open sidebar on larger screens
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Cleanup event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch(clearAuth())
        localStorage.removeItem('token')
        router.push('/')
    }
    return (
        <div className="flex min-h-screen bg-gray ">
            {/* Sidebar */}
            <div
                className={` bg-blue  min-h-screen h-full text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-width duration-300 relative`}
                style={{
                    position: window.innerWidth < 768 ? 'absolute' : 'relative', // Absolute position on small screens
                    zIndex: 50, // Ensure sidebar is above other content
                    height: '100vh', // Full height
                    left: isSidebarOpen ? '0px' : '0px', // Hide sidebar when closed on small screens
                }}
            >
                <div className="p-4 flex justify-between items-center">
                    <img
                        src="/assets/logo.png"
                        className={`my-4  h-20 w-auto ${isSidebarOpen ? "" : "opacity-0"}`}
                        alt=""
                    />
                    <button onClick={toggleSidebar} className="text-white focus:outline-none">
                        {isSidebarOpen ? (
                            <span className='h-10 w-10 bg-gray rounded-full text-black flex justify-center items-center'>
                                <IoMdClose size={20} />
                            </span>
                        ) : (
                            <span className='h-10 w-10 bg-gray rounded-full text-black flex justify-center items-center'>
                                <FaBars size={20} />
                            </span>
                        )}
                    </button>

                </div>
                <nav className=''>
                    <ul>
                        {/* Users */}
                        {userData?.userType === "admin" &&
                        <>
                        <li className="p-4">
                            <Link
                                href="/dashboard"
                                className={`flex items-center ${pathname === '/dashboard' ? "text-gradiant font-bold" : ""}`}
                            >
                                <div className='flex items-center gap-2 leading-none'>
                                    <MdOutlineDashboard size={20} />
                                    {isSidebarOpen && "Dashboard"} {/* Show text only when sidebar is open */}
                                </div>
                            </Link>
                        </li>
                        <li className="p-4">
                            <Link
                                href="/dashboard/users"
                                className={`flex items-center ${pathname === '/dashboard/users' ? "text-gradiant font-bold" : ""}`}
                            >
                                <div className='flex items-center gap-2 leading-none'>
                                    <FaUsers size={20} />
                                    {isSidebarOpen && "Members"} {/* Show text only when sidebar is open */}
                                </div>
                            </Link>
                        </li>
                                </>}

                        {/* GiftCards Dropdown */}
                        {/* <SidebarDropdown
                            isSidebarOpen={isSidebarOpen}
                            title="Gift Cards"
                            icon={<FaGift  size={20} />}
                            items={[
                                { label: "Add Cards", href: "/gift-cards/add-cards" },
                                { label: "All Cards", href: "/gift-cards/all-cards" },
                            ]}
                            dropdownId="cards"
                        /> */}
                        {/* Nutritionist Members */}
                        {userData?.userType === "nutritionist" &&
                            <>
                                <li className="p-4">
                                    <Link
                                        href="/dashboard/members"
                                        className={`flex items-center ${pathname === '/dashboard/members' ? "text-gradiant font-bold" : ""}`}
                                    >
                                        <div className='flex items-center gap-2 leading-none'>
                                            <FaUsers size={20} />
                                            {isSidebarOpen && "Members"} {/* Show text only when sidebar is open */}
                                        </div>
                                    </Link>
                                </li>

                                {/* bookings */}

                                <li className="p-4">
                                    <Link
                                        href="/dashboard/bookings"
                                        className={`flex items-center ${pathname === '/dashboard/bookings' ? "text-gradiant font-bold" : ""}`}
                                    >
                                        <div className='flex items-center gap-2 leading-none'>
                                            <FaUsers size={20} />
                                            {isSidebarOpen && "Bookings"} {/* Show text only when sidebar is open */}
                                        </div>
                                    </Link>
                                </li>
                                {/* member Reports */}

                                <li className="p-4">
                                    <Link
                                        href="/dashboard/reports"
                                        className={`flex items-center ${pathname === '/dashboard/reports' ? "text-gradiant font-bold" : ""}`}
                                    >
                                        <div className='flex items-center gap-2 leading-none'>
                                            <TbReport  size={20} />
                                            {isSidebarOpen && "Member Reports"} {/* Show text only when sidebar is open */}
                                        </div>
                                    </Link>
                                </li>
                                <li className="p-4">
                                    <Link
                                        href="/dashboard/nutritionist-payments"
                                        className={`flex items-center ${pathname === '/dashboard/nutritionist-payments' ? "text-gradiant font-bold" : ""}`}
                                    >
                                        <div className='flex items-center gap-2 leading-none'>
                                            <FaDollarSign size={20} />
                                            {isSidebarOpen && "Nutritionist Payments"} {/* Show text only when sidebar is open */}
                                        </div>
                                    </Link>
                                </li>
                            </>}

                        {userData?.userType === "admin" &&

                            <li className="p-4">
                                <Link
                                    href="/dashboard/nutritionists"
                                    className={`flex items-center ${pathname === '/dashboard/nutritionists' ? "text-gradiant font-bold" : ""}`}
                                >
                                    <div className='flex items-center gap-2 leading-none'>
                                        <LuClipboardList size={20} />
                                        {isSidebarOpen && "Nutritionist Management"} {/* Show text only when sidebar is open */}
                                    </div>
                                </Link>
                            </li>
                        }
                            <li className="p-4">
                                <Link
                                    href="/"
                                    className={`flex items-center ${pathname === '/' ? "text-gradiant font-bold" : ""}`}
                                >
                                    <div className='flex items-center gap-2 leading-none'>
                                        <CiGlobe size={20} />
                                        {isSidebarOpen && "Fitness Fusion"} {/* Show text only when sidebar is open */}
                                    </div>
                                </Link>
                            </li>
                            <li className="p-4">
                                <Link
                                    href="/dashboard/profile"
                                    className={`flex items-center ${pathname === '/dashboard/profile' ? "text-gradiant font-bold" : ""}`}
                                >
                                    <div className='flex items-center gap-2 leading-none'>
                                        <CgProfile size={20} />
                                        {isSidebarOpen && "Profile"} {/* Show text only when sidebar is open */}
                                    </div>
                                </Link>
                            </li>

                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`${(window.innerWidth < 768 && !isSidebarOpen) && 'pl-16'} border-l border-gray1 flex-1 overflow-x-hidden relative`}>
                <div className='h-20 border-b  pl-10 pr-4 flex justify-between items-center'>
                    <div>
                        <h1 className='text-blue font-bold text-[18px] md:text-3xl capitalize'>{userData?.userType} Dashboard</h1>
                        <h1 className='text-black font-bold text-[16px] capitalize'>Welcome {userData?.fullName} </h1>

                    </div>
                    <div className='flex items-center gap-4'>
                        {/* Notifications Dropdown */}


                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button onClick={toggleProfile} className="flex items-center gap-1 focus:outline-none">
                                <img src="/assets/nut6.jpeg" className='h-9 w-9 rounded-full' alt="" />
                                <h1 className='text-white font-semibold'>Admin</h1>
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"
                                    >
                                        <div className="p-4">
                                            <Link href="/dashboard/profile" className="block text-sm text-gray-700 hover:bg-gray-100 p-2 rounded">
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-sm text-gray-700 hover:bg-gray-100 p-2 rounded text-left"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className='p-4'>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;