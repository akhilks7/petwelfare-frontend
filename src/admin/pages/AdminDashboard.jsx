import React, { useState } from "react";
import {
  FaHome, FaUsers, FaPaw, FaPlus, FaEdit, FaTrashAlt, FaCheckCircle,
  FaTimesCircle, FaEye, FaSearch, FaBell, FaSignOutAlt, FaBars,
  FaExclamationTriangle, FaHeart, FaDollarSign, FaHandHoldingHeart,
  FaShieldAlt, FaFilter,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleaddnewpet } from "../../services/allAPI";
import { useEffect } from "react";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddPetModal, setShowAddPetModal] = useState(false);
   const [token, settoken] = useState("");

  const [newpetDetails, setnewpetDetails] = useState({
    
    petname:"",
    age:"",
    gender:"",
    location:"",
    breed:"",
    price:"",
    imageURL:""

  });
  console.log(newpetDetails);
  
  const reset=()=>{
    setnewpetDetails({
      petname:"",
    age:"",
    gender:"",
    location:"",
    breed:"",
    price:"",
    imageURL:""
    })
  }
  const addnewpet=async()=>{
   const reqheader={
      "Authorization":`Bearer ${token}`
    }
    try {
      const result= await handleaddnewpet(newpetDetails,reqheader)
      console.log(result);
      if (result.status==200) {
        alert(`success`)
      }else{
        alert(`failed`)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
  },[])

  // Mock Data
  const stats = {
    totalUsers: 2847,
    petsForSale: 89,
    buyEnquiries: 42,
    donateEnquiries: 28,
    lostReports: 37,
    foundReports: 65,
    pendingActions: 173
  };

  const enquiries = [
    { id: 1001, type: "buy", name: "Priya Menon", pet: "Golden Retriever - Max", price: 32000, time: "5 mins ago", status: "pending" },
    { id: 1002, type: "donate", name: "Arun Kumar", pet: "Indie Puppy (Free Adoption)", time: "12 mins ago", status: "pending" },
    { id: 1003, type: "lost", name: "Sneha Raj", pet: "Persian Cat 'Misty'", location: "Marine Drive", time: "1 hour ago", status: "urgent" },
    { id: 1004, type: "found", name: "Vishnu Nair", pet: "Beagle near Kakkanad", time: "2 hours ago", status: "pending" },
    { id: 1005, type: "buy", name: "Rahul Verma", pet: "German Shepherd Puppy", price: 38000, time: "3 hours ago", status: "pending" }
  ];

  const petsForSale = [
    { id: 1, name: "Max", breed: "Golden Retriever", age: "8 weeks", price: 32000, status: "active", breeder: "Sunshine Kennels" },
    { id: 2, name: "Bella", breed: "Persian Cat", age: "10 weeks", price: 22000, status: "active", breeder: "Royal Cats" },
    { id: 3, name: "Rocky", breed: "German Shepherd", age: "9 weeks", price: 38000, status: "sold", breeder: "Elite Kennel" }
  ];

  const menuItems = [
    { icon: FaHome, label: "Overview", id: "overview" },
    { icon: FaPaw, label: "Pets for Sale", id: "pets", badge: petsForSale.length },
    { icon: FaPlus, label: "Add New Pet", id: "addpet", special: true },
    { icon: FaDollarSign, label: "Buy Enquiries", id: "buy", badge: stats.buyEnquiries },
    { icon: FaHandHoldingHeart, label: "Donate Enquiries", id: "donate", badge: stats.donateEnquiries },
    { icon: FaExclamationTriangle, label: "Lost Reports", id: "lost", badge: stats.lostReports },
    { icon: FaHeart, label: "Found Reports", id: "found", badge: stats.foundReports },
    { icon: FaUsers, label: "Users", id: "users" },
    { icon: FaShieldAlt, label: "Moderation", id: "moderation" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-900 border-r border-gray-800 transition-all duration-300 ${sidebarOpen ? "w-80" : "w-20"}`}>
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-4 ${!sidebarOpen && "justify-center"}`}>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl">
                  <FaShieldAlt className="text-3xl" />
                </div>
                {sidebarOpen && <span className="text-2xl font-bold text-white">PetHub Admin</span>}
              </div>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white lg:hidden">
                {sidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
              </button>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "addpet") setShowAddPetModal(true);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all
                  ${activeTab === item.id ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl" : "hover:bg-gray-800 text-gray-300"}
                  ${item.special ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold" : ""}
                `}
              >
                <item.icon className="text-2xl flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="font-medium text-lg">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-950 text-white text-sm px-3 py-1 rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-gray-800">
            <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-900/50 text-gray-300 hover:text-white transition">
              <FaSignOutAlt className="text-2xl" />
              {sidebarOpen && <Link to={"/"}><span className="font-medium text-lg">Logout</span></Link>}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-40">
          <div className="px-8 py-5 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-3xl font-bold">
                {menuItems.find(m => m.id === activeTab)?.label || "Dashboard Overview"}
              </h1>
              <span className="bg-green-600 text-sm px-4 py-2 rounded-full font-bold animate-pulse">
                ONLINE
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative">
                <FaBell className="text-2xl hover:text-purple-400 transition" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-xs px-2 py-1 rounded-full">9</span>
              </button>
              <span className="text-gray-400">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        <main className="p-8">

          {/* Stats Overview */}
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 mb-10">
                {[
                  { label: "Total Users", value: stats.totalUsers, color: "from-blue-600 to-cyan-600" },
                  { label: "Pets Listed", value: stats.petsForSale, color: "from-purple-600 to-pink-600" },
                  { label: "Buy Requests", value: stats.buyEnquiries, color: "from-yellow-600 to-amber-600" },
                  { label: "Donate Requests", value: stats.donateEnquiries, color: "from-green-600 to-emerald-600" },
                  { label: "Lost Reports", value: stats.lostReports, color: "from-red-600 to-rose-600" },
                  { label: "Found Reports", value: stats.foundReports, color: "from-teal-600 to-cyan-700" },
                  { label: "Pending Actions", value: stats.pendingActions, color: "from-pink-600 to-rose-700", pulse: true }
                ].map((s, i) => (
                  <div key={i} className={`bg-gradient-to-br ${s.color} p-6 rounded-2xl shadow-xl ${s.pulse ? 'animate-pulse' : ''}`}>
                    <p className="text-4xl font-bold">{s.value}</p>
                    <p className="text-sm opacity-90 mt-2">{s.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {enquiries.map((e) => (
                  <div key={e.id} className="bg-gray-900/70 backdrop-blur rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold
                          ${e.type === "buy" ? "bg-yellow-600" : 
                            e.type === "donate" ? "bg-green-600" : 
                            e.type === "lost" ? "bg-red-600" : "bg-teal-600"}
                        `}>
                          {e.type.toUpperCase()}
                        </span>
                        <p className="text-xl font-bold mt-2">{e.name}</p>
                        <p className="text-gray-400">{e.pet} {e.location && `• ${e.location}`}</p>
                        {e.price && <p className="text-2xl font-bold text-yellow-500 mt-2">₹{e.price.toLocaleString()}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">{e.time}</p>
                        <div className="flex gap-3 mt-4">
                          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                            <FaCheckCircle /> Accept
                          </button>
                          <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                            <FaTimesCircle /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pets for Sale Management */}
          {activeTab === "pets" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Pets for Sale ({petsForSale.length})</h2>
                <button
                  onClick={() => setShowAddPetModal(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-xl font-bold text-xl flex items-center gap-3 shadow-xl"
                >
                  <FaPlus /> Add New Pet
                </button>
              </div>

              <div className="grid gap-6">
                {petsForSale.map((pet) => (
                  <div key={pet.id} className="bg-gray-900/70 backdrop-blur rounded-xl p-8 border border-gray-800 hover:border-purple-500 transition">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-8">
                        <div className="bg-gray-800 border-2 border-dashed rounded-xl w-32 h-32" />
                        <div>
                          <h3 className="text-2xl font-bold">{pet.name}</h3>
                          <p className="text-xl text-purple-400">{pet.breed} • {pet.age}</p>
                          <p className="text-gray-400">by {pet.breeder}</p>
                          <p className="text-3xl font-bold text-yellow-500 mt-3">₹{pet.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-2 rounded-full font-bold ${pet.status === "active" ? "bg-green-600" : "bg-gray-600"}`}>
                          {pet.status.toUpperCase()}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300 text-2xl"><FaEdit /></button>
                        <button className="text-red-400 hover:text-red-300 text-2xl"><FaTrashAlt /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs (buy, donate, lost, found) follow same pattern */}
        </main>
      </div>

      {/* ADD PET MODAL */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full p-10 border border-purple-600">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white">Add New Pet for Sale</h2>
              <button onClick={() => setShowAddPetModal(false)} className="text-3xl hover:text-gray-400">
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-300 mb-2">Pet Name</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,petname:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="e.g., Max" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Breed</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,breed:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="e.g., Golden Retriever" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Age</label>
                <input onChange={(e) => setnewpetDetails({...newpetDetails,age:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="e.g., 8 weeks" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Price (₹)</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,price:e.target.value})} type="number" className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="32000" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,imageURL:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Location</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,location:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="Kochi, Kerala" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gender</label>
                <input  onChange={(e) => setnewpetDetails({...newpetDetails,gender:e.target.value})} className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none" placeholder="eg..,male" />
              </div>
            </div>

            <div className="mt-8 flex gap-6 justify-end">
              <button onClick={() => {setShowAddPetModal(false),reset()}} className="px-10 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold">
                Cancel
              </button>
              <button onClick={()=>{addnewpet()}} className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold text-xl shadow-xl">
                Publish Pet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;