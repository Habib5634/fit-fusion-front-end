import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-dark text-white  mt-12 py-12 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center md:text-left">
                    <div>
                        <h4 className="font-bold text-yellow-400">Fit Fusion</h4>
                        <p className="text-gray-400 text-sm">Your ultimate platform to connect with expert nutritionists and achieve your fitness goals.</p>
                    </div>
                    <div>
                        <h4 className="font-bold">Quick Links</h4>
                        <ul className="text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
                            <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold">Resources</h4>
                        <ul className="text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-yellow-400">Blog</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Success Stories</a></li>
                            <li><a href="#" className="hover:text-yellow-400">Find a Nutritionist</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold">Contact Us</h4>
                        <p className="text-gray-400 text-sm">Email: support@fitfusion.com</p>
                        <p className="text-gray-400 text-sm">Phone: +92 345-77890</p>
                        <div className="flex justify-center md:justify-start gap-3 mt-2">
                            <a href="#" className="text-gray-400 hover:text-yellow-400">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-6">© 2024 Fit Fusion. All rights reserved.</div>
            </footer>
  )
}

export default Footer
