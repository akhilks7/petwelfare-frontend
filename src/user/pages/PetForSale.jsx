import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaSearch, FaTimes, FaRupeeSign, FaVenusMars,
  FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaShieldAlt,
  FaWhatsapp, FaDog, FaStethoscope, FaShoppingCart, FaQrcode, FaUniversity
} from "react-icons/fa";

function PetForSale() {
  const [searchTerm, setSearchTerm] = useState("");
  const [breedFilter, setBreedFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedPet, setSelectedPet] = useState(null);

  const petsForSale = [ /* your pet data - same as before */ 
    { id: 1, name: "Max", breed: "Golden Retriever", age: "8 weeks", gender: "Male", price: 32000, location: "Kochi", vaccinated: true, dewormed: true, microchipped: true, kciRegistered: true, breederVerified: true, description: "Purebred Golden Retriever from champion bloodline.", mainImage: "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg", breeder: "Sunshine Kennels", whatsapp: "https://wa.me/919876543210" },
    { id: 2, name: "Bella", breed: "Persian Cat", age: "10 weeks", gender: "Female", price: 22000, location: "Ernakulam", mainImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg", breeder: "Royal Cats", whatsapp: "https://wa.me/919876543211" },
    { id: 3, name: "Rocky", breed: "German Shepherd", age: "9 weeks", gender: "Male", price: 38000, location: "Thrissur", mainImage: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg", breeder: "Elite Kennel", whatsapp: "https://wa.me/919876543212" },
    { id: 4, name: "Muffin", breed: "Shih Tzu", age: "7 weeks", gender: "Female", price: 25000, location: "Aluva", mainImage: "https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg", breeder: "Little Paws", whatsapp: "https://wa.me/919876543213" },
    { id: 5, name: "Leo", breed: "Beagle", age: "10 weeks", gender: "Male", price: 28000, location: "Kochi", mainImage: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg", breeder: "Happy Hounds", whatsapp: "https://wa.me/919876543214" }
  ].map(pet => ({ ...pet, breederVerified: true }));

  const filteredPets = petsForSale.filter(pet => {
    const match = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  pet.location.toLowerCase().includes(searchTerm.toLowerCase());
    const breedMatch = breedFilter === "all" || pet.breed === breedFilter;
    const priceMatch = priceRange === "all" ||
      (priceRange === "under25" && pet.price < 25000) ||
      (priceRange === "25to35" && pet.price >= 25000 && pet.price <= 35000) ||
      (priceRange === "above35" && pet.price > 35000);
    return match && breedMatch && priceMatch;
  });

  return (
    <>
      <Header />

      {/* Compact Search Bar */}
      <div className="bg-orange-50 border-b-4 border-orange-400 sticky top-0 z-40 shadow-md mt-25">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600" />
              <input
                type="text"
                placeholder="Search breed, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-orange-300 rounded-xl text-sm focus:border-orange-600 focus:outline-none"
              />
            </div>
            <select value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}
              className="px-4 py-3 bg-white border-2 border-orange-300 rounded-xl text-sm">
              <option value="all">All Breeds</option>
              {[...new Set(petsForSale.map(p => p.breed))].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {(searchTerm || breedFilter !== "all") && (
              <button onClick={() => { setSearchTerm(""); setBreedFilter("all"); }}
                className="px-4 py-3 bg-red-100 text-red-700 rounded-xl text-sm font-medium flex items-center gap-2">
                <FaTimes className="text-xs" /> Clear
              </button>
            )}
          </div>
          <p className="text-center text-orange-800 font-semibold text-lg mt-3">
            {filteredPets.length} Pet{filteredPets.length !== 1 ? 's' : ''} Available
          </p>
        </div>
      </div>

      {/* Compact Pet Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-100 hover:border-orange-400 transition-all hover:shadow-xl">
              {pet.breederVerified && (
                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 z-10">
                  <FaShieldAlt className="text-xs" /> Verified
                </div>
              )}
              <div className="relative h-56 overflow-hidden">
                <img src={pet.mainImage} alt={pet.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-bold">
                  ₹{pet.price.toLocaleString()}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 flex items-center justify-between">
                  {pet.name}
                  <FaVenusMars className={`text-lg ${pet.gender === "Male" ? "text-blue-600" : "text-pink-600"}`} />
                </h3>
                <p className="text-orange-700 font-semibold text-sm mt-1">{pet.breed}</p>
                <div className="text-xs text-gray-600 mt-2 space-y-1">
                  <p className="flex items-center gap-2"><FaCalendarAlt /> {pet.age}</p>
                  <p className="flex items-center gap-2"><FaMapMarkerAlt /> {pet.location}</p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => setSelectedPet({ ...pet, showPayment: true })}
                    className="flex-1 bg-grid bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
                  >
                    <FaShoppingCart /> Buy Now
                  </button>
                  <button onClick={() => setSelectedPet(pet)}
                    className="px-5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Detail Modal */}
      {selectedPet && !selectedPet.showPayment && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPet(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-screen overflow-y-auto border-4 border-orange-400" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedPet(null)} className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2">
              <FaTimes />
            </button>

            <img src={selectedPet.mainImage} alt={selectedPet.name} className="w-full h-64 object-cover rounded-t-2xl" />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedPet.name} ({selectedPet.breed})</h2>
                  <p className="text-orange-700 font-bold text-xl mt-1">₹{selectedPet.price.toLocaleString()}</p>
                </div>
                <FaVenusMars className={`text-3xl ${selectedPet.gender === "Male" ? "text-blue-600" : "text-pink-600"}`} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><strong>Age:</strong> {selectedPet.age}</p>
                <p><strong>Location:</strong> {selectedPet.location}</p>
                <p><strong>Breeder:</strong> {selectedPet.breeder}</p>
                <p><strong>Gender:</strong> {selectedPet.gender}</p>
              </div>

              <p className="text-gray-700 mt-4 text-sm leading-relaxed">{selectedPet.description}</p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSelectedPet({ ...selectedPet, showPayment: true })}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition"
                >
                  Buy Now - ₹{selectedPet.price.toLocaleString()}
                </button>
                <a href={selectedPet.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center gap-2">
                  <FaWhatsapp /> Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Payment Modal */}
      {selectedPet?.showPayment && (
  <div 
    className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-3"
    onClick={() => setSelectedPet(null)}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-[320px] border-4 border-green-500 relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Floating Close Button */}
      <button
        onClick={() => setSelectedPet(null)}
        className="absolute -top-4 -right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-2xl transition-all z-10"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Green Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white text-center py-4 rounded-t-xl">
        <FaCheckCircle className="text-4xl mx-auto mb-1" />
        <h3 className="text-base font-bold">Payment Confirmed!</h3>
      </div>

      {/* Compact Body */}
      <div className="p-4 space-y-4 text-center">

        {/* Pet Photo + Name */}
        <div className="space-y-2">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-orange-300 shadow-lg">
            <img 
              src={selectedPet.mainImage} 
              alt={selectedPet.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-lg">{selectedPet.name}</h4>
            <p className="text-orange-700 text-xs font-semibold">
              {selectedPet.breed} • {selectedPet.age}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-4 border-2 border-orange-400">
          <p className="text-xs text-gray-600 font-medium">Total Amount Paid</p>
          <p className="text-2xl font-bold text-orange-700 mt-1">
            ₹{selectedPet.price.toLocaleString()}
          </p>
        </div>

        {/* Payment Info - Super Compact */}
        <div className="text-xs bg-gray-50 rounded-lg p-3 border border-gray-200 space-y-1">
          <p className="font-bold text-gray-800 text-sm">Paid to:</p>
          <p><strong>UPI:</strong> pethub@ybl</p>
          <p><strong>Name:</strong> PetHub India</p>
        </div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/919876543210?text=Hi!%20I%20just%20paid%20₹${selectedPet.price}%20for%20${encodeURIComponent(selectedPet.name)}%20(${selectedPet.breed}).%20Please%20confirm%20my%20booking!%20%F0%9F%90%95%F0%9F%94%A5`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold text-base py-4 rounded-xl shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <FaWhatsapp className="text-2xl" />
          Send Proof on WhatsApp
        </a>

        {/* Final Note */}
        <p className="text-xs text-gray-500 font-medium pb-2">
          We’ll call you in 5–10 mins to confirm delivery
        </p>
      </div>
    </div>
  </div>
)}

      <Footer />
    </>
  );
}

export default PetForSale;