import React, { useState } from "react";
import { useEffect } from "react";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [token, setToken] = useState(false);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false);
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, []); // Added dependency array

    return (
        <>
            {/* Navbar */}
            <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
                <div className="flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="rounded-full shadow-md"
                            src="https://images.scalebranding.com/safari-pets-logo-caa45482-5ef4-4307-9c9d-8b2b03361c09.jpg"
                            width="60"
                            height="60"
                            alt="logo"
                        />
                        <h1 className="font-bold text-3xl text-orange-600">PetHub</h1>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex">
                        <ul className="flex gap-8 text-lg font-semibold text-gray-700">
                            <li onClick={() => scrollToSection("home")} className="hover:text-orange-600 cursor-pointer transition">Home</li>
                            <li onClick={() => scrollToSection("pets")} className="hover:text-orange-600 cursor-pointer transition">Pets</li>
                            <li onClick={() => scrollToSection("services")} className="hover:text-orange-600 cursor-pointer transition">Services</li>
                            <li onClick={() => scrollToSection("about")} className="hover:text-orange-600 cursor-pointer transition">About</li>
                            <li onClick={() => scrollToSection("contact")} className="hover:text-orange-600 cursor-pointer transition">Contact</li>
                        </ul>
                    </nav>

                    {/* Auth Section - Desktop */}
                    <div className="hidden lg:flex items-center">
                       
                            <Link to="/login">
                                <button className="flex items-center gap-3 hover:bg-orange-50 px-6 py-3 rounded-xl transition font-semibold text-gray-800 border-2 border-orange-500 hover:border-orange-600">
                                    <FaRegUser className="text-orange-600 text-lg" />
                                    Login / Register
                                </button>
                            </Link>
                        
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-3xl text-gray-700"
                        onClick={() => setOpen(!open)}
                    >
                        <MdOutlineMenu />
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {open && (
                    <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6">
                        <ul className="flex flex-col gap-5 text-lg font-medium text-gray-700">
                            <li onClick={() => scrollToSection("home")} className="hover:text-orange-600 cursor-pointer">Home</li>
                            <li onClick={() => scrollToSection("pets")} className="hover:text-orange-600 cursor-pointer">Pets</li>
                            <li onClick={() => scrollToSection("services")} className="hover:text-orange-600 cursor-pointer">Services</li>
                            <li onClick={() => scrollToSection("about")} className="hover:text-orange-600 cursor-pointer">About</li>
                            <li onClick={() => scrollToSection("contact")} className="hover:text-orange-600 cursor-pointer">Contact</li>
                        </ul>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            {token ? (
                                <>
                                    <Link
                                        to="/userprofile"
                                        className="block px-4 py-3 hover:bg-orange-50 rounded-xl transition font-medium"
                                        onClick={() => setOpen(false)}
                                    >
                                        <FaRegUser className="inline mr-2 text-orange-600" /> My Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            sessionStorage.removeItem("token");
                                            window.location.href = "/";
                                        }}
                                        className="w-full mt-2 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600 font-medium transition text-left"
                                    >
                                        <FaSignOutAlt className="inline mr-2" /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setOpen(false)}>
                                    <button className="w-full flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl transition font-semibold shadow-md">
                                        <FaRegUser className="text-lg" />
                                        Login / Register
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;