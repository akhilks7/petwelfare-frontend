import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
    FaPaw, FaSearch, FaHeart, FaExclamationTriangle,
    FaShoppingCart, FaMapMarkerAlt, FaClock, FaPhoneAlt,
    FaTimes, FaUpload, FaCalendarAlt, FaVenusMars, FaDog
} from "react-icons/fa";
import { Link } from "react-router-dom";

function UserDashboard() {
    // Modal States
    const [showLostModal, setShowLostModal] = useState(false);
    const [showFoundModal, setShowFoundModal] = useState(false);
    const [showStrayModal, setShowStrayModal] = useState(false); // New Stray Modal

    return (
        <>
            <Header />

            {/* Main Dashboard Content */}
            <div className="container mx-auto px-6 py-16 space-y-20">

                {/* 1. Pet Adoption */}
                <section id="petadoption" className="bg-white rounded-3xl shadow-xl p-10 border-4 border-orange-200">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                                <FaHeart className="text-red-500" /> Adopt a Pet
                            </h2>
                            <p className="text-gray-600 mt-2">Give a loving home to a pet in need</p>
                        </div>
                        <Link to="/adoptpets">
                            <button className="mt-4 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg hover:shadow-xl">
                                View Available Pets
                            </button>
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {["Max (Labrador)", "Luna (Cat)", "Buddy (Beagle)"].map((name) => (
                            <div key={name} className="bg-orange-50 rounded-2xl overflow-hidden shadow hover:shadow-2xl transition transform hover:-translate-y-2">
                                <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg" alt={name} className="h-56 w-full object-cover" />
                                <div className="p-5 text-center">
                                    <h3 className="font-bold text-xl text-gray-800">{name}</h3>
                                    <p className="text-orange-600">Ready for adoption</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. Found / Lost Quick Actions */}
                <section id="lostandfound" className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-10 shadow-xl">
                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 flex items-center justify-center gap-3">
                        <FaSearch className="text-amber-700" /> Found or Lost a Pet?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <FaPaw className="text-6xl text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800">I Found a Pet</h3>
                            <p className="text-gray-600 mt-3">Help reunite a lost pet with its family</p>
                            <button
                                onClick={() => setShowFoundModal(true)}
                                className="mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-110"
                            >
                                Report Found Pet
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                            <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-800">My Pet is Missing</h3>
                            <p className="text-gray-600 mt-3">Create an alert — we’ll help spread the word</p>
                            <button
                                onClick={() => setShowLostModal(true)}
                                className="mt-5 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-110"
                            >
                                Report Missing Pet
                            </button>
                        </div>
                    </div>
                </section>

                {/* 3. Buy Pets */}
                <section id="petforsale" className="bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl shadow-2xl p-10 border-4 border-orange-400">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center gap-4">
                                <FaShoppingCart className="text-orange-600 text-5xl" />
                                Buy Healthy Puppies & Kittens
                            </h2>
                            <p className="text-xl text-gray-600 mt-3">From verified breeders • Health certificates included</p>
                        </div>
                        <Link to="/petforsale">
                            <button className="mt-6 md:mt-0 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                                Browse All Breeds
                            </button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: "Golden Retriever", price: "₹32,000", age: "8 weeks", verified: true },
                            { name: "Persian Kitten", price: "₹22,000", age: "10 weeks", verified: true },
                            { name: "German Shepherd", price: "₹38,000", age: "9 weeks", verified: true },
                            { name: "Shih Tzu", price: "₹25,000", age: "7 weeks", verified: false }
                        ].map((pet) => (
                            <div key={pet.name} className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-orange-100">
                                <div className="relative h-64 overflow-hidden">
                                    <img src="https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg" alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-orange-700 shadow-lg">{pet.age}</div>
                                    {pet.verified && (
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                                            Verified Breeder
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 bg-gradient-to-b from-white to-orange-50">
                                    <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-3xl font-bold text-orange-600">{pet.price}</p>
                                        <FaPaw className="text-4xl text-orange-300 opacity-50" />
                                    </div>
                                    <button className="w-full mt-5 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-md hover:shadow-xl transform hover:scale-105">
                                        Contact Breeder
                                    </button>
                                </div>
                                <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-orange-300/30 transition-all duration-500 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Health Checked", "Vaccinated", "Dewormed", "Microchipped"].map((badge) => (
                            <div key={badge} className="bg-white/80 backdrop-blur-sm rounded-2xl py-4 shadow-lg border border-orange-200">
                                <p className="text-orange-700 font-bold text-lg">{badge}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Lost Pets */}
                <section className="bg-red-50 rounded-3xl shadow-2xl p-10 border-4 border-red-300">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold text-red-800 flex items-center gap-4">
                            <FaExclamationTriangle className="text-5xl animate-pulse" />
                            Lost Pets in Your Area
                        </h2>
                        <Link to="/lostpets">
                            <span className="bg-red-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">URGENT ALERTS</span>
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Rocky", breed: "German Shepherd", location: "Edappally", days: "2 days" },
                            { name: "Misty", breed: "Persian Cat", location: "Marine Drive", days: "4 days" },
                            { name: "Bruno", breed: "Beagle", location: "Kakkanad", days: "1 day" }
                        ].map((pet) => (
                            <div key={pet.name} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-105 border-2 border-red-200">
                                <div className="relative">
                                    <img src="https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg" alt={pet.name} className="h-56 w-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">MISSING</div>
                                </div>
                                <div className="p-6 bg-red-50">
                                    <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                                    <p className="text-red-700 font-medium">{pet.breed}</p>
                                    <p className="flex items-center gap-2 mt-3 text-gray-700">
                                        <FaMapMarkerAlt className="text-red-600" /> {pet.location}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                        <FaClock /> Missing for {pet.days}
                                    </p>
                                    <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition shadow-md">
                                        I Might Have Seen Him!
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Found Pets */}
                <section className="bg-green-50 rounded-3xl shadow-2xl p-10 border-4 border-green-400">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-4xl font-bold text-green-800 flex items-center gap-4">
                            <FaPaw className="text-5xl text-green-600" />
                            Recently Found Pets
                        </h2>
                        <span className="bg-green-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg">REUNITE NOW</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Found Puppy", location: "Vyttila Junction", date: "Today" },
                            { name: "White Cat", location: "Palace Road", date: "Yesterday" },
                            { name: "Brown Dog", location: "Lulu Mall", date: "2 days ago" }
                        ].map((pet) => (
                            <div key={pet.name} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
                                <img src="https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg" alt={pet.name} className="h-56 w-full object-cover" />
                                <div className="p-6 bg-green-50">
                                    <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                                    <p className="flex items-center gap-2 mt-3 text-green-700">
                                        <FaMapMarkerAlt /> {pet.location}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">Found: {pet.date}</p>
                                    <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition shadow-md">
                                        This Is My Pet!
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. STRAY ANIMALS - UPDATED WITH MODAL & LIST BUTTON */}
                <section id="stray" className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl shadow-2xl p-10 border-4 border-dashed border-amber-500">
                    <div className="text-center mb-10">
                        <FaExclamationTriangle className="text-9xl text-amber-600 mx-auto mb-6 opacity-80 animate-pulse" />
                        <h2 className="text-5xl font-bold text-amber-900 mb-4">
                            Help Stray Animals in Need
                        </h2>
                        <p className="text-xl text-amber-800 max-w-4xl mx-auto">
                            See a stray dog or cat in distress? Report it now — we’ll connect with local rescuers immediately.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <button
                            onClick={() => setShowStrayModal(true)}
                            className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white text-2xl font-bold px-16 py-8 rounded-3xl shadow-2xl hover:shadow-amber-500 transform hover:scale-110 transition-all flex items-center gap-5"
                        >
                            <FaDog className="text-5xl" />
                            Report a Stray Animal Now
                        </button>

                        <Link to="/straylist">
                            <button className="bg-white border-4 border-amber-600 text-amber-800 hover:bg-amber-50 text-xl font-bold px-12 py-8 rounded-3xl shadow-xl hover:shadow-amber-400 transform hover:scale-105 transition-all flex items-center gap-4">
                                <FaPaw className="text-4xl text-amber-600" />
                                View All Stray Reports
                            </button>
                        </Link>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        {[
                            { type: "Injured Street Dog", location: "MG Road", status: "Rescue Dispatched", color: "amber" },
                            { type: "Mother Dog + 5 Puppies", location: "Kadavanthra", status: "Being Fed Daily", color: "orange" },
                            { type: "Friendly Stray Cat", location: "Fort Kochi", status: "Awaiting Rescue", color: "yellow" }
                        ].map((report, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 shadow-xl border-4 border-amber-300 hover:border-amber-600 transition transform hover:-translate-y-3">
                                <div className="text-center">
                                    <FaPaw className={`text-7xl text-${report.color}-600 mb-4`} />
                                    <h3 className="text-2xl font-bold text-gray-800">{report.type}</h3>
                                    <p className="text-lg text-amber-700 mt-3 flex items-center justify-center gap-2">
                                        <FaMapMarkerAlt /> {report.location}
                                    </p>
                                    <span className={`inline-block mt-4 px-6 py-2 rounded-full font-bold text-sm
                                        ${report.status.includes("Dispatched") ? "bg-green-100 text-green-800" :
                                          report.status.includes("Awaiting") ? "bg-red-100 text-red-800" :
                                          "bg-blue-100 text-blue-800"}`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

           {/* MODAL: Report Missing Pet (Lost Pet) */}
{showLostModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-red-500">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-8 rounded-t-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-bold flex items-center gap-5">
              <FaExclamationTriangle className="text-6xl animate-pulse" />
              Report Missing Pet
            </h2>
            <p className="text-xl mt-3 opacity-90">We’ll help spread the alert across the city</p>
          </div>
          <button onClick={() => setShowLostModal(false)} className="text-4xl hover:bg-white/20 rounded-full p-3 transition">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xl font-bold text-red-800 mb-3">Pet Name</label>
            <input type="text" placeholder="e.g., Rocky" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
          <div>
            <label className="block text-xl font-bold text-red-800 mb-3">Breed</label>
            <input type="text" placeholder="e.g., German Shepherd" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
          <div>
            <label className="block text-xl font-bold text-red-800 mb-3">Age</label>
            <input type="text" placeholder="e.g., 3 years" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
          <div>
            <label className="block text-xl font-bold text-red-800 mb-3">Gender</label>
            <select className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg font-medium">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-red-800 mb-3">Last Seen Location</label>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-4xl text-red-600" />
            <input type="text" placeholder="e.g., Near Marine Drive, Kochi" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-red-800 mb-3">When Did Your Pet Go Missing?</label>
          <div className="flex items-center gap-4">
            <FaCalendarAlt className="text-4xl text-red-600" />
            <input type="date" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-red-800 mb-4">Upload Photos of Your Pet (Critical!)</label>
          <div className="border-8 border-dashed border-red-300 rounded-3xl p-16 text-center hover:border-red-600 transition-all bg-red-50/50">
            <FaUpload className="text-8xl text-red-400 mx-auto mb-6" />
            <p className="text-2xl font-bold text-red-800">Click to Upload or Drag & Drop</p>
            <p className="text-red-700 mt-3">Clear photos help people recognize your pet faster</p>
            <input type="file" accept="image/*" multiple className="mt-6 text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-red-800 mb-3">Special Identification (Collar, Tags, Markings)</label>
          <textarea rows={4} placeholder="e.g., Wearing blue collar with silver bone tag, white patch on chest..." className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg resize-none"></textarea>
        </div>

        <div>
          <label className="block text-xl font-bold text-red-800 mb-3">Your Contact Number (Will be shown publicly)</label>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-4xl text-red-600" />
            <input type="tel" placeholder="+91 98765 43210" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div className="flex gap-6 pt-8 justify-center">
          <button onClick={() => setShowLostModal(false)} className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition">
            Cancel
          </button>
          <button className="px-16 py-6 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-red-600 transform hover:scale-110 transition-all flex items-center gap-4">
            <FaExclamationTriangle className="text-4xl" />
            Submit Missing Alert
          </button>
        </div>
      </div>
    </div>
  </div>
)}

{/* MODAL: Report Found Pet */}
{showFoundModal && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-green-500">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 rounded-t-3xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-bold flex items-center gap-5">
              <FaPaw className="text-6xl animate-bounce" />
              I Found a Pet
            </h2>
            <p className="text-xl mt-3 opacity-90">Thank you for helping reunite a family!</p>
          </div>
          <button onClick={() => setShowFoundModal(false)} className="text-4xl hover:bg-white/20 rounded-full p-3 transition">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xl font-bold text-green-800 mb-3">Animal Type</label>
            <select className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg font-medium">
              <option>Dog</option>
              <option>Cat</option>
              <option>Puppy</option>
              <option>Kitten</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xl font-bold text-green-800 mb-3">Approximate Age</label>
            <input type="text" placeholder="e.g., Adult, 6 months, Puppy" className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg" />
          </div>
          <div>
            <label className="block text-xl font-bold text-green-800 mb-3">Gender (if known)</label>
            <select className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg font-medium">
              <option>Not Sure</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label className="block text-xl font-bold text-green-800 mb-3">Color / Breed (if known)</label>
            <input type="text" placeholder="e.g., Brown Labrador, Black & White Cat" className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-green-800 mb-3">Where Did You Find the Pet?</label>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-4xl text-green-600" />
            <input type="text" placeholder="e.g., Near Vyttila Junction, Kochi" className="flex-1 px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-green-800 mb-4">Upload Clear Photos (Very Important!)</label>
          <div className="border-8 border-dashed border-green-300 rounded-3xl p-16 text-center hover:border-green-600 transition-all bg-green-50/50">
            <FaUpload className="text-8xl text-green-400 mx-auto mb-6" />
            <p className="text-2xl font-bold text-green-800">Click to Upload or Drag & Drop</p>
            <p className="text-green-700 mt-3">Multiple angles help owners recognize their pet</p>
            <input type="file" accept="image/*" multiple className="mt-6 text-lg" />
          </div>
        </div>

        <div>
          <label className="block text-xl font-bold text-green-800 mb-3">Any Collar, Tags, or Special Marks?</label>
          <textarea rows={4} placeholder="e.g., Red collar with bell, microchip scar, injured left ear..." className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg resize-none"></textarea>
        </div>

        <div>
          <label className="block text-xl font-bold text-green-800 mb-3">Your Contact Number (Owner will contact you)</label>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-4xl text-green-600" />
            <input type="tel" placeholder="+91 98765 43210" className="flex-1 px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg" />
          </div>
        </div>

        <div className="flex gap-6 pt-8 justify-center">
          <button onClick={() => setShowFoundModal(false)} className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition">
            Cancel
          </button>
          <button className="px-16 py-6 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-green-600 transform hover:scale-110 transition-all flex items-center gap-4">
            <FaPaw className="text-4xl" />
            Submit Found Pet Report
          </button>
        </div>
      </div>
    </div>
  </div>
)}

            {/* MODAL: Report Stray Animal */}
            {showStrayModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-amber-500">
                        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 rounded-t-3xl">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-5xl font-bold flex items-center gap-5">
                                        <FaDog className="text-6xl animate-bounce" />
                                        Report a Stray Animal
                                    </h2>
                                    <p className="text-xl mt-3 opacity-90">Your report can save a life today</p>
                                </div>
                                <button onClick={() => setShowStrayModal(false)} className="text-4xl hover:bg-white/20 rounded-full p-3 transition">
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xl font-bold text-amber-800 mb-3">Animal Type</label>
                                    <select className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg font-medium">
                                        <option>Street Dog</option>
                                        <option>Street Cat</option>
                                        <option>Puppy (under 6 months)</option>
                                        <option>Kitten (under 6 months)</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xl font-bold text-amber-800 mb-3">Condition</label>
                                    <select className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg font-medium">
                                        <option>Injured / Bleeding</option>
                                        <option>Sick / Weak</option>
                                        <option>Pregnant / Nursing</option>
                                        <option>Aggressive</option>
                                        <option>Friendly / Approaching People</option>
                                        <option>Normal but Hungry</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xl font-bold text-amber-800 mb-3">Exact Location</label>
                                <div className="flex items-center gap-4">
                                    <FaMapMarkerAlt className="text-4xl text-amber-600" />
                                    <input type="text" placeholder="e.g., Near Lulu Mall Signal, Edappally, Kochi" className="flex-1 px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xl font-bold text-amber-800 mb-4">Upload Photos (Very Important!)</label>
                                <div className="border-8 border-dashed border-amber-300 rounded-3xl p-16 text-center hover:border-amber-600 transition-all bg-amber-50/50">
                                    <FaUpload className="text-8xl text-amber-400 mx-auto mb-6" />
                                    <p className="text-2xl font-bold text-amber-800">Click to Upload or Drag & Drop</p>
                                    <p className="text-amber-700 mt-3">Multiple photos help rescuers act faster</p>
                                    <input type="file" accept="image/*" multiple className="mt-6 text-lg" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xl font-bold text-amber-800 mb-3">Description</label>
                                <textarea rows={5} placeholder="How many animals? Any puppies/kittens? Behavior? Injuries visible? Can someone approach safely?" className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg resize-none"></textarea>
                            </div>

                            <div>
                                <label className="block text-xl font-bold text-amber-800 mb-3">Your Contact (Optional)</label>
                                <div className="flex items-center gap-4">
                                    <FaPhoneAlt className="text-4xl text-amber-600" />
                                    <input type="tel" placeholder="+91 98765 43210" className="flex-1 px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg" />
                                </div>
                            </div>

                            <div className="flex gap-6 pt-8 justify-center">
                                <button onClick={() => setShowStrayModal(false)} className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition">
                                    Cancel
                                </button>
                                <button className="px-16 py-6 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-amber-600 transform hover:scale-110 transition-all flex items-center gap-4">
                                    <FaPaw className="text-4xl" />
                                    Submit Stray Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default UserDashboard;