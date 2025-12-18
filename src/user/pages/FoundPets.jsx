import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaPaw, FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaFilter, FaTimes, FaPhoneAlt } from "react-icons/fa";

function FoundPets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  // Sample Found Pets Data
  const foundPets = [
    {
      id: 1,
      name: "Found Puppy",
      breed: "Mixed Breed",
      gender: "Male",
      age: "Approx 3 months",
      location: "Vyttila Junction, Kochi",
      foundDate: "Today, 2 hours ago",
      description: "Very friendly golden puppy found near bus stop. No collar.",
      image: "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg",
      contact: "+91 81234 56789"
    },
    {
      id: 2,
      name: "White Cat",
      breed: "Persian",
      gender: "Female",
      age: "Adult",
      location: "Palace Road, Ernakulam",
      foundDate: "Yesterday",
      description: "Beautiful white cat with blue eyes. Seems well-groomed and lost.",
      image: "https://images.pexels.com/photos/1569348/pexels-photo-1569348.jpeg",
      contact: "+91 81234 56790"
    },
    {
      id: 3,
      name: "Brown Dog",
      breed: "Labrador Mix",
      gender: "Male",
      age: "1 year",
      location: "Lulu Mall Area",
      foundDate: "2 days ago",
      description: "Sweet brown dog with black collar (no tag). Loves people!",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      contact: "+91 81234 56791"
    },
    {
      id: 4,
      name: "Black Kitten",
      breed: "Indie Cat",
      gender: "Unknown",
      age: "2 months",
      location: "Marine Drive",
      foundDate: "3 days ago",
      description: "Tiny scared kitten hiding under a car. Very cute!",
      image: "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg",
      contact: "+91 81234 56792"
    }
  ];

  const locations = ["all", "Vyttila Junction, Kochi", "Palace Road, Ernakulam", "Lulu Mall Area", "Marine Drive"];

  // Filter Logic
  const filteredPets = foundPets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || pet.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  return (
    <>
      <Header />

      

      {/* Search & Filter Bar */}
      <div className="bg-green-50 border-b-4 border-green-400 sticky top-0 z-40 shadow-lg mt-24">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-green-600" />
              <input
                type="text"
                placeholder="Search by name, breed, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-green-300 rounded-2xl text-lg focus:outline-none focus:border-green-600 transition shadow-md"
              />
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-green-700" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-6 py-4 bg-white border-2 border-green-300 rounded-xl font-medium text-gray-700 focus:outline-none focus:border-green-600 transition shadow-md"
              >
                {locations.map(loc => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "All Locations" : loc}
                  </option>
                ))}
              </select>

              {(searchTerm || locationFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setLocationFilter("all");
                  }}
                  className="px-6 py-4 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl font-bold transition flex items-center gap-2"
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>

          <p className="text-center mt-4 text-green-800 font-bold text-xl">
            {filteredPets.length} pet{filteredPets.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Found Pets Grid */}
      <div className="container mx-auto px-6 py-16">
        {filteredPets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-green-200 hover:border-green-500 transition-all duration-500 group"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl">
                    FOUND
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-4 py-2 rounded-full font-bold">
                    {pet.foundDate}
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 bg-gradient-to-b from-green-50 to-white">
                  <h3 className="text-3xl font-bold text-gray-800">{pet.name}</h3>
                  <p className="text-xl text-green-700 font-semibold mt-1">{pet.breed}</p>

                  <div className="mt-5 space-y-3 text-gray-700">
                    <p className="flex items-center gap-3">
                      <FaCalendarAlt className="text-green-600" /> {pet.age}
                    </p>
                    <p className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-green-600" /> {pet.location}
                    </p>
                  </div>

                  <p className="mt-6 text-gray-600 italic leading-relaxed">
                    "{pet.description}"
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col gap-4">
                    <a
                      href={`tel:${pet.contact}`}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-3"
                    >
                      <FaPhoneAlt className="text-2xl" /> This Is My Pet! Call Now
                    </a>

                   
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-5">
                    Contact finder directly • Pet is safe and cared for
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <FaPaw className="text-9xl text-green-200 mx-auto mb-6 opacity-50" />
            <p className="text-3xl font-bold text-gray-600">No found pets match your search</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
              }}
              className="mt-6 text-green-600 hover:text-green-800 font-bold text-xl underline"
            >
              Clear filters and see all found pets
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-green-100 py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Found a Pet?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            You're a hero! Report the pet you found so we can reunite them with their family faster.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
            Report Found Pet
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FoundPets;