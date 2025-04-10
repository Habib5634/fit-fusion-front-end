'use client'
import { closeModal, openModal } from '@/app/Store/ReduxSlice/modalSlice';
import useScrollTrigger from '@/hooks/useScrollTrigger';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaFacebookSquare, FaLinkedin, FaPhoneAlt, FaRegUserCircle } from "react-icons/fa";

import { IoChatboxEllipses, IoCloseCircleSharp, IoLogoWhatsapp } from "react-icons/io5";
import Link from 'next/link';
import AuthModel from './AuthModal';
import AuthComponent from './AuthComponent';
import { fetchUserData } from '@/app/Store/Actions/userAction';
import UserDropdown from './userDropDown';
const Navbar = () => {
    const { scrollTrigger, scrollDirection } = useSelector((state) => state.scroll);
    const [showSidebar, setShowSidebar] = useState(false)
    const showModal = useSelector((state) => state.modal.showModal);
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userData)
    const handleShowModal = () => {
        console.log("clicked")
        dispatch(openModal());
    };
    useEffect(() => {
        dispatch(fetchUserData())
    }, [dispatch])
    
    const handleCloseModal = () => {
        dispatch(closeModal());
      };
    const pathname = usePathname()

    const router = useRouter()
    const handelShowSidebar = () => {
        setShowSidebar(!showSidebar)
    }


    useScrollTrigger()
    // Store scroll position in state
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Scroll to the section if it exists
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Redirect the user to the "Home" page
            router.push('/');

        }
        // Close the sidebar after scrolling
        setShowSidebar(false);
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token')
            dispatch(clearAuth());
            toast.success("Logout Successfully")
            router.push('/login')

        } catch (error) {
            console.log(error)
        }
    }
    const navItems = [
        { id: 1, label: "Home", section: "home", href: "/" },
        { id: 2, label: "About", section: "about",href: "/about" },
        { id: 3, label: "Our Nutritionist", section: "nutritionist" ,href: "/nutritionist" },
        { id: 4, label: "Blog", section: "blog",href: "/blog" },
        { id: 5, label: "Contact Us", section: "contact",href: "/contact" },
    ];
    return (
        <>


            <div className={`flex z-20 sticky top-0   justify-center w-full anim1   bg-dark text-white `}>

                <div className='flex justify-center w-full max-w-[1440px] mx-auto '>
                    <div className={`flex justify-between items-center   px-5 md:px-8 lg:px-14 py-4   w-full `}>
                        <Link href={'/'}>
                            <div className='flex items-center'>
                                <img src="/assets/logo.png" alt="" className='h-16 w-16 lg:w-20 lg:h-20' />

                            </div>
                        </Link>
                        <div className={`hidden lg:flex items-center  lg:gap-8 xl:gap-10 anim1`}>
                            {navItems.map((item) => (
                                <Link key={item.id} href={item.href || "#"} >
                                    <button
                                        onClick={() => scrollToSection(item.section)}
                                        className={`xl:text-18 lg:text-16 font-semibold cursor-pointer ${pathname === item.href ? "text-orange" : ""
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </Link>
                            ))}

                        </div>
                        <div className='flex  items-center gap-4 '>


                        <UserDropdown handleShowModal={handleShowModal} />
                           

                            <FaBars className={`text-white lg:hidden anim1`} size={25} onClick={handelShowSidebar} />
                        </div>
                    </div>
                </div>
            </div>

            {showSidebar &&
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10" onClick={handelShowSidebar}>


                </div>
            }
            <div className={`fixed top-0 right-0 flex flex-col anim5 z-40 min-h-screen    p-16 ease-in-out  ${showSidebar ? "-translate-x-0 " : "translate-x-full"} w-full max-w-sm bg-white  `}>
                <span><IoCloseCircleSharp className='text-2xl text-black absolute right-10 top-6' onClick={handelShowSidebar} /></span>
                <div className='flex flex-col items-start mt-10 gap-10 '>
                {navItems.map((item) => (
                                <Link key={item.id} href={item.href || "#"} className='cursor-pointer'>
                                    <button
                                        onClick={() => scrollToSection(item.section)}
                                        className={`xl:text-18 lg:text-16 font-semibold ${pathname === item.href ? "text-orange" : ""
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                </Link>
                            ))}

                </div>

                {/* <div className='mt-10'>
    <h1 className='text-20 font-bold text-white'>Get In Touch</h1>

    <div className='mt-6 flex items-center gap-4 text-24 text-purple'>
        <IoLogoWhatsapp />
        <FaLinkedin />
        <FaFacebookSquare />

    </div>

</div> */}
            </div>

            {showModal && <AuthModel onClose={handleCloseModal}>
        <AuthComponent />
      </AuthModel>}
        </>
    )
}

export default Navbar
