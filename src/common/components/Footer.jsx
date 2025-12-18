import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPaw } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#ffcb68] text-[#4a2f0b] pt-12 pb-6 mt-1">

      {/* TOP SECTION */}
      <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-10">

        {/* BRAND SECTION */}
        <div>
          <div className="flex items-center mb-3">
            <FaPaw className="text-[#4a2f0b] text-3xl me-2" />
            <h1 className="text-3xl font-bold ">PetHub</h1>
          </div>

          <p className="text-[#6b481a] leading-relaxed">
            Your trusted companion for finding loving pets, sharing care tips,
            and connecting with the pet community.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="p-3 bg-[#ffe5b3] rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-md"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="p-3 bg-[#ffe5b3] rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-md"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-3 bg-[#ffe5b3] rounded-full hover:bg-[#4a2f0b] hover:text-white transition-all shadow-md"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-xl font-semibold text-[#4a2f0b] mb-4">Quick Links</h2>
          <ul className="space-y-3">
            {["Home", "Pets", "Adoption Info", "Pet Care", "Contact"].map((item) => (
              <li
                key={item}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h2 className="text-xl font-semibold text-[#4a2f0b] mb-4">Support</h2>
          <ul className="space-y-3">
            {[
              "FAQ",
              "Shipping & Returns",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-white hover:translate-x-1 transition-all cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-xl font-semibold text-[#4a2f0b] mb-4">Contact Us</h2>
          <p className="mb-2">📍 PetHub Center, Kochi, India</p>
          <p className="mb-2">📞 +91 98765 43210</p>
          <p className="mb-2">✉ support@pethub.com</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-[#6b481a] text-sm mt-12 border-t border-[#e5a94f] pt-5">
        © {new Date().getFullYear()} PetHub. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
