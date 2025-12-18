import React, { useState } from "react";
import { useEffect } from "react";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [token, settoken] = useState(false);
    // smooth scroll function
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false); // close mobile menu
    };

    useEffect(()=>{
        if (sessionStorage.getItem("token")) {
            settoken(true)
        }else{
            settoken(false)
        }
    })

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

                    {token?
                        <div className="hidden lg:flex items-center gap-4 relative">
                                  <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-3 hover:bg-orange-50 px-4 py-2 rounded-xl transition"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                                      A
                                    </div>
                                    <span className="font-semibold text-gray-800">Alex P.</span>
                                    <svg className={`w-5 h-5 transition ${profileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                        
                                  {/* Dropdown */}
                                  {profileOpen && (
                                    <div className="absolute top-16 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-orange-100 p-4">
                                      <Link to="/userprofile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 rounded-xl transition">
                                        <FaRegUser className="text-orange-600" /> My Profile
                                      </Link>
                                      
                                      <hr className="my-3 border-orange-100" />
                                      <Link to={"/"}>
                                          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl text-red-600 font-medium transition">
                                            <FaSignOutAlt /> Logout
                                          </button>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                        
                        :
                        
                        <Link to="/login">
                            <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 py-2 rounded-lg font-semibold">
                                <FaRegUser className="inline mr-2" /> Login / Register
                            </button>
                        </Link>}
                    {/* Mobile Menu Btn */}
                    <button
                        className="md:hidden text-3xl text-gray-700"
                        onClick={() => setOpen(!open)}
                    >
                        <MdOutlineMenu />
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {open && (
                    <div className="md:hidden bg-gray-900 text-white px-6 py-4">
                        <ul className="flex flex-col gap-4 text-lg">
                            <li onClick={() => scrollToSection("home")} className="hover:text-orange-400 cursor-pointer">Home</li>
                            <li onClick={() => scrollToSection("pets")} className="hover:text-orange-400 cursor-pointer">Pets</li>
                            <li onClick={() => scrollToSection("services")} className="hover:text-orange-400 cursor-pointer">Services</li>
                            <li onClick={() => scrollToSection("about")} className="hover:text-orange-400 cursor-pointer">About</li>
                            <li onClick={() => scrollToSection("contact")} className="hover:text-orange-400 cursor-pointer">Contact</li>
                        </ul>
                        {token?
                        <Link to="/userprofile" className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 rounded-xl transition">
                                        <FaRegUser className="text-orange-600" /> My Profile
                                      </Link>
                        
                        :
                        
                        <Link to="/login">
                            <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 py-2 rounded-lg font-semibold">
                                <FaRegUser className="inline mr-2" /> Login / Register
                            </button>
                        </Link>}
                        
                    </div>
                )}
            </header>
        </>
    );
}

export default Header;
