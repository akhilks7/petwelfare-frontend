import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  FaPaw, FaExclamationTriangle, FaMapMarkerAlt, FaCalendarAlt, 
  FaSearch, FaFilter, FaTimes, FaPhoneAlt, FaClock 
} from "react-icons/fa";

function LostPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  // Sample Lost Pets Data
  const lostPets = [
    {
      id: 1,
      name: "Rocky",
      breed: "German Shepherd",
      gender: "Male",
      age: "3 years",
      location: "Edappally, Kochi",
      lostDate: "2 days ago",
      lastSeen: "Near Edappally Church",
      description: "Wearing red collar with silver tag. Very friendly, answers to Rocky.",
      image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
      contact: "+91 98765 43210",
      reward: "₹5,000 reward"
    },
    {
      id: 2,
      name: "Misty",
      breed: "Persian Cat",
      gender: "Female",
      age: "2 years",
      location: "Marine Drive, Kochi",
      lostDate: "4 days ago",
      lastSeen: "Near boat jetty area",
      description: "All white with blue eyes. Indoor cat, very scared of loud noises.",
      image: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg",
      contact: "+91 98765 43211",
      reward: "Safe return only"
    },
    {
      id: 3,
      name: "Bruno",
      breed: "Beagle",
      gender: "Male",
      age: "1.5 years",
      location: "Kakkanad",
      lostDate: "Yesterday",
      lastSeen: "Near Infopark",
      description: "Tri-color Beagle. Microchipped. Escaped during evening walk.",
      image: "https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg",
      contact: "+91 98765 43212",
      reward: "₹10,000 reward"
    },
    {
      id: 4,
      name: "Luna",
      breed: "Indie Dog",
      gender: "Female",
      location: "Aluva",
      lostDate: "1 week ago",
      lastSeen: "Near railway station",
      description: "Black indie with white chest. Very shy but loves treats.",
      image: "https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg",
      contact: "+91 98765 43213",
      reward: "Gratitude + reward"
    }
  ];

  const locations = ["all", "Edappally, Kochi", "Marine Drive, Kochi", "Kakkanad", "Aluva"];

  // Filter Logic
  const filteredPets = lostPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || pet.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Header />

      {/* Hero Section - Urgent Red Theme */}
    

      {/* Search & Filter Bar */}
      <div className="bg-red-50 border-b-4 border-red-500 sticky top-0 z-40 shadow-lg mt-24">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-red-600" />
              <input
                type="text"
                placeholder="Search pet name, breed, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-red-300 rounded-2xl text-lg focus:outline-none focus:border-red-600 transition shadow-md"
              />
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-red-700" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-6 py-4 bg-white border-2 border-red-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-red-600 transition shadow-md"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All Areas" : loc}
                  </option>
                ))}
              </select>

              {(searchTerm || locationFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("all");
                  }}
                  className="px-6 py-4 bg-orange-100 text-orange-800 hover:bg-orange-200 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>

          <p className="text-center mt-4 text-red-800 font-bold text-xl">
            {filteredPets.length} missing pet{filteredPets.length !== 1 ? 's' : ''} • Act fast!
          </p>
        </div>
      </div>

      {/* Lost Pets Grid */}
      <div className="container mx-auto px-6 py-16">
        {filteredPets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-red-200 hover:border-red-600 transition-all duration-500 group relative"
              >
                {/* Urgent Banner */}
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-center py-3 font-bold text-lg z-10">
                  MISSING — {pet.lostDate.toUpperCase()}
                </div>

                {/* Image */}
                <div className="relative h-80 overflow-hidden mt-12">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  {pet.reward && (
                    <div className="absolute bottom-4 left-4 bg-yellow-500 text-black px-5 py-3 rounded-full font-bold text-lg shadow-2xl animate-pulse">
                      {pet.reward}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-8 bg-gradient-to-b from-red-50 to-white">
                  <h3 className="text-3xl font-bold text-gray-800 flex items-center justify-between">
                    {pet.name}
                    <span className="text-5xl animate-pulse">Broken Heart</span>
                  </h3>
                  <p className="text-xl text-red-700 font-semibold mt-1">{pet.breed}</p>

                  <div className="mt-5 space-y-3 text-gray-700">
                    <p className="flex items-center gap-3">
                      <FaCalendarAlt className="text-red-600" /> Age: {pet.age}
                    </p>
                    <p className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-red-600" /> Last seen: {pet.lastSeen}
                    </p>
                    <p className="flex items-center gap-3 text-red-800 font-bold">
                      <FaClock className="animate-spin-slow" /> Lost {pet.lostDate}
                    </p>
                  </div>

                  <p className="mt-6 text-gray-700 italic leading-relaxed bg-red-50 p-4 rounded-xl border-l-4 border-red-600">
                    "{pet.description}"
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-8">
                    <a
                      href={`tel:${pet.contact}`}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-xl py-5 rounded-2xl shadow-2xl hover:shadow-red-500 transform hover:scale-105 transition-all flex items-center justify-center gap-3"
                    >
                      <FaPhoneAlt className="text-2xl" /> I’ve Seen This Pet! Call Now
                    </a>
                  </div>

                  <p className="text-center text-sm text-gray-600 mt-4 font-medium">
                    Contact owner immediately • Do not chase
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <FaPaw className="text-9xl text-red-200 mx-auto mb-6 opacity-50" />
            <p className="text-3xl font-bold text-gray-600">No missing pets match your search</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
              }}
              className="mt-6 text-red-600 hover:text-red-800 font-bold text-xl underline"
            >
              Clear filters and see all alerts
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-red-100 py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Is Your Pet Missing?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Report your missing pet now — the faster we spread the word, the sooner they come home.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl hover:shadow-red-600 transform hover:scale-105 transition-all animate-pulse">
            Report Missing Pet Now
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LostPets;