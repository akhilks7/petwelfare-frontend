import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaSearch, FaHeart, FaExclamationTriangle,
  FaShoppingCart, FaMapMarkerAlt, FaClock, FaPhoneAlt,
  FaTimes, FaUpload, FaCalendarAlt, FaVenusMars, FaDog
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { handlegetalluserhomeadoptpets, handlegetalluserhomefoundpets, handlegetalluserhomelostpets, handlegetalluserhomesellpets, reportfoundpetapi, reportlostpetapi, reportstraypetapi } from "../../services/allAPI";
import { useEffect } from "react";
import SERVERURL from "../../services/serverURL";
import { toast } from "react-toastify";

function UserDashboard() {
  // Modal States
  const [showLostModal, setShowLostModal] = useState(false);
  const [showFoundModal, setShowFoundModal] = useState(false);
  const [token, settoken] = useState("");
  const [preview, setpreview] = useState("");
  const [showStrayModal, setShowStrayModal] = useState(false); // New Stray Modal
  const [foundpetdetails, setFoundpetdetails] = useState({
    animaltype: "",
    age: "",
    gender: "",
    location: "",
    breed: "",
    photos: [],
    contactno: "",
    identification: ""
  })
  const [lostpetdetails, setLostpetdetails] = useState({
    petname: "",
    age: "",
    gender: "",
    location: "",
    breed: "",
    photos: [],
    mdate: "",
    contactno: "",
    identification: ""
  })
  // console.log(lostpetdetails);

  const [straypetdetails, setStraypetdetails] = useState({
    animaltype: "",
    condition: "",
    location: "",
    photos: [],
    contactno: "",
    bio: ""
  });
  // console.log(straypetdetails);

  // const [alluploadimages, setalluploadimages] = useState([])
  // console.log(foundpetdetails);

  const [uploadedImages, setUploadedImages] = useState([]); // Shared preview for all modals


  // Report Found Pet
  const handlefoundpet = async () => {
    if (
      !foundpetdetails.animaltype ||
      !foundpetdetails.age ||
      !foundpetdetails.gender ||
      !foundpetdetails.breed ||
      !foundpetdetails.location ||
      foundpetdetails.photos.length === 0 ||
      !foundpetdetails.identification ||
      !foundpetdetails.contactno
    ) {
      toast.warning("Please fill all required fields and upload at least 1 photo.");
      return;
    }

    const formData = new FormData();
    formData.append("animaltype", foundpetdetails.animaltype);
    formData.append("age", foundpetdetails.age);
    formData.append("gender", foundpetdetails.gender);
    formData.append("location", foundpetdetails.location);
    formData.append("breed", foundpetdetails.breed);
    formData.append("contactno", foundpetdetails.contactno);
    formData.append("identification", foundpetdetails.identification);

    foundpetdetails.photos.forEach((file) => {
      formData.append("uploadImages", file);
    });

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await reportfoundpetapi(formData, reqHeader);
      if (result.status === 200) {
        toast.success("Found Pet Reported Successfully!");
        setShowFoundModal(false);

        // Reset form
        setFoundpetdetails({
          animaltype: "",
          age: "",
          gender: "",
          location: "",
          breed: "",
          photos: [],
          contactno: "",
          identification: ""
        });
        setUploadedImages([]); // Clear previews
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to report found pet.");
    }
  };

  // Report Lost Pet
  const handlelostpet = async () => {
    if (
      !lostpetdetails.petname ||
      !lostpetdetails.age ||
      !lostpetdetails.gender ||
      !lostpetdetails.breed ||
      !lostpetdetails.mdate ||
      !lostpetdetails.location ||
      lostpetdetails.photos.length === 0 ||
      !lostpetdetails.identification ||
      !lostpetdetails.contactno
    ) {
      toast.warning("Please fill all required fields and upload at least 1 photo.");
      return;
    }

    const formData = new FormData();
    formData.append("petname", lostpetdetails.petname);
    formData.append("age", lostpetdetails.age);
    formData.append("gender", lostpetdetails.gender);
    formData.append("location", lostpetdetails.location);
    formData.append("breed", lostpetdetails.breed);
    formData.append("mdate", lostpetdetails.mdate);
    formData.append("contactno", lostpetdetails.contactno);
    formData.append("identification", lostpetdetails.identification);

    lostpetdetails.photos.forEach((file) => {
      formData.append("uploadImages", file);
    });

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await reportlostpetapi(formData, reqHeader);
      if (result.status === 200) {
        toast.success("Lost Pet Reported Successfully!");
        setShowLostModal(false);

        setLostpetdetails({
          petname: "",
          age: "",
          gender: "",
          location: "",
          breed: "",
          photos: [],
          mdate: "",
          contactno: "",
          identification: ""
        });
        setUploadedImages([]);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to report lost pet.");
    }
  };

  // Report Stray Animal
  const handleStraypet = async () => {
    if (
      !straypetdetails.animaltype ||
      !straypetdetails.location ||
      straypetdetails.photos.length === 0 ||
      !straypetdetails.bio ||
      !straypetdetails.contactno
    ) {
      toast.warning("Please fill all required fields and upload at least 1 photo.");
      return;
    }

    const formData = new FormData();
    formData.append("animaltype", straypetdetails.animaltype);
    formData.append("location", straypetdetails.location);
    formData.append("bio", straypetdetails.bio);
    formData.append("contactno", straypetdetails.contactno);
    formData.append("condition", straypetdetails.condition);

    straypetdetails.photos.forEach((file) => {
      formData.append("uploadImages", file);
    });

    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await reportstraypetapi(formData, reqHeader);
      if (result.status === 200) {
        toast.success("Stray Animal Reported Successfully!");
        setShowStrayModal(false);

        setStraypetdetails({
          animaltype: "",
          location: "",
          photos: [],
          contactno: "",
          bio: ""
        });
        setUploadedImages([]);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to report stray animal.");
    }
  };



  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const currentCount = uploadedImages.length;

    if (currentCount + files.length > 3) {
      toast.warning(`You can only upload up to 3 images. Currently: ${currentCount}`);
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    const updatedPreviews = [...uploadedImages, ...newPreviews];

    setUploadedImages(updatedPreviews);

    // Update the correct pet details based on type
    if (type === "found") {
      setFoundpetdetails({ ...foundpetdetails, photos: [...foundpetdetails.photos, ...files] });
    } else if (type === "lost") {
      setLostpetdetails({ ...lostpetdetails, photos: [...lostpetdetails.photos, ...files] });
    } else if (type === "stray") {
      setStraypetdetails({ ...straypetdetails, photos: [...straypetdetails.photos, ...files] });
    }
  };

  const removeImage = (index, type) => {
    const newPreviews = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newPreviews);

    if (type === "found") {
      const newFiles = foundpetdetails.photos.filter((_, i) => i !== index);
      setFoundpetdetails({ ...foundpetdetails, photos: newFiles });
    } else if (type === "lost") {
      const newFiles = lostpetdetails.photos.filter((_, i) => i !== index);
      setLostpetdetails({ ...lostpetdetails, photos: newFiles });
    } else if (type === "stray") {
      const newFiles = straypetdetails.photos.filter((_, i) => i !== index);
      setStraypetdetails({ ...straypetdetails, photos: newFiles });
    }
  };

  const [alladoptpetsdata, setalladoptpetsdata] = useState([])
  const [allsellpetsdata, setallsellpetsdata] = useState([])
  const [alllostpetsdata, setalllostpetsdata] = useState([])
  const [allfoundpetsdata, setallfoundpetsdata] = useState([])

  const handlegetallpets = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetalluserhomesellpets(reqHeader)
      setallsellpetsdata(result.data)
      console.log(result.data);
      // adopt pets
      const alladoptpets = await handlegetalluserhomeadoptpets(reqHeader)
      console.log(alladoptpets.data);
      setalladoptpetsdata(alladoptpets.data)
      // found pets
      const allfoundpets = await handlegetalluserhomefoundpets(reqHeader)
      console.log(allfoundpets.data);
      setallfoundpetsdata(allfoundpets.data)
      // lost pets
      const alllostpets = await handlegetalluserhomelostpets(reqHeader)
      console.log(alllostpets.data);
      setalllostpetsdata(alllostpets.data)
      // stray pets
      // window.location.reload();

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }
    handlegetallpets()
  }, [token])

  return (
    <>
      <Header />

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-12 space-y-16 mt-15">

        {/* 1. Adopt a Pet - Slightly Larger & Richer */}
        <section id="petadoption" className="bg-white rounded-3xl shadow-xl p-10 border-4 border-orange-200">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FaHeart className="text-red-500 text-4xl" /> Adopt a Pet
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Give a rescued pet a loving forever home</p>
            </div>
            <Link to="/adoptpets">
              <button className="mt-6 md:mt-0 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl">
                View All Pets
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {alladoptpetsdata
              .filter(pet => pet.petfor === "donate" || pet.price === "00")
              .slice(0, 6)
              .map((pet) => {
                const photoUrl = pet.photos && pet.photos.length > 0
                  ? `${SERVERURL}/uploadImages/${pet.photos[0]}`
                  : "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";

                return (
                  <Link to="/adoptpets" key={pet._id}>
                    <div className="bg-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-3 cursor-pointer group">
                      <div className="relative">
                        <img
                          src={photoUrl}
                          alt={pet.petname}
                          className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow">
                          Free Adoption
                        </div>
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="font-bold text-2xl text-gray-800 mb-2">
                          {pet.petname || "Sweet Pet"}
                        </h3>
                        <p className="text-orange-700 font-medium text-lg">{pet.breed || pet.animaltype}</p>
                        <p className="text-gray-600 text-sm mt-2 flex items-center justify-center gap-2">
                          <FaVenusMars className="text-pink-600" />
                          {pet.gender} • {pet.age}
                        </p>
                        <p className="text-gray-600 text-sm mt-1 flex items-center justify-center gap-1">
                          <FaMapMarkerAlt className="text-red-600" /> {pet.location}
                        </p>
                        <p className="text-orange-600 font-semibold mt-3">Ready for adoption</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* 2. Found / Lost Actions - Slightly Larger */}
        <section id="lostandfound" className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Found or Lost a Pet?
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <FaPaw className="text-7xl text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">I Found a Pet</h3>
              <p className="text-gray-600 text-lg mb-6">You're a hero! Help reunite them with their family</p>
              <button
                onClick={() => setShowFoundModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                Report Found Pet
              </button>
            </div>

            <div className="bg-white rounded-2xl p-10 text-center shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <FaExclamationTriangle className="text-7xl text-red-600 mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">My Pet is Missing</h3>
              <p className="text-gray-600 text-lg mb-6">Create an urgent alert — we'll spread the word fast</p>
              <button
                onClick={() => setShowLostModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl transform hover:scale-110"
              >
                Report Missing Pet
              </button>
            </div>
          </div>
        </section>

        {/* 3. Buy Pets - Larger Cards */}
        <section id="petforsale" className="bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl shadow-2xl p-10 border-4 border-orange-400">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-4">
                <FaShoppingCart className="text-orange-600 text-5xl" />
                Buy Healthy Puppies & Kittens
              </h2>
              <p className="text-lg text-gray-600 mt-3">From trusted breeders • Full health guarantee</p>
            </div>
            <Link to="/petforsale">
              <button className="mt-6 md:mt-0 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl transition transform hover:scale-105">
                Browse All Breeds
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-10">
            {allsellpetsdata
              .slice(0, 8)
              .map((pet) => {
                const photoUrl = pet.photos && pet.photos.length > 0
                  ? `${SERVERURL}/uploadImages/${pet.photos[0]}`
                  : "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg";

                return (
                  <Link to="/petforsale" key={pet._id}>
                    <div className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:-translate-y-4 border-2 border-orange-100">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={photoUrl}
                          alt={pet.petname}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-orange-700 shadow-lg">
                          {pet.age || "Young"}
                        </div>
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                          Verified
                        </div>
                      </div>
                      <div className="p-6 bg-gradient-to-b from-white to-orange-50">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.petname || pet.breed}</h3>
                        <p className="text-gray-600 text-sm mb-3">{pet.breed}</p>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-3xl font-bold text-orange-600">
                            ₹{Number(pet.price).toLocaleString("en-IN")}
                          </p>
                          <FaPaw className="text-4xl text-orange-300 opacity-60" />
                        </div>
                        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition shadow-md hover:shadow-xl transform hover:scale-105">
                          Contact Breeder
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>

        {/* 4. Lost Pets - Larger Cards */}
        <section className="bg-red-50 rounded-3xl shadow-2xl p-10 border-4 border-red-300">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-red-800 flex items-center gap-4">
              <FaExclamationTriangle className="text-4xl animate-pulse" />
              Lost Pets Nearby
            </h2>
            <Link to="/lostpets">
              <span className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105">
                View All Alerts
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {alllostpetsdata
              .filter(pet => pet.petfor === "lost")
              .slice(0, 3)
              .map((pet) => {
                const photoUrl = pet.photos && pet.photos.length > 0
                  ? `${SERVERURL}/uploadImages/${pet.photos[0]}`
                  : "https://images.pexels.com/photos/4587996/pexels-photo-4587996.jpeg";

                return (
                  <div key={pet._id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition border-4 border-red-200">
                    <div className="relative">
                      <img src={photoUrl} alt={pet.petname} className="h-56 w-full object-cover" />
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
                        MISSING
                      </div>
                    </div>
                    <div className="p-6 bg-red-50">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.petname}</h3>
                      <p className="text-red-700 font-medium text-lg">{pet.breed}</p>
                      <p className="text-gray-700 mt-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-600" /> Last seen: {pet.location}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Since: {pet.mdate || "Recently"}</p>
                      <Link to="/lostpets">
                        <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                          I Might Have Seen This Pet
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* 5. Found Pets - Larger */}
        <section className="bg-green-50 rounded-3xl shadow-2xl p-10 border-4 border-green-400">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-green-800 flex items-center gap-4">
              <FaPaw className="text-4xl text-green-600" />
              Recently Found Pets
            </h2>
            <Link to="/foundpets">
              <span className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-105">
                View All
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {allfoundpetsdata
              .slice(0, 3)
              .map((pet) => {
                const photoUrl = pet.photos && pet.photos.length > 0
                  ? `${SERVERURL}/uploadImages/${pet.photos[0]}`
                  : "https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg";

                return (
                  <div key={pet._id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition">
                    <img src={photoUrl} alt={pet.animaltype} className="h-56 w-full object-cover" />
                    <div className="p-6 bg-green-50">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.animaltype || "Found Pet"}</h3>
                      <p className="text-green-700 font-medium text-lg mb-3">{pet.breed || "Unknown breed"}</p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" /> Found in: {pet.location}
                      </p>
                      <Link to="/foundpets">
                        <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition shadow-lg">
                          This Could Be My Pet!
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* 6. Stray Animals - Larger CTA */}
        <section id="stray" className="bg-gradient-to-b from-amber-50 to-orange-100 rounded-3xl shadow-2xl p-12 border-4 border-amber-500 text-center">
          <FaExclamationTriangle className="text-8xl text-amber-700 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Help Stray Animals in Need
          </h2>
          <p className="text-xl text-amber-800 max-w-4xl mx-auto mb-10">
            See an injured or hungry stray? Your report connects them with food, medical care, and rescue.
          </p>

          <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
            <button
              onClick={() => setShowStrayModal(true)}
              className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white text-2xl font-bold px-16 py-8 rounded-3xl shadow-2xl hover:shadow-amber-600 transition transform hover:scale-110 flex items-center gap-6"
            >
              <FaDog className="text-5xl" />
              Report a Stray Now
            </button>

            <Link to="/straylist">
              <button className="bg-white border-4 border-amber-600 text-amber-800 hover:bg-amber-50 text-2xl font-bold px-16 py-8 rounded-3xl shadow-2xl hover:shadow-amber-500 transition transform hover:scale-110">
                View All Reports
              </button>
            </Link>
          </div>
        </section>
      </div>

      {/* MODAL: Report Missing Pet (Lost Pet) */}
      {showLostModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-red-500">
            <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-8 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-bold flex items-center gap-5">
                    <FaExclamationTriangle className="text-6xl animate-pulse" />
                    Report Missing Pet
                  </h2>
                  <p className="text-xl mt-3 opacity-90">We’ll help spread the alert across the city</p>
                </div>
                <button onClick={() => setShowLostModal(false)} className="text-4xl hover:bg-white/20 rounded-full p-3 transition">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xl font-bold text-red-800 mb-3">Pet Name</label>
                  <input value={lostpetdetails.petname}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, petname: e.target.value })} type="text" placeholder="e.g., Rocky" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-xl font-bold text-red-800 mb-3">Breed</label>
                  <input value={lostpetdetails.breed}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, breed: e.target.value })} type="text" placeholder="e.g., German Shepherd" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-xl font-bold text-red-800 mb-3">Age</label>
                  <input value={lostpetdetails.age}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, age: e.target.value })} type="text" placeholder="e.g., 3 years" className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
                <div>
                  <label className="block text-xl font-bold text-red-800 mb-3">Gender</label>
                  <select value={lostpetdetails.gender}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, gender: e.target.value })} className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg font-medium">
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-red-800 mb-3">Last Seen Location</label>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-4xl text-red-600" />
                  <input value={lostpetdetails.location}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, location: e.target.value })} type="text" placeholder="e.g., Near Marine Drive, Kochi" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-red-800 mb-3">When Did Your Pet Go Missing?</label>
                <div className="flex items-center gap-4">
                  <FaCalendarAlt className="text-4xl text-red-600" />
                  <input value={lostpetdetails.mdate}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, mdate: e.target.value })} type="date" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
              </div>

              {/* Image Upload - Max 3 */}
              <div>
                <label className="block text-xl font-bold text-green-800 mb-4">
                  Upload Clear Photos <span className="text-red-600">*</span> (Max 3 images)
                </label>
                <div className="border-8 border-dashed border-green-300 rounded-3xl p-8 text-center hover:border-green-600 transition-all bg-green-50/50">
                  <FaUpload className="text-8xl text-green-400 mx-auto mb-6" />
                  <p className="text-2xl font-bold text-green-800">Click to Upload</p>
                  <p className="text-green-700 mt-3">Max 3 images • Multiple angles help</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "lost")}
                    className="mt-6 text-lg w-full cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                    disabled={uploadedImages.length >= 3}
                  />
                </div>

                {/* Preview with Remove */}
                {uploadedImages.length > 0 && (
                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Found pet ${index + 1}`}
                          className="h-40 w-full object-cover rounded-xl border-4 border-green-200 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, "found")}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FaTimes />
                        </button>
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xl font-bold text-red-800 mb-3">Special Identification (Collar, Tags, Markings)</label>
                <textarea value={lostpetdetails.identification}
                  onChange={(e) => setLostpetdetails({ ...lostpetdetails, identification: e.target.value })} rows={4} placeholder="e.g., Wearing blue collar with silver bone tag, white patch on chest..." className="w-full px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg resize-none"></textarea>
              </div>

              <div>
                <label className="block text-xl font-bold text-red-800 mb-3">Your Contact Number (Will be shown publicly)</label>
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-4xl text-red-600" />
                  <input value={lostpetdetails.contactno}
                    onChange={(e) => setLostpetdetails({ ...lostpetdetails, contactno: e.target.value })} type="tel" placeholder="+91 98765 43210" className="flex-1 px-6 py-5 border-4 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none text-lg" />
                </div>
              </div>

              <div className="flex gap-6 pt-8 justify-center">
                <button onClick={() => setShowLostModal(false)} className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition">
                  Cancel
                </button>
                <button onClick={() => { handlelostpet() }} className="px-16 py-6 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-red-600 transform hover:scale-110 transition-all flex items-center gap-4">
                  <FaExclamationTriangle className="text-4xl" />
                  Submit Missing Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Report Found Pet */}
      {showFoundModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-green-500">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-bold flex items-center gap-5">
                    <FaPaw className="text-6xl animate-bounce" />
                    I Found a Pet
                  </h2>
                  <p className="text-xl mt-3 opacity-90">Thank you for helping reunite a family!</p>
                </div>
                <button
                  onClick={() => setShowFoundModal(false)}
                  className="text-4xl hover:bg-white/20 rounded-full p-3 transition"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-10 space-y-8">
              {/* Form Fields - All Required */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xl font-bold text-green-800 mb-3">
                    Animal Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={foundpetdetails.animaltype}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, animaltype: e.target.value })}
                    className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg font-medium"
                  >
                    <option value="">Select Type</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Puppy</option>
                    <option>Kitten</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xl font-bold text-green-800 mb-3">
                    Approximate Age <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    value={foundpetdetails.age}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, age: e.target.value })}
                    type="text"
                    placeholder="e.g., Adult, 6 months, Puppy"
                    className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-xl font-bold text-green-800 mb-3">
                    Gender (if known) <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={foundpetdetails.gender}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, gender: e.target.value })}
                    className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg font-medium"
                  >
                    <option value="">Select Gender</option>
                    <option>Not Sure</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xl font-bold text-green-800 mb-3">
                    Color / Breed (if known) <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    value={foundpetdetails.breed}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, breed: e.target.value })}
                    type="text"
                    placeholder="e.g., Brown Labrador, Black & White Cat"
                    className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-green-800 mb-3">
                  Where Did You Find the Pet? <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-4xl text-green-600" />
                  <input
                    required
                    value={foundpetdetails.location}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, location: e.target.value })}
                    type="text"
                    placeholder="e.g., Near Vyttila Junction, Kochi"
                    className="flex-1 px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg"
                  />
                </div>
              </div>

              {/* Image Upload - Required at least 1 photo */}
              {/* Image Upload - Max 3 */}
              <div>
                <label className="block text-xl font-bold text-green-800 mb-4">
                  Upload Clear Photos <span className="text-red-600">*</span> (Max 3 images)
                </label>
                <div className="border-8 border-dashed border-green-300 rounded-3xl p-8 text-center hover:border-green-600 transition-all bg-green-50/50">
                  <FaUpload className="text-8xl text-green-400 mx-auto mb-6" />
                  <p className="text-2xl font-bold text-green-800">Click to Upload</p>
                  <p className="text-green-700 mt-3">Max 3 images • Multiple angles help</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "found")}
                    className="mt-6 text-lg w-full cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                    disabled={uploadedImages.length >= 3}
                  />
                </div>

                {/* Preview with Remove */}
                {uploadedImages.length > 0 && (
                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Found pet ${index + 1}`}
                          className="h-40 w-full object-cover rounded-xl border-4 border-green-200 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, "found")}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FaTimes />
                        </button>
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xl font-bold text-green-800 mb-3">
                  Any Collar, Tags, or Special Marks? <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  value={foundpetdetails.identification}
                  onChange={(e) => setFoundpetdetails({ ...foundpetdetails, identification: e.target.value })}
                  rows={4}
                  placeholder="e.g., Red collar with bell, microchip scar, injured left ear..."
                  className="w-full px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-green-800 mb-3">
                  Your Contact Number <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-4xl text-green-600" />
                  <input
                    required
                    value={foundpetdetails.contactno}
                    onChange={(e) => setFoundpetdetails({ ...foundpetdetails, contactno: e.target.value })}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="flex-1 px-6 py-5 border-4 border-green-300 rounded-2xl focus:border-green-600 focus:outline-none text-lg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 pt-8 justify-center">
                <button
                  onClick={() => setShowFoundModal(false)}
                  className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlefoundpet}
                  className="px-16 py-6 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-bold text-2xl rounded-2xl shadow-2xl hover:shadow-green-600 transform hover:scale-110 transition-all flex items-center gap-4"
                >
                  <FaPaw className="text-4xl" />
                  Submit Found Pet Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* MODAL: Report Stray Animal */}
      {showStrayModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-3xl max-w-4xl w-full max-h-screen overflow-y-auto border-8 border-amber-500">
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-8 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-bold flex items-center gap-5">
                    <FaDog className="text-6xl animate-bounce" />
                    Report a Stray Animal
                  </h2>
                  <p className="text-xl mt-3 opacity-90">Your report can save a life today</p>
                </div>
                <button onClick={() => {
                  setShowStrayModal(false);
                  setUploadedImages([]);
                }} className="text-4xl hover:bg-white/20 rounded-full p-3 transition">
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xl font-bold text-amber-800 mb-3">Animal Type *</label>
                  <select
                    value={straypetdetails.animaltype}
                    onChange={(e) => setStraypetdetails({ ...straypetdetails, animaltype: e.target.value })}
                    className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg font-medium"
                    required
                  >
                    <option value="">Select Type</option>
                    <option>Street Dog</option>
                    <option>Street Cat</option>
                    <option>Puppy (under 6 months)</option>
                    <option>Kitten (under 6 months)</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xl font-bold text-amber-800 mb-3">Condition *</label>
                  <select
                    value={straypetdetails.condition || ""}
                    onChange={(e) => setStraypetdetails({ ...straypetdetails, condition: e.target.value })}
                    className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg font-medium"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option>Injured / Bleeding</option>
                    <option>Sick / Weak</option>
                    <option>Pregnant / Nursing</option>
                    <option>Aggressive</option>
                    <option>Friendly / Approaching People</option>
                    <option>Normal but Hungry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-amber-800 mb-3">Exact Location *</label>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-4xl text-amber-600" />
                  <input
                    value={straypetdetails.location}
                    onChange={(e) => setStraypetdetails({ ...straypetdetails, location: e.target.value })}
                    type="text"
                    placeholder="e.g., Near Lulu Mall Signal, Edappally, Kochi"
                    className="flex-1 px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg"
                    required
                  />
                </div>
              </div>

              {/* Image Upload - Max 3 */}
              <div>
                <label className="block text-xl font-bold text-amber-800 mb-4">
                  Upload Clear Photos <span className="text-red-600">*</span> (Max 3 images)
                </label>
                <div className="border-8 border-dashed border-amber-300 rounded-3xl p-8 text-center hover:border-amber-600 transition-all bg-amber-50/50">
                  <FaUpload className="text-8xl text-amber-400 mx-auto mb-6" />
                  <p className="text-2xl font-bold text-amber-800">Click to Upload</p>
                  <p className="text-amber-700 mt-3">Max 3 images • Multiple angles help rescuers</p>
                  <p className="text-sm text-gray-600 mt-2">{uploadedImages.length}/3 images</p>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, "stray")}
                    className="mt-6 text-lg w-full cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                    disabled={uploadedImages.length >= 3}
                  />
                </div>

                {/* Preview with Remove Button */}
                {uploadedImages.length > 0 && (
                  <div className="mt-8 grid grid-cols-3 gap-6">
                    {uploadedImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Stray animal ${index + 1}`}
                          className="h-40 w-full object-cover rounded-xl border-4 border-amber-200 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, "stray")}  // ← Fixed: was "found"
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                        >
                          <FaTimes />
                        </button>
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {uploadedImages.length === 0 && (
                  <p className="text-red-600 mt-4 text-center font-medium">Please upload at least one photo</p>
                )}
              </div>

              <div>
                <label className="block text-xl font-bold text-amber-800 mb-3">Description *</label>
                <textarea
                  value={straypetdetails.bio}
                  onChange={(e) => setStraypetdetails({ ...straypetdetails, bio: e.target.value })}
                  rows={5}
                  placeholder="How many animals? Any puppies/kittens? Behavior? Injuries visible? Can someone approach safely?"
                  className="w-full px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xl font-bold text-amber-800 mb-3">Your Contact Number *</label>
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-4xl text-amber-600" />
                  <input
                    value={straypetdetails.contactno}
                    onChange={(e) => setStraypetdetails({ ...straypetdetails, contactno: e.target.value })}
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="flex-1 px-6 py-5 border-4 border-amber-300 rounded-2xl focus:border-amber-600 focus:outline-none text-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-6 pt-8 justify-center">
                <button
                  onClick={() => {
                    setShowStrayModal(false);
                    setUploadedImages([]);
                    setStraypetdetails({
                      animaltype: "", condition: "", location: "", photos: [], bio: "", contactno: ""
                    });
                  }}
                  className="px-12 py-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStraypet}
                  disabled={uploadedImages.length === 0}
                  className={`px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl transform hover:scale-110 transition-all flex items-center gap-4 ${uploadedImages.length === 0
                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                    : "bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white"
                    }`}
                >
                  <FaPaw className="text-4xl" />
                  Submit Stray Report
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

export default UserDashboard;