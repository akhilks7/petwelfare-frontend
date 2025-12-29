import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaMapMarkerAlt, FaSearch, FaTimes, FaPhoneAlt,
  FaCalendarAlt, FaVenusMars, FaWhatsapp
} from "react-icons/fa";
import { handlegetfoundpets } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

function FoundPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  const [foundPets, setFoundPets] = useState([]);
  const [token, setToken] = useState("");

  // Fetch found pets
  const getallfoundpets = async () => {
    if (!token) return;
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetfoundpets(reqheader);
      const data = result?.data || [];
      setFoundPets(data.filter(pet => pet.petfor === "found"));
    } catch (error) {
      console.error("Error fetching found pets:", error);
      setFoundPets([]);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) getallfoundpets();
  }, [token]);

  // Unique locations
  const locations = ["all", ...new Set(foundPets.map(pet => pet.location).filter(Boolean))];

  // Filter logic
  const filteredPets = foundPets.filter(pet => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (pet.petname || "").toLowerCase().includes(searchLower) ||
      (pet.breed || "").toLowerCase().includes(searchLower) ||
      (pet.location || "").toLowerCase().includes(searchLower) ||
      (pet.identification || "").toLowerCase().includes(searchLower);

    const matchesLocation = locationFilter === "all" || (pet.location || "").includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  const openPetModal = (pet) => {
    setCurrentImageIndex(0);
    setSelectedPet(pet);
  };

  return (
    <>
      <Header />

      {/* Compact Green Search Bar */}
      <div className="bg-green-50 border-b-8 border-green-600 sticky top-23 z-40 shadow-xl">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg" />
              <input
                type="text"
                placeholder="Search name, breed, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-5 py-2 w-72 bg-white border-2 border-green-300 rounded-xl focus:border-green-600 outline-none shadow-md"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-5 py-2 bg-white border-2 border-green-300 rounded-xl"
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
                className="px-5 py-2 bg-red-100 text-red-700 rounded-xl font-bold flex items-center gap-2 hover:bg-red-200"
              >
                <FaTimes /> Clear
              </button>
            )}
          </div>

          <p className="text-center text-green-800 font-bold text-xl mt-2">
            {filteredPets.length} Found Pet{filteredPets.length !== 1 ? 's' : ''} – Help Reunite!
          </p>
        </div>
      </div>

      {/* Compact Grid */}
      <div className="container mx-auto px-4 py-10 mt-17">
        {filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <FaPaw className="text-8xl text-green-200 mx-auto mb-6 opacity-40" />
            <p className="text-2xl text-gray-600 font-semibold">No found pets right now</p>
            <p className="text-gray-500 mt-2">Check back soon — new reports appear daily!</p>
          </div>
        ) : (
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => {
              const firstPhoto = pet.photos && pet.photos.length > 0 ? pet.photos[0] : null;

              return (
                <div
                  key={pet._id}
                  onClick={() => openPetModal(pet)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-green-200 hover:border-green-600 transition-all duration-300 cursor-pointer group"
                >
                  {/* Safe Found Tag */}
                  <div className="bg-green-600 text-white text-center py-2 font-bold text-sm">
                    FOUND SAFE
                  </div>

                  {/* Image */}
                  <div className="relative h-52 bg-gray-100">
                    {firstPhoto ? (
                      <img
                        src={`${SERVERURL}/uploadImages/${firstPhoto}`}
                        alt={pet.petname || "Found pet"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaPaw className="text-5xl text-gray-300" />
                      </div>
                    )}

                    {/* Multiple Photos Badge */}
                    {pet.photos && pet.photos.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{pet.photos.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{pet.petname || "Sweet Pet"}</h3>
                    <p className="text-green-600 text-sm truncate">{pet.breed}</p>
                    <p className="text-gray-600 text-xs mt-2 flex items-center justify-center gap-1">
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

      {/* Compact & Hopeful Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPet(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-green-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-3 right-3 bg-red-700 hover:bg-red-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg z-10"
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
                        className="w-full h-72 object-cover flex-shrink-0"
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
              <div className="h-72 bg-green-100 flex items-center justify-center rounded-t-3xl">
                <FaPaw className="text-7xl text-green-300 opacity-50" />
              </div>
            )}

            {/* Details */}
            <div className="p-6 text-center">
              <div className="bg-green-600 text-white py-3 rounded-2xl font-bold text-xl mb-6">
                FOUND SAFE & WAITING
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedPet.petname || "Loving Pet"}</h2>
              <p className="text-2xl text-green-700 font-semibold">{selectedPet.breed}</p>

              <div className="grid grid-cols-2 gap-6 py-6 border-y-2 border-green-200">
                <div>
                  <FaVenusMars className="text-3xl text-pink-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.gender}</p>
                </div>
                <div>
                  <FaCalendarAlt className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.age || "Unknown"}</p>
                </div>
                <div>
                  <FaMapMarkerAlt className="text-3xl text-green-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.location}</p>
                </div>
                <div>
                  <FaPaw className="text-3xl text-purple-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">Safe & Cared For</p>
                </div>
              </div>

              {selectedPet.identification && (
                <div className="my-6 bg-green-50 p-5 rounded-2xl border-l-4 border-green-600">
                  <h3 className="font-bold text-xl text-green-800 mb-2">Identification Marks</h3>
                  <p className="text-gray-800 leading-relaxed">"{selectedPet.identification}"</p>
                </div>
              )}

              {selectedPet.contactno && (
                <div className="mt-8 space-y-4">
                  {/* Call Button */}
                  <a
                    href={`tel:${selectedPet.contactno}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaPhoneAlt className="text-3xl" />
                    CALL FINDER NOW
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${selectedPet.contactno.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi! I believe this is my pet "${selectedPet.petname}" (${selectedPet.breed}) found in ${selectedPet.location}. Please contact me!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-3xl" />
                    MESSAGE ON WHATSAPP
                  </a>

                  <p className="text-center text-gray-600 mt-4 font-medium text-lg">
                    {selectedPet.contactno}
                  </p>
                </div>
              )}

              <p className="text-center text-green-700 font-bold text-lg mt-8">
                This pet is safe and waiting to go home ❤️
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hopeful CTA */}
      {/* <section className="bg-gradient-to-b from-green-100 to-green-50 py-16 text-center">
        <div className="container mx-auto px-6">
          <FaPaw className="text-8xl text-green-600 mx-auto mb-6" />
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Found a Stray Pet?</h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            You're doing an amazing thing — report it now so we can help find their family.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-2xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-green-600/50 transform hover:scale-110 transition-all">
            Report Found Pet
          </button>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default FoundPets;