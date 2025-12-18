import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { 
  FaPaw, FaHeart, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, 
  FaVenusMars, FaUserCheck, FaFilter, FaTimes 
} from "react-icons/fa";

function PetAdoptions() {
  const [filters, setFilters] = useState({
    breed: "all",
    age: "all",
    gender: "all",
    location: "all"
  });

  const adoptionPets = [
    { id: 1, name: "Max", breed: "Labrador Retriever", age: "2 years", gender: "Male", location: "Kochi", vaccinated: true, story: "Max is a gentle giant...", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg", contact: "+91 98765 43210" },
    { id: 2, name: "Luna", breed: "Persian Cat", age: "1.5 years", gender: "Female", location: "Ernakulam", vaccinated: true, story: "Luna is calm and affectionate...", image: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg", contact: "+91 98765 43211" },
    { id: 3, name: "Buddy", breed: "Beagle", age: "10 months", gender: "Male", location: "Aluva", vaccinated: true, story: "Buddy is full of energy...", image: "https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg", contact: "+91 98765 43212" },
    { id: 4, name: "Bella", breed: "Indie Dog", age: "3 years", gender: "Female", location: "Thrissur", vaccinated: true, story: "Bella is loyal and protective...", image: "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg", contact: "+91 98765 43213" },
    { id: 5, name: "Rocky", breed: "German Shepherd", age: "8 months", gender: "Male", location: "Kochi", vaccinated: true, story: "Rocky is smart and trainable...", image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg", contact: "+91 98765 43214" },
    { id: 6, name: "Misty", breed: "Siamese Cat", age: "2 years", gender: "Female", location: "Ernakulam", vaccinated: true, story: "Misty is elegant and vocal...", image: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg", contact: "+91 98765 43215" }
  ];

  // Extract unique values for filters
  const breeds = ["all", ...new Set(adoptionPets.map(p => p.breed))];
  const locations = ["all", ...new Set(adoptionPets.map(p => p.location))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ breed: "all", age: "all", gender: "all", location: "all" });
  };

  // Filter logic
  const filteredPets = adoptionPets.filter(pet => {
    return (
      (filters.breed === "all" || pet.breed === filters.breed) &&
      (filters.age === "all" || 
        (filters.age === "puppy" && (pet.age.includes("month") || parseInt(pet.age) < 1)) ||
        (filters.age === "young" && parseInt(pet.age) >= 1 && parseInt(pet.age) <= 3) ||
        (filters.age === "adult" && parseInt(pet.age) > 3)
      ) &&
      (filters.gender === "all" || pet.gender.toLowerCase() === filters.gender) &&
      (filters.location === "all" || pet.location === filters.location)
    );
  });

  return (
    <>
      <Header />

      {/* Hero Section */}
      

      {/* Filter Bar */}
      <div className="bg-orange-50 border-b-4 border-orange-300 sticky top-0 z-40 shadow-lg mt-24">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-orange-800 font-bold text-xl">
              <FaFilter className="text-2xl" />
              <span>Filter Pets</span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                {filteredPets.length} Available
              </span>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Breed Filter */}
              <select
                value={filters.breed}
                onChange={(e) => handleFilterChange("breed", e.target.value)}
                className="px-5 py-3 bg-white border-2 border-orange-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-orange-600 transition"
              >
                {breeds.map(b => (
                  <option key={b} value={b}>{b === "all" ? "All Breeds" : b}</option>
                ))}
              </select>

              {/* Age Filter */}
              <select
                value={filters.age}
                onChange={(e) => handleFilterChange("age", e.target.value)}
                className="px-5 py-3 bg-white border-2 border-orange-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-orange-600 transition"
              >
                <option value="all">All Ages</option>
                <option value="puppy">Puppies/Kittens (&lt;1 year)</option>
                <option value="young">Young (1-3 years)</option>
                <option value="adult">Adult (3+ years)</option>
              </select>

              {/* Gender Filter */}
              <select
                value={filters.gender}
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                className="px-5 py-3 bg-white border-2 border-orange-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-orange-600 transition"
              >
                <option value="all">Both Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              {/* Location Filter */}
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="px-5 py-3 bg-white border-2 border-orange-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-orange-600 transition"
              >
                {locations.map(l => (
                  <option key={l} value={l}>{l === "all" ? "All Locations" : l}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(filters.breed !== "all" || filters.age !== "all" || filters.gender !== "all" || filters.location !== "all") && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-3 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <div className="container mx-auto px-6 py-16">
        {filteredPets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-100 hover:border-orange-400 transition-all duration-500 group">
                <div className="relative h-80 overflow-hidden">
                  <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
                    Ready for Adoption
                  </div>
                  <FaHeart className="absolute top-4 right-4 text-5xl text-white/70 group-hover:text-red-500 group-hover:scale-125 transition-all duration-500" />
                </div>

                <div className="p-8 bg-gradient-to-b from-orange-50 to-white">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    {pet.name}
                    {pet.gender === "Male" ? <FaVenusMars className="text-blue-600" /> : <FaVenusMars className="text-pink-600" />}
                  </h2>
                  <p className="text-xl text-orange-700 font-semibold mt-1">{pet.breed}</p>

                  <div className="mt-6 space-y-3 text-gray-700">
                    <p className="flex items-center gap-3"><FaCalendarAlt className="text-orange-600" /> Age: {pet.age}</p>
                    <p className="flex items-center gap-3"><FaMapMarkerAlt className="text-orange-600" /> {pet.location}</p>
                    {pet.vaccinated && <p className="flex items-center gap-3 text-green-600 font-medium"><FaUserCheck /> Fully Vaccinated</p>}
                  </div>

                  <p className="mt-6 text-gray-600 italic leading-relaxed">"{pet.story}"</p>

                  <div className="mt-8 flex flex-col gap-4">
                    <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3">
                      <FaHeart /> I'm Interested!
                    </button>
                    <a href={`tel:${pet.contact}`} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3">
                      <FaPhoneAlt /> Call Now: {pet.contact}
                    </a>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4">Adoption is free • Home visit may be required</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaPaw className="text-9xl text-orange-200 mx-auto mb-6 opacity-50" />
            <p className="text-3xl font-bold text-gray-600">No pets match your filters</p>
            <button onClick={clearFilters} className="mt-6 text-orange-600 hover:text-orange-800 font-bold text-xl underline">
              Clear filters and see all pets
            </button>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="bg-orange-100 py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Our adoption counselors are here to help match you with your perfect companion.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
            Get Free Adoption Guidance
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default PetAdoptions;