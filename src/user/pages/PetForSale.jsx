import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaSearch, FaTimes, FaRupeeSign, FaVenusMars,
  FaCalendarAlt, FaMapMarkerAlt, FaWhatsapp
} from "react-icons/fa";
import { handlegetsellingpets, UsermakePaymentAPI } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";
import { loadStripe } from '@stripe/stripe-js'

function PetForSale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [breedFilter, setBreedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedPet, setSelectedPet] = useState(null);
  console.log(selectedPet);
  
  const [petsForSale, setpetsForSale] = useState([]);
  const [token, settoken] = useState("");

  // Fetch pets
  const getallpetsforsale = async () => {
    if (!token) return;
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetsellingpets(reqheader);
      const data = result?.data || result || [];
      setpetsForSale(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setpetsForSale([]);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) settoken(stored);
  }, []);

  useEffect(() => {
    if (token) getallpetsforsale();
  }, [token]);

  const handlePurchase = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const stripe = await loadStripe('pk_test_51ScgPrRrgaoh7X1VpdVAGLEgpDROZqZsNanWzU2Hr9psnzko8TuH2ZQ1Jagk4dzZgWcvNecXhO1DQhSaCIeI0SU0004TAhwiix');
    console.log(stripe);
    try {
      if (!selectedPet) return;
      const result = await UsermakePaymentAPI(selectedPet, reqHeader)
      console.log(result);
      const checkouturl = result.data.checkoutSessionurl

      if (checkouturl) {
        window.location.href = checkouturl;
      }
    } catch (error) {
      console.log(error);

    }


  }

  // Filter Logic
  const filteredPets = petsForSale.filter(pet => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      (pet.petname || "").toLowerCase().includes(searchLower) ||
      (pet.breed || "").toLowerCase().includes(searchLower) ||
      (pet.animaltype || "").toLowerCase().includes(searchLower) ||
      (pet.location || "").toLowerCase().includes(searchLower);

    const matchesBreed = breedFilter === "all" || pet.breed === breedFilter;

    const price = Number(pet.price) || 0;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under25" && price > 0 && price < 25000) ||
      (priceRange === "25to50" && price >= 25000 && price <= 50000) ||
      (priceRange === "above50" && price > 50000);

    return matchesSearch && matchesBreed && matchesPrice;
  });

  const uniqueBreeds = [...new Set(petsForSale.map(p => p.breed).filter(Boolean))];

  const openPetModal = (pet) => {
    setCurrentImageIndex(0);
    setSelectedPet(pet);
  };

  return (
    <>
      <Header />

      {/* Compact Search & Filters */}
      <div className="bg-orange-50 border-b-4 border-orange-400 sticky top-23 z-40 shadow-md">
        <div className="container mx-auto px-4 py-1 pt-3">
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 text-lg" />
              <input
                type="text"
                placeholder="Search pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-2 w-64 bg-white border-2 border-orange-300 rounded-xl focus:border-orange-600 outline-none"
              />
            </div>

            <select
              value={breedFilter}
              onChange={(e) => setBreedFilter(e.target.value)}
              className="px-5 py-2 bg-white border-2 border-orange-300 rounded-xl"
            >
              <option value="all">All Breeds</option>
              {uniqueBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-5 py-2 bg-white border-2 border-orange-300 rounded-xl"
            >
              <option value="all">All Prices</option>
              <option value="under25">Under ₹25k</option>
              <option value="25to50">₹25k - ₹50k</option>
              <option value="above50">Above ₹50k</option>
            </select>

            {(searchTerm || breedFilter !== "all" || priceRange !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setBreedFilter("all");
                  setPriceRange("all");
                }}
                className="px-4 py-3 bg-red-100 text-red-700 rounded-xl font-medium flex items-center gap-2 hover:bg-red-200"
              >
                <FaTimes /> Clear
              </button>
            )}
          </div>

          <p className="text-center text-orange-800 font-bold mt-2">
            {filteredPets.length} Pet{filteredPets.length !== 1 ? 's' : ''} Available
          </p>
        </div>
      </div>

      {/* Compact Pet Grid */}
      <div className="container mx-auto px-4 py-30">
        {filteredPets.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FaPaw className="text-7xl mx-auto mb-4 opacity-30" />
            <p className="text-2xl">No pets found</p>
            <p className="mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => {
              const firstPhoto = pet.photos && pet.photos.length > 0 ? pet.photos[0] : null;

              return (
                <div
                  key={pet._id}
                  onClick={() => openPetModal(pet)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-200 hover:border-orange-500 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
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

                    {/* Price Badge */}
                    <div className="absolute top-2 right-2 bg-black/80 text-white px-3 py-1 rounded-lg font-bold text-sm">
                      ₹{Number(pet.price).toLocaleString("en-IN")}
                    </div>

                    {/* Multiple Photos Indicator */}
                    {pet.photos && pet.photos.length > 1 && (
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{pet.photos.length - 1} more
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{pet.petname}</h3>
                    <p className="text-orange-600 text-sm truncate">{pet.breed}</p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600 text-xs">
                      <FaMapMarkerAlt />
                      <span className="truncate">{pet.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed Modal with Carousel */}

      {selectedPet && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPet(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-6 border-orange-500 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl z-10 shadow-lg"
            >
              <FaTimes />
            </button>

            {/* Image Carousel - Smaller Height */}
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
                          className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-8" : "bg-white/60"
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

            {/* Pet Info - Compact Layout */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{selectedPet.petname}</h2>
                  <p className="text-xl text-orange-600 font-semibold mt-1">{selectedPet.breed}</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-extrabold text-green-600">
                    ₹{Number(selectedPet.price).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Compact Info Grid */}
              <div className="grid grid-cols-2 gap-5 py-5 border-y-2 border-orange-100 text-center">
                <div>
                  <FaVenusMars className="text-2xl text-pink-600 mx-auto mb-1" />
                  <p className="font-semibold text-gray-700">{selectedPet.gender}</p>
                </div>
                <div>
                  <FaCalendarAlt className="text-2xl text-blue-600 mx-auto mb-1" />
                  <p className="font-semibold text-gray-700">{selectedPet.age}</p>
                </div>
                <div>
                  <FaMapMarkerAlt className="text-2xl text-red-600 mx-auto mb-1" />
                  <p className="font-semibold text-gray-700">{selectedPet.location}</p>
                </div>
                <div>
                  <FaPaw className="text-2xl text-purple-600 mx-auto mb-1" />
                  <p className="font-semibold text-gray-700">Verified</p>
                </div>
              </div>

              {/* Description */}
              {selectedPet.bio && (
                <div className="my-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">About this Pet</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPet.bio}</p>
                </div>
              )}

              {/* Action Buttons - Compact */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {setSelectedPet({ ...selectedPet, showPayment: true }),handlePurchase(),getallpetsforsale()}}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <FaRupeeSign className="text-xl" />
                  Buy Now
                </button>

                <a
                  href={`https://wa.me/+916235452818?text=${encodeURIComponent(
                    `Hi! I'm interested in ${selectedPet.petname} (${selectedPet.breed}) - ₹${selectedPet.price}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-2xl" />
                  Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success */}
      {/* {selectedPet?.showPayment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full text-center border-8 border-green-500">
            <button onClick={() => setSelectedPet(null)} className="absolute top-4 right-4 text-red-600 text-4xl">×</button>
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-10 rounded-t-3xl">
              <FaPaw className="text-7xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold">Payment Successful!</h3>
            </div>
            <div className="p-8">
              {selectedPet.photos?.[0] && (
                <img
                  src={`${SERVERURL}/uploadImages/${selectedPet.photos[0]}`}
                  alt={selectedPet.petname}
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-orange-400 shadow-xl"
                />
              )}
              <h4 className="text-3xl font-bold">{selectedPet.petname}</h4>
              <p className="text-2xl text-orange-600 mt-2">{selectedPet.breed}</p>
              <p className="text-4xl font-extrabold text-green-600 mt-6">
                ₹{Number(selectedPet.price).toLocaleString("en-IN")}
              </p>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(`Payment done for ${selectedPet.petname} - ₹${selectedPet.price}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 bg-green-600 hover:bg-green-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl"
              >
                Send Proof on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </>
  );
}

export default PetForSale;