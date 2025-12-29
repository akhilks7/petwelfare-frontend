import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaFilter, FaTimes, FaWhatsapp, FaPhoneAlt,
  FaVenusMars, FaCalendarAlt, FaMapMarkerAlt, FaHeart
} from "react-icons/fa";
import { handlegetdonatepets } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

function PetAdoptions() {
  const [filters, setFilters] = useState({
    breed: "all",
    age: "all",
    gender: "all",
    location: "all"
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  const [petsForDonate, setpetsForDonate] = useState([]);
  const [token, settoken] = useState("");

  // Fetch pets
  const getallpetsforDonate = async () => {
    if (!token) return;
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetdonatepets(reqheader);
      const data = result?.data || [];
      setpetsForDonate(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setpetsForDonate([]);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) settoken(stored);
  }, []);

  useEffect(() => {
    if (token) getallpetsforDonate();
  }, [token]);

  // Extract unique values for filters
  const breeds = ["all", ...new Set(petsForDonate.map(p => p.breed).filter(Boolean))];
  const locations = ["all", ...new Set(petsForDonate.map(p => p.location).filter(Boolean))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ breed: "all", age: "all", gender: "all", location: "all" });
  };

  // Filter logic
  const filteredPets = petsForDonate.filter(pet => {
    const ageNum = parseInt(pet.age) || 0;
    return (
      (filters.breed === "all" || pet.breed === filters.breed) &&
      (filters.age === "all" ||
        (filters.age === "puppy" && (pet.age?.includes("month") || ageNum < 1)) ||
        (filters.age === "young" && ageNum >= 1 && ageNum <= 3) ||
        (filters.age === "adult" && ageNum > 3)
      ) &&
      (filters.gender === "all" || pet.gender?.toLowerCase() === filters.gender) &&
      (filters.location === "all" || pet.location === filters.location)
    );
  });

  const openPetModal = (pet) => {
    setCurrentImageIndex(0);
    setSelectedPet(pet);
  };

  return (
    <>
      <Header />

      {/* Compact Filter Bar */}
      <div className="bg-orange-50 border-b-4 border-orange-400 sticky top-23 z-40 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <div className="flex items-center gap-2 text-orange-800 font-bold">
              <FaFilter className="text-xl" />
              <span className="text-lg">Filters</span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                {filteredPets.length} Pets
              </span>
            </div>

            <select
              value={filters.breed}
              onChange={(e) => handleFilterChange("breed", e.target.value)}
              className="px-4 py-2 bg-white border-2 border-orange-300 rounded-lg text-sm"
            >
              {breeds.map(b => (
                <option key={b} value={b}>{b === "all" ? "All Breeds" : b}</option>
              ))}
            </select>

            <select
              value={filters.age}
              onChange={(e) => handleFilterChange("age", e.target.value)}
              className="px-4 py-2 bg-white border-2 border-orange-300 rounded-lg text-sm"
            >
              <option value="all">All Ages</option>
              <option value="puppy">Puppies (&lt;1 yr)</option>
              <option value="young">Young (1-3 yrs)</option>
              <option value="adult">Adult (3+ yrs)</option>
            </select>

            <select
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              className="px-4 py-2 bg-white border-2 border-orange-300 rounded-lg text-sm"
            >
              <option value="all">Any Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="px-4 py-2 bg-white border-2 border-orange-300 rounded-lg text-sm"
            >
              {locations.map(l => (
                <option key={l} value={l}>{l === "all" ? "All Locations" : l}</option>
              ))}
            </select>

            {(filters.breed !== "all" || filters.age !== "all" || filters.gender !== "all" || filters.location !== "all") && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 flex items-center gap-1"
              >
                <FaTimes /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Compact Pet Grid */}
      <div className="container mx-auto px-4 py-20 mt-10">
        {filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <FaPaw className="text-8xl text-orange-200 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 font-semibold">No pets available right now</p>
            <p className="text-gray-500 mt-2">Try adjusting filters or check back later!</p>
            <button onClick={clearFilters} className="mt-6 text-orange-600 hover:text-orange-800 font-bold underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => {
              const firstPhoto = pet.photos && pet.photos.length > 0 ? pet.photos[0] : null;

              return (
                <div
                  key={pet._id}
                  onClick={() => openPetModal(pet)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-100 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48 bg-gray-100">
                    {firstPhoto ? (
                      <img
                        src={`${SERVERURL}/uploadImages/${firstPhoto}`}
                        alt={pet.petname}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaPaw className="text-5xl text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white font-bold text-sm">Free Adoption</p>
                    </div>
                    {pet.photos && pet.photos.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{pet.photos.length - 1}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{pet.petname || "Sweet Pet"}</h3>
                    <p className="text-orange-600 text-sm truncate">{pet.breed}</p>
                    <p className="text-gray-600 text-xs mt-1 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {pet.location}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Compact & Elegant Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPet(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-6 border-orange-500"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg z-10"
            >
              <FaTimes />
            </button>

            {/* Image Carousel */}
            {selectedPet.photos && selectedPet.photos.length > 0 ? (
              <div className="relative">
                <div className="overflow-hidden rounded-t-3xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {selectedPet.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={`${SERVERURL}/uploadImages/${photo}`}
                        alt={`${selectedPet.petname} - ${index + 1}`}
                        className="w-full h-72 object-contain flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>

                {selectedPet.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === 0 ? selectedPet.photos.length - 1 : prev - 1);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === selectedPet.photos.length - 1 ? 0 : prev + 1);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedPet.photos.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white w-8" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-72 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center rounded-t-3xl">
                <FaPaw className="text-7xl text-orange-400 opacity-50" />
              </div>
            )}

            {/* Pet Details */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{selectedPet.petname}</h2>
              <p className="text-xl text-orange-600 font-semibold text-center mb-4">{selectedPet.breed}</p>

              <div className="grid grid-cols-2 gap-4 text-center py-4 border-y border-orange-100">
                <div>
                  <FaVenusMars className="text-2xl text-pink-600 mx-auto mb-1" />
                  <p className="font-semibold">{selectedPet.gender}</p>
                </div>
                <div>
                  <FaCalendarAlt className="text-2xl text-blue-600 mx-auto mb-1" />
                  <p className="font-semibold">{selectedPet.age}</p>
                </div>
                <div>
                  <FaMapMarkerAlt className="text-2xl text-red-600 mx-auto mb-1" />
                  <p className="font-semibold">{selectedPet.location}</p>
                </div>
                <div>
                  <FaHeart className="text-2xl text-green-600 mx-auto mb-1" />
                  <p className="font-semibold">Ready to Love</p>
                </div>
              </div>

              {selectedPet.bio && (
                <p className="text-gray-700 text-center mt-6 italic leading-relaxed px-4">
                  "{selectedPet.bio}"
                </p>
              )}

              <p className="text-center text-green-600 font-bold text-2xl mt-8 mb-6">
                Free Adoption ❤️
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${selectedPet.contactno}?text=${encodeURIComponent(
                    `Hi! I'm interested in adopting ${selectedPet.petname} (${selectedPet.breed}). Is he/she still available?`
                  )}`}  
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition"
                >
                  <FaWhatsapp className="text-2xl" />
                  Chat on WhatsApp
                </a>

                <a
                  href={`tel:${selectedPet.contactno}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition"
                >
                  <FaPhoneAlt className="text-xl" />
                  Call Now
                </a>
              </div>

              <p className="text-center text-gray-500 text-sm mt-6">
                Home visit may be required • Adoption is completely free
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-r from-orange-100 to-amber-100 py-16 text-center">
        <div className="container mx-auto px-6">
          <FaHeart className="text-7xl text-orange-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Give a Forever Home?</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Every adoption saves a life. These loving pets are waiting for someone like you.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105">
            Browse All Pets
          </button>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default PetAdoptions;