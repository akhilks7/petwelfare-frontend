import React, { useContext } from "react";
import { FaPaw, FaFacebook, FaInstagram, FaTwitter, FaHeart, FaHome, FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { userProfileUpdateContent } from "../../context/ContextShare";

function Footer() {
  const {setuserProfileUpdateStatus}=useContext(userProfileUpdateContent)
  const navigate=useNavigate ()
  const logout=()=>{
    sessionStorage.removeItem("token")
    setuserProfileUpdateStatus(false)
    sessionStorage.removeItem("userdetails")
    navigate("/")
  }
  return (
    <footer className="bg-gradient-to-t from-[#ffcb68] to-[#ffd8a8] text-[#4a2f0b] pt-16 pb-8 mt-20">

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-10">

        {/* Brand + Thank You Message */}
        <div className="md:col-span-1">
          <div className="flex items-center mb-4">
            <FaPaw className="text-[#4a2f0b] text-4xl mr-3 animate-pulse" />
            <h1 className="text-4xl font-bold">PetHub</h1>
          </div>
          <p className="text-lg leading-relaxed text-[#6b481a] mb-6">
            Thank you for being part of our pet-loving family
          </p>
          <div className="flex items-center gap-3 text-[#4a2f0b]">
            <FaHeart className="text-red-600 text-2xl animate-pulse" />
            <span className="font-semibold text-lg">Together, we make tails wag!</span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="p-4 bg-white/70 rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110">
              <FaFacebook className="text-xl" />
            </a>
            <a href="#" className="p-4 bg-white/70 rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110">
              <FaInstagram className="text-xl" />
            </a>
            <a href="#" className="p-4 bg-white/70 rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-110">
              <FaTwitter className="text-xl" />
            </a>
          </div>
        </div>

        {/* Dashboard Quick Links */}
        <div>
          <h2 className="text-2xl font-bold text-[#4a2f0b] mb-5 flex items-center gap-3">
            <FaHome className="text-orange-700" /> Dashboard
          </h2>
          <ul className="space-y-4 text-lg">
            {[
              { name: "My Profile", icon: <FaUser /> },
              { name: "Adopt a Pet", icon: <FaHeart /> },
              { name: "My Pets", icon: <FaPaw /> },
              { name: "Lost & Found", icon: <FaSearch className="text-sm" /> },
            ].map((link) => (
              <li key={link.name} className="flex items-center gap-3 hover:text-white hover:translate-x-2 transition-all cursor-pointer font-medium">
                <span className="text-orange-700">{link.icon}</span> {link.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Community & Support */}
        <div>
          <h2 className="text-2xl font-bold text-[#4a2f0b] mb-5">Community</h2>
          <ul className="space-y-4 text-lg">
            <li className="hover:text-white hover:translate-x-2 transition-all cursor-pointer font-medium">
              Pet Care Tips
            </li>
            <li className="hover:text-white hover:translate-x-2 transition-all cursor-pointer font-medium">
              Success Stories
            </li>
            <li className="hover:text-white hover:translate-x-2 transition-all cursor-pointer font-medium">
              Report an Issue
            </li>
            <li className="hover:text-white hover:translate-x-2 transition-all cursor-pointer font-medium">
              Help Center
            </li>
          </ul>
        </div>

        {/* Contact + Logout */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold text-[#4a2f0b] mb-5">Stay Connected</h2>
          <div className="space-y-3 text-lg">
            <p>Kochi, Kerala, India</p>
            <p>+91 98765 43210</p>
            <p>support@pethub.com</p>
          </div>

          <div className="mt-8">
            <Link to="/login">
              <button onClick={()=>{logout()}} className="w-full bg-[#4a2f0b] hover:bg-[#3a2409] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105">
                <FaSignOutAlt /> Logout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t-4 border-[#e5a94f] text-center">
        <p className="text-[#6b481a] font-medium">
          © {new Date().getFullYear()} PetHub — Made with <FaHeart className="inline text-red-600 mx-1 animate-pulse" /> for pet lovers like you
        </p>
        <div className="flex justify-center gap-3 mt-4 text-3xl text-[#4a2f0b] opacity-30">
          <FaPaw />
          <FaPaw className="rotate-12" />
          <FaPaw className="-rotate-12" />
          <FaPaw className="rotate-6" />
          <FaPaw />
        </div>
      </div>
    </footer>
  );
}

export default Footer;