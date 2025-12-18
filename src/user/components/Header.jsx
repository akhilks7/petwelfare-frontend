import React, { useState } from "react";
import { FaPaw, FaRegUser, FaSignOutAlt, FaHome, FaHeart, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false); // close mobile menu
    };

  return (
    <header className="w-full bg-white shadow-lg fixed top-0 left-0 z-50 border-b-4 border-orange-200">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.scalebranding.com/safari-pets-logo-caa45482-5ef4-4307-9c9d-8b2b03361c09.jpg"
              alt="PetHub Logo"
              className="w-14 h-14 rounded-full shadow-md border-4 border-white"
            />
            <FaPaw className="absolute -bottom-1 -right-1 text-orange-600 text-2xl bg-white rounded-full p-1 shadow-md" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            PetHub
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8 text-lg font-semibold text-gray-700">
            <li onClick={() => scrollToSection("petadoption")} className="flex items-center gap-2 hover:text-orange-600 transition cursor-pointer">
              <FaHeart /> Adopt
            </li>
            <li onClick={() => scrollToSection("petforsale")} className="flex items-center gap-2 hover:text-orange-600 transition cursor-pointer">
              <FaShoppingCart /> Buy Pets
            </li>
            <li onClick={() => scrollToSection("lostandfound")} className="flex items-center gap-2 hover:text-orange-600 transition cursor-pointer">
              <FaExclamationTriangle className="text-red-500" /> Lost & Found
            </li>
            <li  onClick={() => scrollToSection("stray")} className="flex items-center gap-2 hover:text-orange-600 transition cursor-pointer">
              <FaHome /> Stray
            </li>
          </ul>
        </nav>

        {/* Desktop Profile Dropdown */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-3xl text-orange-600"
        >
          <MdOutlineMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-gradient-to-b from-orange-500 to-orange-600 text-white px-6 py-6 absolute top-full left-0 w-full shadow-2xl">
          <div className="flex flex-col items-center gap-2 mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-orange-600 shadow-xl">
              A
            </div>
            <p className="text-xl font-bold">Alex P.</p>
            <p className="text-sm opacity-90">alex@pethub.com</p>
          </div>

          <nav className="flex flex-col gap-4 text-lg font-medium">
            <Link to="/dashboard" className="flex items-center gap-3 py-3 hover:bg-white/20 rounded-xl px-4 transition">
              <FaHome /> Dashboard
            </Link>
            <Link to="/adopt" className="flex items-center gap-3 py-3 hover:bg-white/20 rounded-xl px-4 transition">
              <FaHeart /> Adopt a Pet
            </Link>
            <Link to="/buy" className="flex items-center gap-3 py-3 hover:bg-white/20 rounded-xl px-4 transition">
              <FaShoppingCart /> Buy Pets
            </Link>
            <Link to="/lost-found" className="flex items-center gap-3 py-3 hover:bg-white/20 rounded-xl px-4 transition">
              <FaExclamationTriangle /> Lost & Found
            </Link>
            <Link to="/profile" className="flex items-center gap-3 py-3 hover:bg-white/20 rounded-xl px-4 transition">
              <FaRegUser /> My Profile
            </Link>
          </nav>

          <button className="mt-6 w-full bg-white text-orange-600 font-bold py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition shadow-lg">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;