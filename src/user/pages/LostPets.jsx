import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaMapMarkerAlt, FaSearch, FaTimes, FaPhoneAlt,
  FaCalendarAlt, FaClock, FaVenusMars,
  FaWhatsapp
} from "react-icons/fa";
import { handlegetlostpets } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

function LostPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);

  const [lostPets, setLostPets] = useState([]);
  const [token, setToken] = useState("");

  // Fetch lost pets
  const getalllostpets = async () => {
    if (!token) return;
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetlostpets(reqheader);
      const data = result?.data || [];
      setLostPets(data.filter(pet => pet.petfor === "lost"));
    } catch (error) {
      console.error("Error fetching lost pets:", error);
      setLostPets([]);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) getalllostpets();
  }, [token]);

  // Unique locations for filter
  const locations = ["all", ...new Set(lostPets.map(pet => pet.location).filter(Boolean))];

  // Filter logic
  const filteredPets = lostPets.filter(pet => {
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

      {/* Compact Urgent Search Bar */}
      <div className="bg-red-50 border-b-8 border-red-600 sticky top-23 z-40 shadow-xl">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 text-lg" />
              <input
                type="text"
                placeholder="Search name, breed, area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-5 py-2 w-72 bg-white border-2 border-red-300 rounded-xl focus:border-red-600 outline-none shadow-md"
              />
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-5 py-2 bg-white border-2 border-red-300 rounded-xl"
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

          <p className="text-center text-red-800 font-bold text-xl mt-2">
            ⚠️ {filteredPets.length} Missing Pet{filteredPets.length !== 1 ? 's' : ''} – Help Bring Them Home!
          </p>
        </div>
      </div>

      {/* Compact Grid */}
      <div className="container mx-auto px-4 py-10 mt-17">
        {filteredPets.length === 0 ? (
          <div className="text-center py-20">
            <FaPaw className="text-8xl text-red-200 mx-auto mb-6 opacity-40" />
            <p className="text-2xl text-gray-600 font-semibold">No active missing pet alerts</p>
            <p className="text-gray-500 mt-2">Check back soon or adjust filters</p>
          </div>
        ) : (
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => {
              const firstPhoto = pet.photos && pet.photos.length > 0 ? pet.photos[0] : null;

              return (
                <div
                  key={pet._id}
                  onClick={() => openPetModal(pet)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-red-200 hover:border-red-600 transition-all duration-300 cursor-pointer group"
                >
                  {/* Urgent Tag */}
                  <div className="bg-red-600 text-white text-center py-2 font-bold text-sm">
                    MISSING
                  </div>

                  {/* Image */}
                  <div className="relative h-52 bg-gray-100">
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

                    {/* Multiple Photos Badge */}
                    {pet.photos && pet.photos.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{pet.photos.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{pet.petname || "Unknown Pet"}</h3>
                    <p className="text-red-600 text-sm truncate">{pet.breed}</p>
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

      {/* Compact & Urgent Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPet(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-red-600"
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
                          className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-8" : "bg-white/60"
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-72 bg-red-100 flex items-center justify-center rounded-t-3xl">
                <FaPaw className="text-7xl text-red-300 opacity-50" />
              </div>
            )}

            {/* Details */}
            <div className="p-6 text-center">
              <div className="bg-red-600 text-white py-3 rounded-2xl font-bold text-xl mb-6">
                MISSING PET ALERT
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedPet.petname || "Unknown Pet"}</h2>
              <p className="text-2xl text-red-700 font-semibold">{selectedPet.breed}</p>

              <div className="grid grid-cols-2 gap-6 py-6 border-y-2 border-red-200">
                <div>
                  <FaVenusMars className="text-3xl text-pink-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.gender}</p>
                </div>
                <div>
                  <FaCalendarAlt className="text-3xl text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.age || "Unknown"}</p>
                </div>
                <div>
                  <FaMapMarkerAlt className="text-3xl text-red-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedPet.location}</p>
                </div>
                <div>
                  <FaClock className="text-3xl text-orange-600 mx-auto mb-2 animate-pulse" />
                  <p className="font-bold text-lg">Urgent</p>
                </div>
              </div>

              {selectedPet.identification && (
                <div className="my-6 bg-red-50 p-5 rounded-2xl border-l-4 border-red-600">
                  <h3 className="font-bold text-xl text-red-800 mb-2">Identification Marks</h3>
                  <p className="text-gray-800 leading-relaxed">"{selectedPet.identification}"</p>
                </div>
              )}

              {selectedPet.contactno && (
                <div className="mt-8 space-y-4">
                  {/* Call Button */}
                  <a
                    href={`tel:${selectedPet.contactno}`}
                    className="block w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaPhoneAlt className="text-3xl" />
                    CALL OWNER NOW
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${selectedPet.contactno.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi! I think I saw your missing pet "${selectedPet.petname}" (${selectedPet.breed}) near ${selectedPet.location}. Please contact me urgently!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-3xl" />
                    MESSAGE ON WHATSAPP
                  </a>

                  {/* Contact Number Display */}
                  <p className="text-center text-gray-600 mt-4 font-medium text-lg">
                    {selectedPet.contactno}
                  </p>
                </div>
              )}

              <p className="text-center text-red-700 font-bold text-lg mt-8">
                ⚠️ If seen: Do NOT chase • Take photo • Call immediately
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Urgent CTA */}
      {/* <section className="bg-gradient-to-b from-red-100 to-red-50 py-16 text-center">
        <div className="container mx-auto px-6">
          <FaPaw className="text-8xl text-red-600 mx-auto mb-6 animate-pulse" />
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Is Your Pet Missing?</h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            Report your missing pet immediately — every minute counts.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-2xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-red-600/50 transform hover:scale-110 transition-all animate-pulse">
            Report Missing Pet Now
          </button>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default LostPets;