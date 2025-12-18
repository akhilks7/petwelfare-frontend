import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEdit,
  FaLock, FaPaw, FaHeart, FaExclamationTriangle, FaCheckCircle,
  FaShoppingCart, FaCalendarAlt, FaTimes
} from "react-icons/fa";

function UserProfile() {
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  // Mock User Data
  const user = {
    name: "Alex P ",
    email: "akhil.@gmail.com",
    phone: "+91 98765 43210",
    location: "Kochi, Kerala",
    joinDate: "15 March 2023",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    stats: {
      adoptions: 2,
      foundReported: 5,
      lostReported: 1,
      petsBought: 1,
      straysReported: 8
    }
  };

  return (
    <>
      <Header />

      {/* Main Profile Section */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 mt-10">
        <div className="container mx-auto px-6">

          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border-4 border-orange-200">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-8 border-orange-400 shadow-xl"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 text-white p-3 rounded-full shadow-lg">
                  <FaCheckCircle className="text-2xl" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-4 justify-center md:justify-start">
                  {user.name}
                  <FaPaw className="text-orange-600 text-4xl animate-bounce" />
                </h1>
                <p className="text-2xl text-orange-700 mt-2">Pet Lover & Animal Rescuer</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-lg text-gray-700">
                  <p className="flex items-center gap-3"><FaEnvelope /> {user.email}</p>
                  <p className="flex items-center gap-3"><FaPhoneAlt /> {user.phone}</p>
                  <p className="flex items-center gap-3"><FaMapMarkerAlt /> {user.location}</p>
                </div>
                <p className="text-gray-600 mt-4 flex items-center gap-2 justify-center md:justify-start">
                  <FaCalendarAlt /> Member since {user.joinDate}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setEditModal(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center gap-3"
                >
                  <FaEdit /> Edit Profile
                </button>
                <button
                  onClick={() => setPasswordModal(true)}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center gap-3"
                >
                  <FaLock /> Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Stats Dashboard - Grid Layout */}
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Your PetHub Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
            {/* Adoption Count */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaHeart className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{user.stats.adoptions}</p>
              <p className="text-xl mt-2">Pets Adopted</p>
            </div>

            {/* Found Reports */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaPaw className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{user.stats.foundReported}</p>
              <p className="text-xl mt-2">Found Pets Reported</p>
            </div>

            {/* Lost Reports */}
            <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaExclamationTriangle className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{user.stats.lostReported}</p>
              <p className="text-xl mt-2">Lost Pets Reported</p>
            </div>

            {/* Pets Bought */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaShoppingCart className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{user.stats.petsBought}</p>
              <p className="text-xl mt-2">Pets Purchased</p>
            </div>

            {/* Strays Reported */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition lg:col-span-1 xl:col-span-1">
              <FaPaw className="text-6xl mx-auto mb-4 opacity-90 rotate-12" />
              <p className="text-5xl font-bold">{user.stats.straysReported}</p>
              <p className="text-xl mt-2">Stray Animals Helped</p>
            </div>
          </div>

          {/* Recent Activity Summary */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border-4 border-orange-200">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { icon: FaHeart, text: "Adopted 'Luna' (Persian Cat)", date: "2 days ago", color: "text-pink-600" },
                { icon: FaPaw, text: "Reported a found Beagle near Vyttila", date: "1 week ago", color: "text-green-600" },
                { icon: FaShoppingCart, text: "Purchased Golden Retriever puppy", date: "3 weeks ago", color: "text-amber-600" },
                { icon: FaExclamationTriangle, text: "Reported missing dog 'Bruno'", date: "1 month ago", color: "text-red-600" }
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl hover:shadow-xl transition">
                  <activity.icon className={`text-5xl ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-xl font-semibold text-gray-800">{activity.text}</p>
                    <p className="text-gray-600">{activity.date}</p>
                  </div>
                  <FaCheckCircle className="text-3xl text-green-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {editModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 border-8 border-orange-400">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
                <FaEdit className="text-orange-600" /> Edit Profile
              </h2>
              <button onClick={() => setEditModal(false)} className="text-4xl hover:bg-gray-100 rounded-full p-2 transition">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <img src={user.profilePic} alt="Profile" className="w-32 h-32 rounded-full mx-auto border-4 border-orange-400" />
                <button className="mt-4 text-orange-600 font-bold hover:underline">Change Photo</button>
              </div>

              <input type="text" defaultValue={user.name} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />
              <input type="email" defaultValue={user.email} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />
              <input type="tel" defaultValue={user.phone} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />
              <input type="text" defaultValue={user.location} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />

              <div className="flex gap-4 pt-6">
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition">
                  Save Changes
                </button>
                <button onClick={() => setEditModal(false)} className="px-10 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 border-8 border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
                <FaLock className="text-gray-700" /> Change Password
              </h2>
              <button onClick={() => setPasswordModal(false)} className="text-4xl hover:bg-gray-100 rounded-full p-2 transition">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <input type="password" placeholder="Current Password" className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg" />
              <input type="password" placeholder="New Password" className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg" />
              <input type="password" placeholder="Confirm New Password" className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg" />

              <div className="flex gap-4 pt-6">
                <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition">
                  Update Password
                </button>
                <button onClick={() => setPasswordModal(false)} className="px-10 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition">
                  Cancel
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

export default UserProfile;