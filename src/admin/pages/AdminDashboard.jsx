import React, { useState } from "react";
import {
  FaHome, FaUsers, FaPaw, FaPlus, FaEdit, FaTrashAlt, FaCheckCircle,
  FaTimesCircle, FaEye, FaSearch, FaBell, FaSignOutAlt, FaBars,
  FaExclamationTriangle, FaHeart, FaDollarSign, FaHandHoldingHeart,
  FaShieldAlt, FaFilter,
  FaTimes,
  FaUpload,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleaddnewpet, handledeletepet, handledeletesellpet, handledeleteuser, handlegetadmdonatepets, handlegetadmfoundpets, handlegetadminsellingpets, handlegetadmlostpets, handlegetadmstrayanimals, handlegetalladminpets, handlegetalladminusers, handleupdatenewpet, handleupdatepetstaus, handleupdateuserstaus } from "../../services/allAPI";
import { useEffect } from "react";
import SERVERURL from "../../services/serverURL";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [petimg, setpetimg] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [token, settoken] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate()

  const [petsForSale, setpetsForSale] = useState([])
  const [petsForfound, setpetsForfound] = useState([])
  const [petsForLost, setpetsForLost] = useState([])
  const [petsForAdopt, setpetsForAdopt] = useState([])
  const [usercount, setusercount] = useState([])
  const [allpets, setallpets] = useState([])
  const [strayAnimals, setStrayAnimals] = useState([]);


  // edit modal
  const [showeditPetModal, setshoweditPetModal] = useState(false);
  const openImageModal = (photos) => {
    setSelectedImages(photos || []);
    setImageModalOpen(true);
  };

  const [newpetDetails, setnewpetDetails] = useState({
    petname: "",
    age: "",
    gender: "",
    location: "",
    breed: "",
    price: ""
  });

  const [uploadedPetImages, setUploadedPetImages] = useState([]); // For preview
  const [editPetImagePreviews, setEditPetImagePreviews] = useState([]);

  const [editpetDetails, seteditpetDetails] = useState({
    petname: "",
    age: "",
    gender: "",
    location: "",
    breed: "",
    price: "",
    imageURL: ""
  });
  console.log(editpetDetails);
  console.log(newpetDetails);
  console.log(petsForSale);
  console.log(petsForfound);

  const reset = () => {
    setnewpetDetails({
      petname: "",
      age: "",
      gender: "",
      location: "",
      breed: "",
      price: "",
      photos: []
    });
    setUploadedPetImages([]);
    seteditpetDetails({ ...editpetDetails, photos: [] });
  };

  const addnewpet = async () => {
    if (
      !newpetDetails.petname ||
      !newpetDetails.breed ||
      !newpetDetails.age ||
      !newpetDetails.gender ||
      !newpetDetails.location ||
      !newpetDetails.price ||
      !newpetDetails.photos || newpetDetails.photos.length === 0
    ) {
      // alert("Please fill all fields and upload at least 1 photo");
      toast.warning("Please fill all fields and upload at least 1 photo")
      return;
    }

    const formData = new FormData();
    formData.append("petname", newpetDetails.petname);
    formData.append("breed", newpetDetails.breed);
    formData.append("age", newpetDetails.age);
    formData.append("gender", newpetDetails.gender);
    formData.append("location", newpetDetails.location);
    formData.append("price", newpetDetails.price);

    newpetDetails.photos.forEach((file) => {
      formData.append("uploadImages", file);
    });

    const reqheader = { Authorization: `Bearer ${token}` };

    try {
      const result = await handleaddnewpet(formData, reqheader);
      if (result.status === 200) {
        // alert("Pet added successfully!");
        toast.success("Pet added successfully!")
        setShowAddPetModal(false);
        reset();
        navigate("/admindashboard")
        setUploadedPetImages([]);
        getallsellingpets();
      }
    } catch (error) {
      console.error(error);
      // alert("Failed to add pet");
      toast.error("Failed to add pet")
    }
  };
  // console.log(token);

  const getallsellingpets = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const getallsellingpets = await handlegetadminsellingpets(reqheader)
      console.log(getallsellingpets);
      if (getallsellingpets.status == 200) {
        setpetsForSale(getallsellingpets.data)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getallstraypets = async () => {
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetadmstrayanimals(reqheader);
      console.log(result);
      if (result.status == 200) {
        setStrayAnimals(result.data);
      }

    } catch (error) {
      console.error(error);
      setStrayAnimals([]);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate("/admin-login"); // or your login route
      }
    }
  };

  const getalldonatingpets = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const getalldonatingpets = await handlegetadmdonatepets(reqheader)
      console.log(getalldonatingpets.data);
      setpetsForAdopt(getalldonatingpets.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getalllostpets = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const getalllostpets = await handlegetadmlostpets(reqheader)
      console.log(getalllostpets.data);
      setpetsForLost(getalllostpets.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getallfoundpets = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const getallfoundpets = await handlegetadmfoundpets(reqheader)
      console.log(getallfoundpets.data);
      setpetsForfound(getallfoundpets.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getallusers = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const getallusers = await handlegetalladminusers(reqheader)
      console.log(getallusers.data);
      setusercount(getallusers.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getallpets = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    try {
      const response = await handlegetalladminpets(reqheader)
      const petsArray = response.data
      console.log("All pets:", petsArray)
      if (response.status === 200) {
        setallpets(petsArray)
      }

    } catch (error) {
      console.log(error)
      setallpets([])  // ensure it's always an array even on error
    }
  }

  const logout = () => {
    sessionStorage.removeItem("token")
    navigate("/")
  }

  const updatesellingpet = async () => {
    const reqheader = { Authorization: `Bearer ${token}` };

    const formData = new FormData();
    formData.append("_id", editpetDetails._id);
    formData.append("petname", editpetDetails.petname);
    formData.append("breed", editpetDetails.breed);
    formData.append("age", editpetDetails.age);
    formData.append("gender", editpetDetails.gender);
    formData.append("location", editpetDetails.location);
    formData.append("price", editpetDetails.price);

    // Send existing photo filenames (as stringified array)
    const existingFilenames = editpetDetails.photos
      .filter(photo => typeof photo === "string") // only strings = old filenames
      .filter(photo => photo.trim() !== "");
    formData.append("existingPhotos", JSON.stringify(existingFilenames));

    // Append new uploaded files
    editpetDetails.photos
      .filter(photo => photo instanceof File) // only File objects = new uploads
      .forEach(file => {
        formData.append("uploadImages", file);
      });

    try {
      const result = await handleupdatenewpet(formData, reqheader);
      if (result.status === 200) {
        toast.success("Pet updated successfully!");
        setshoweditPetModal(false);
        reset();
        getallsellingpets();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update pet");
    }
  };

  const deletesellingpet = async (id) => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    const petid = { _id: id }

    try {
      const deletesellingpets = await handledeletesellpet(petid, reqheader)
      console.log(deletesellingpets);
      if (deletesellingpets.status == 200) {
        toast.success(`deleted`)
        getallsellingpets()
      }
    } catch (error) {
      console.log(error);

    }
  }

  const deletepet = async (id) => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }
    const petid = { _id: id }

    try {
      const deletepet = await handledeletepet(petid, reqheader)
      console.log(deletepet);
      if (deletepet.status == 200) {
        toast.success(`deleted`)
        getalldonatingpets()
      }
    } catch (error) {
      console.log(error);

    }
  }

  const deleteuser = async (id) => {
    const reqheader = {
      Authorization: `Bearer ${token}`
    }


    const userid = { _id: id }

    try {
      const deleteuser = await handledeleteuser(userid, reqheader)
      console.log(deleteuser);
      if (deleteuser.status == 200) {
        toast.success(`user deleted`)
        getallusers()
      }
    } catch (error) {
      console.log(error);

    }
  }

  const handlePetImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentCount = uploadedPetImages.length;

    if (currentCount + files.length > 5) {
      toast.warning(`You can only upload up to 5 images. Currently: ${currentCount}`);
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setUploadedPetImages([...uploadedPetImages, ...newPreviews]);

    // Store actual files in state (to send later)
    setnewpetDetails({ ...newpetDetails, photos: [...(newpetDetails.photos || []), ...files] });
  };

  const removePetImage = (index) => {
    const newPreviews = uploadedPetImages.filter((_, i) => i !== index);
    const newFiles = (newpetDetails.photos || []).filter((_, i) => i !== index);
    setUploadedPetImages(newPreviews);
    setnewpetDetails({ ...newpetDetails, photos: newFiles });
  };

  const changepetstatus = async (id, status) => {
    const reqheader = { Authorization: `Bearer ${token}` };
    const reqbody = {
      _id: id,
      status: status
    }
    try {
      const result = await handleupdatepetstaus(reqbody, reqheader);
      console.log(result);
      if (result.status === 200) {
        toast.success("Pet status updated successfully!");
      }
      getallpets()

    } catch (error) {
      console.log(error);

    }
  }

  const changeuserstatus = async (id, status) => {
    const reqheader = { Authorization: `Bearer ${token}` };
    const reqbody = {
      _id: id,
      status: status
    }
    try {
      const result = await handleupdateuserstaus(reqbody, reqheader);
      console.log(result);
      if (result.status === 200) {
        toast.success("user status updated successfully!");
      }
      getallusers()

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      navigate("/admin-login");
      return;
    }
    settoken(storedToken);

  }, []);


  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"))
    }

    getallsellingpets()
    getalldonatingpets()
    getalllostpets()
    getallfoundpets()
    getallusers()
    getallpets()
    getallstraypets();

  }, [token, editpetDetails, activeTab])






  const menuItems = [
    { icon: FaHome, label: "Overview", id: "overview" },
    { icon: FaPaw, label: "Pets for Sale", id: "pets", badge: petsForSale.length },
    { icon: FaPlus, label: "Add New Pet", id: "addpet", special: true },
    { icon: FaHandHoldingHeart, label: "Donate Enquiries", id: "donate", badge: petsForAdopt.length },
    { icon: FaExclamationTriangle, label: "Lost Reports", id: "lost", badge: petsForLost.length },
    { icon: FaHeart, label: "Found Reports", id: "found", badge: petsForfound.length },
    { icon: FaUsers, label: "Users", id: "users", badge: usercount.length },
    { icon: FaExclamationTriangle, label: "Stray Reports", id: "stray", badge: strayAnimals.length },

  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      {/* Fixed Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <span className="text-xl font-bold text-white">PetHub Admin</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <FaTimes className="text-2xl" />
              </button>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "addpet") setShowAddPetModal(true);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl transition-all ${activeTab === item.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "hover:bg-gray-800 text-gray-300"
                  } ${item.special ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold" : ""}`}
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
                {item.badge > 0 && (
                  <span className="ml-auto bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-800">
            <button onClick={logout} className="w-full flex items-center gap-4 px-5 py-3 rounded-xl hover:bg-red-900/50 text-gray-300 hover:text-white transition">
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 lg:ml-72 transition-all duration-300">
        <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-700">
                <FaBars className="text-2xl" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {menuItems.find(m => m.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              
              <span className="text-sm">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        <main className="p-6 bg-gray-50 min-h-screen">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-10">
                {[
                  { label: "Total Users", value: usercount.length, color: "from-blue-500 to-cyan-500" },
                  { label: "Pets for Sale", value: petsForSale.length, color: "from-purple-500 to-pink-500" },
                  { label: "Adoptions", value: petsForAdopt.length, color: "from-green-500 to-emerald-500" },
                  { label: "Lost Reports", value: petsForLost.length, color: "from-red-500 to-rose-500" },
                  { label: "Found Reports", value: petsForfound.length, color: "from-teal-500 to-cyan-600" },
                  { label: "Stray Reports", value: strayAnimals.length, color: "from-amber-500 to-orange-500" },
                  { label: "Total Pets", value: allpets.length, color: "from-indigo-500 to-purple-600" }
                ].map((stat, i) => (
                  <div key={i} className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-lg text-white`}>
                    <p className="text-4xl font-bold">{stat.value}</p>
                    <p className="text-sm mt-2 opacity-90">{stat.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {allpets.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No recent activity</p>
                ) : (
                  allpets.map(pet => (
                    <div key={pet._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                      <div className="flex flex-col lg:flex-row justify-between gap-6">
                        <div className="flex gap-6">
                          <div onClick={() => openImageModal(pet.photos || [])} className="cursor-pointer">
                            {pet.photos?.[0] ? (
                              <img src={`${SERVERURL}/uploadImages/${pet.photos[0]}`} alt="Pet" className="w-32 h-32 object-cover rounded-xl" />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">No Image</div>
                            )}
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${pet.petfor === "sell" ? "bg-yellow-500" : pet.petfor === "donate" ? "bg-green-500" : "bg-gray-500"} text-white`}>
                              {pet.petfor?.toUpperCase()}
                            </span>
                            <h3 className="text-xl font-bold mt-2">{pet.petname || pet.animaltype}</h3>
                            <p className="text-gray-600">{pet.breed} • {pet.age} • {pet.gender}</p>
                            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1"><FaMapMarkerAlt /> {pet.location}</p>
                            {pet.price && pet.price !== "00" && <p className="text-2xl font-bold text-green-600 mt-3">₹{Number(pet.price).toLocaleString("en-IN")}</p>}
                            <p className="text-sm text-gray-500 mt-2">By: {pet.usermail}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <button
                            onClick={() => {changepetstatus(pet._id, pet.status),getallpets()}}
                            className={`px-5 py-2 rounded-lg font-bold text-white transition ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>
                          <button onClick={() => {deletepet(pet._id),getallpets()}} className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-white font-bold">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Pets for Sale */}
          {activeTab === "pets" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Pets for Sale ({petsForSale.length})
                </h2>
                <button
                  onClick={() => setShowAddPetModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 shadow-md transition"
                >
                  <FaPlus /> Add New Pet
                </button>
              </div>

              <div className="space-y-6">
                {petsForSale.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FaPaw className="text-8xl mx-auto mb-6 opacity-40 text-green-400" />
                    <p className="text-2xl font-medium">No pets listed for sale yet</p>
                    <p className="mt-2">Add your first pet using the button above!</p>
                  </div>
                ) : (
                  petsForSale.map(pet => (
                    <div
                      key={pet._id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left: Image + Details */}
                        <div className="flex gap-6 flex-1">
                          {/* Clickable Image → Opens Carousel Modal */}
                          <div
                            onClick={() => openImageModal(pet.photos || [])}
                            className="cursor-pointer flex-shrink-0"
                          >
                            {pet.photos?.[0] ? (
                              <img
                                src={`${SERVERURL}/uploadImages/${pet.photos[0]}`}
                                alt={pet.petname}
                                className="w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                                No Photo
                              </div>
                            )}
                          </div>

                          {/* Pet Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{pet.petname}</h3>
                            <p className="text-gray-600 mt-1">
                              {pet.breed} • {pet.age} • {pet.gender}
                            </p>

                            <div className="mt-3 space-y-2">
                              <p className="text-gray-700 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-green-600" />
                                {pet.location}
                              </p>

                              <p className="text-3xl font-bold text-green-600 mt-4">
                                ₹{Number(pet.price).toLocaleString("en-IN")}
                              </p>

                              <p className="text-sm text-gray-500 mt-3">
                                Listed by: <span className="font-medium text-gray-700">{pet.usermail}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              setshoweditPetModal(true);
                              seteditpetDetails({
                                ...pet,
                                photos: pet.photos || []
                              });
                              if (pet.photos && pet.photos.length > 0) {
                                const previews = pet.photos.map(photo => `${SERVERURL}/uploadImages/${photo}`);
                                setEditPetImagePreviews(previews);
                              } else {
                                setEditPetImagePreviews([]);
                              }
                            }}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
                          >
                            <FaEdit />
                            Edit Pet
                          </button>

                          {/* Status Toggle Button */}
                          <button
                            onClick={() => {changepetstatus(pet._id, pet.status),getallsellingpets()}}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {deletepet(pet._id),getallsellingpets()}}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                          >
                            Delete Pet
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Adoption Requests */}
          {activeTab === "donate" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Adoption Requests ({petsForAdopt.length})
              </h2>

              <div className="space-y-6">
                {petsForAdopt.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FaPaw className="text-8xl mx-auto mb-6 opacity-40" />
                    <p className="text-2xl">No adoption requests yet</p>
                    <p className="mt-2">New requests will appear here when users list pets for adoption</p>
                  </div>
                ) : (
                  petsForAdopt.map(pet => (
                    <div
                      key={pet._id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left: Pet Image + Details */}
                        <div className="flex gap-6 flex-1">
                          {/* Clickable Image */}
                          <div
                            onClick={() => openImageModal(pet.photos || [])}
                            className="cursor-pointer flex-shrink-0"
                          >
                            {pet.photos?.[0] ? (
                              <img
                                src={`${SERVERURL}/uploadImages/${pet.photos[0]}`}
                                alt={pet.petname}
                                className="w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                                No Image
                              </div>
                            )}
                          </div>

                          {/* Pet Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{pet.petname}</h3>
                            <p className="text-gray-600 mt-1">
                              {pet.breed} • {pet.age} • {pet.gender}
                            </p>
                            <div className="mt-3 space-y-2 text-sm">
                              <p className="text-gray-700 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-500" />
                                {pet.location}
                              </p>
                              <p className="text-gray-700 flex items-center gap-2">
                                <FaPhoneAlt className="text-gray-500" />
                                {pet.contactno || "Not provided"}
                              </p>
                              <p className="text-gray-500">
                                Requested by: <span className="font-medium text-gray-700">{pet.usermail}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {/* Status Toggle Button */}
                          <button
                            onClick={() => {changepetstatus(pet._id, pet.status),getalldonatingpets()}}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {deletepet(pet._id),getalldonatingpets()}}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                          >
                            Delete Request
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Lost Reports */}
          {activeTab === "lost" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Lost Pet Reports ({petsForLost.length})
              </h2>

              <div className="space-y-6">
                {petsForLost.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FaExclamationTriangle className="text-8xl mx-auto mb-6 opacity-40 text-red-400" />
                    <p className="text-2xl font-medium">No lost pet reports yet</p>
                    <p className="mt-2">When users report a missing pet, it will appear here for review.</p>
                  </div>
                ) : (
                  petsForLost.map(pet => (
                    <div
                      key={pet._id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left: Image + Details */}
                        <div className="flex gap-6 flex-1">
                          {/* Clickable Image */}
                          <div
                            onClick={() => openImageModal(pet.photos || [])}
                            className="cursor-pointer flex-shrink-0"
                          >
                            {pet.photos?.[0] ? (
                              <img
                                src={`${SERVERURL}/uploadImages/${pet.photos[0]}`}
                                alt={pet.petname}
                                className="w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                                No Photo
                              </div>
                            )}
                          </div>

                          {/* Pet Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{pet.petname}</h3>
                            <p className="text-gray-600 mt-1">
                              {pet.breed} • {pet.age} • {pet.gender}
                            </p>

                            <div className="mt-3 space-y-2">
                              <p className="text-red-600 font-semibold flex items-center gap-2">
                                <FaExclamationTriangle className="text-lg" />
                                Last seen: {pet.location}
                              </p>
                              {pet.contactno && (
                                <p className="text-gray-700 flex items-center gap-2">
                                  <FaPhoneAlt />
                                  {pet.contactno}
                                </p>
                              )}
                              <p className="text-sm text-gray-500">
                                Reported by: <span className="font-medium text-gray-700">{pet.usermail}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {/* Status Toggle Button */}
                          <button
                            onClick={() => {changepetstatus(pet._id, pet.status),getalllostpets()}}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {deletepet(pet._id),getalllostpets()}}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                          >
                            Delete Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Found Reports */}
          {activeTab === "found" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Found Pet Reports ({petsForfound.length})
              </h2>

              <div className="space-y-6">
                {petsForfound.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FaHeart className="text-8xl mx-auto mb-6 opacity-40 text-teal-400" />
                    <p className="text-2xl font-medium">No found pet reports yet</p>
                    <p className="mt-2">When users report finding a pet, it will appear here for review and action.</p>
                  </div>
                ) : (
                  petsForfound.map(pet => (
                    <div
                      key={pet._id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left: Image + Details */}
                        <div className="flex gap-6 flex-1">
                          {/* Clickable Image */}
                          <div
                            onClick={() => openImageModal(pet.photos || [])}
                            className="cursor-pointer flex-shrink-0"
                          >
                            {pet.photos?.[0] ? (
                              <img
                                src={`${SERVERURL}/uploadImages/${pet.photos[0]}`}
                                alt="Found pet"
                                className="w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                                No Photo
                              </div>
                            )}
                          </div>

                          {/* Pet Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {pet.animaltype || pet.petname || "Found Pet"}
                            </h3>

                            {pet.breed && (
                              <p className="text-gray-600 mt-1">
                                {pet.breed} • {pet.age || "Age unknown"} • {pet.gender || "Gender unknown"}
                              </p>
                            )}

                            <div className="mt-3 space-y-2">
                              <p className="text-teal-600 font-semibold flex items-center gap-2">
                                <FaMapMarkerAlt className="text-lg" />
                                Found at: {pet.location}
                              </p>

                              {pet.contactno && (
                                <p className="text-gray-700 flex items-center gap-2">
                                  <FaPhoneAlt />
                                  {pet.contactno}
                                </p>
                              )}

                              <p className="text-sm text-gray-500">
                                Reported by: <span className="font-medium text-gray-700">{pet.usermail}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {/* Status Toggle Button */}
                          <button
                            onClick={() => {changepetstatus(pet._id, pet.status),getallfoundpets()}}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => {deletepet(pet._id),getallfoundpets()}}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                          >
                            Delete Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Stray Reports */}
          {activeTab === "stray" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Stray Animal Reports ({strayAnimals.length})
              </h2>

              <div className="space-y-6">
                {strayAnimals.length === 0 ? (
                  <div className="text-center py-16 text-gray-500">
                    <FaPaw className="text-8xl mx-auto mb-6 opacity-40 text-amber-500" />
                    <p className="text-2xl font-medium">No stray animal reports yet</p>
                    <p className="mt-2">When caring users report strays needing help, they will appear here.</p>
                  </div>
                ) : (
                  strayAnimals.map(pet => (
                    <div
                      key={pet._id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row justify-between gap-8">
                        {/* Left: Image + Details */}
                        <div className="flex gap-6 flex-1">
                          {/* Clickable Image */}
                          <div
                            onClick={() => openImageModal(pet.photos || [])}
                            className="cursor-pointer flex-shrink-0"
                          >
                            {pet.photos?.[0] ? (
                              <img
                                src={`${SERVERURL}/uploadImages/${pet.photos[0]}`}
                                alt="Stray animal"
                                className="w-32 h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
                                No Photo
                              </div>
                            )}
                          </div>

                          {/* Animal Info */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {pet.animaltype || "Stray Animal"}
                            </h3>

                            {pet.condition && (
                              <p className="text-amber-600 font-semibold mt-2 flex items-center gap-2">
                                <FaExclamationTriangle className="text-lg" />
                                Condition: {pet.condition}
                              </p>
                            )}

                            <div className="mt-3 space-y-2">
                              <p className="text-gray-700 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-amber-600" />
                                Location: {pet.location}
                              </p>

                              {pet.contactno && (
                                <p className="text-gray-700 flex items-center gap-2">
                                  <FaPhoneAlt />
                                  {pet.contactno}
                                </p>
                              )}

                              <p className="text-sm text-gray-500 mt-3">
                                Reported by: <span className="font-medium text-gray-700">{pet.usermail}</span>
                              </p>

                              {pet.bio && (
                                <p className="text-gray-600 mt-3 italic text-sm leading-relaxed">
                                  "{pet.bio}"
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="flex flex-col gap-3 lg:items-end">
                          {/* Status Toggle Button */}
                          <button
                            onClick={() =>{ changepetstatus(pet._id, pet.status),getallstrayanimals() }}
                            className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all ${pet.status === "active"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                              }`}
                          >
                            {pet.status === "active" ? "Active" : "Inactive"}
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() =>{ deletepet(pet._id),getallstrayanimals()}}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-md transition-all"
                          >
                            Delete Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Users ({usercount.length})</h2>
              <div className="space-y-6">
                {usercount.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">No users found</p>
                ) : (
                  usercount.map(user => (
                    <div key={user._id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-gray-600 font-bold">
                            {user.username?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{user.username}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-500 mt-1">Role: {user.role || "user"}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => {changeuserstatus(user._id, user.status),getallusers()}} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
                            {user.status === "active" ? "Block" : "Unblock"}
                          </button>
                          <button onClick={() =>{ deleteuser(user._id),getallusers()}} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD PET MODAL */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full p-10 border border-purple-600 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white">Add New Pet for Sale</h2>
              <button onClick={() => { setShowAddPetModal(false); reset(); }} className="text-3xl hover:text-gray-400">
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-300 mb-2">Pet Name *</label>
                <input
                  value={newpetDetails.petname}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, petname: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., Max"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Breed *</label>
                <input
                  value={newpetDetails.breed}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, breed: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., Golden Retriever"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Age *</label>
                <input
                  value={newpetDetails.age}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, age: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Price (₹) *</label>
                <input
                  value={newpetDetails.price}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, price: e.target.value })}
                  type="number"
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="32000"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Location *</label>
                <input
                  value={newpetDetails.location}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, location: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="Kochi, Kerala"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gender *</label>
                <select
                  value={newpetDetails.gender}
                  onChange={(e) => setnewpetDetails({ ...newpetDetails, gender: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>

            {/* Multiple Image Upload */}
            <div className="mt-8">
              <label className="block text-gray-300 mb-4 text-xl font-bold">
                Upload Pet Photos * (Max 5 images)
              </label>
              <div className="border-8 border-dashed border-purple-400 rounded-2xl p-10 text-center bg-gray-800/50 hover:border-purple-500 transition">
                <FaUpload className="text-6xl text-purple-400 mx-auto mb-4" />
                <p className="text-xl text-gray-300">Click to upload or drag & drop</p>
                <p className="text-gray-500 mt-2">{uploadedPetImages.length}/5 images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePetImageUpload}
                  className="mt-6 w-full cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  disabled={uploadedPetImages.length >= 5}
                />
              </div>

              {/* Preview */}
              {uploadedPetImages.length > 0 && (
                <div className="mt-6 grid grid-cols-3 md:grid-cols-5 gap-4">
                  {uploadedPetImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Pet ${index + 1}`} className="h-32 w-full object-cover rounded-xl border-4 border-purple-300" />
                      <button
                        type="button"
                        onClick={() => removePetImage(index)}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-6 justify-end">
              <button
                onClick={() => { setShowAddPetModal(false); reset(); }}
                className="px-10 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={()=>{{addnewpet(),getallsellingpets()}}}
                disabled={uploadedPetImages.length === 0}
                className={`px-12 py-4 rounded-xl font-bold text-xl shadow-xl transition ${uploadedPetImages.length === 0
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  }`}
              >
                Publish Pet
              </button>
            </div>
          </div>
        </div>
      )}

      {showeditPetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full p-10 border border-purple-600 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white">Edit Pet for Sale</h2>
              <button onClick={() => { setshoweditPetModal(false); reset(); }} className="text-3xl hover:text-gray-400">
                <FaTimes />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-300 mb-2">Pet Name *</label>
                <input
                  value={editpetDetails.petname}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, petname: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., Max"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Breed *</label>
                <input
                  value={editpetDetails.breed}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, breed: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., Golden Retriever"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Age *</label>
                <input
                  value={editpetDetails.age}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, age: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Price (₹) *</label>
                <input
                  value={editpetDetails.price}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, price: e.target.value })}
                  type="number"
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="32000"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Location *</label>
                <input
                  value={editpetDetails.location}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, location: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  placeholder="Kochi, Kerala"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Gender *</label>
                <select
                  value={editpetDetails.gender}
                  onChange={(e) => seteditpetDetails({ ...editpetDetails, gender: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-800 rounded-lg focus:ring-4 focus:ring-purple-600 outline-none"
                  required
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>


            {/* Edit Images Section */}
            <div className="mt-10">
              <label className="block text-gray-300 mb-4 text-xl font-bold">
                Pet Photos ({(editpetDetails.photos?.length || 0)}/5)
              </label>

              {/* Show All Images (existing + new) */}
              {(editPetImagePreviews.length > 0 || (editpetDetails.photos && editpetDetails.photos.some(p => p instanceof File))) && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-6">
                  {/* Existing images (from server) */}
                  {editPetImagePreviews.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <img
                        src={url}
                        alt={`Pet photo ${index + 1}`}
                        className="h-32 w-full object-cover rounded-xl border-4 border-purple-300 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newPreviews = editPetImagePreviews.filter((_, i) => i !== index);
                          const newPhotos = editpetDetails.photos.filter((photo, i) =>
                            typeof photo === "string" && i !== index
                          );
                          setEditPetImagePreviews(newPreviews);
                          seteditpetDetails({ ...editpetDetails, photos: newPhotos });
                        }}
                        className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}

                  {/* New uploaded images */}
                  {editpetDetails.photos && editpetDetails.photos
                    .filter(photo => photo instanceof File)
                    .map((file, index) => {
                      const previewUrl = URL.createObjectURL(file);
                      const actualIndex = editPetImagePreviews.length + index;
                      return (
                        <div key={`new-${index}`} className="relative group">
                          <img
                            src={previewUrl}
                            alt={`New photo ${index + 1}`}
                            className="h-32 w-full object-cover rounded-xl border-4 border-purple-300 shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = editpetDetails.photos.filter((_, i) =>
                                !(editpetDetails.photos[i] instanceof File && i === editPetImagePreviews.length + index)
                              );
                              seteditpetDetails({ ...editpetDetails, photos: newFiles });
                            }}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Upload New Images */}
              <div className="border-8 border-dashed border-purple-400 rounded-2xl p-8 text-center bg-gray-800/50 hover:border-purple-500 transition">
                <FaUpload className="text-6xl text-purple-400 mx-auto mb-4" />
                <p className="text-xl text-gray-300">Add more photos</p>
                <p className="text-gray-500 mt-2">
                  Current: {(editpetDetails.photos?.length || 0)} • Can add: {5 - (editpetDetails.photos?.length || 0)}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const currentCount = editpetDetails.photos?.length || 0;
                    if (currentCount + files.length > 5) {
                      toast.warning(`Maximum 5 photos allowed. You can add ${5 - currentCount} more.`);
                      return;
                    }
                    seteditpetDetails({ ...editpetDetails, photos: [...editpetDetails.photos, ...files] });
                  }}
                  className="mt-6 w-full cursor-pointer file:mr-4 file:py-3 file:px-6 file:rounded-xl file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                  disabled={(editpetDetails.photos?.length || 0) >= 5}
                />
              </div>
            </div>

            <div className="mt-10 flex gap-6 justify-end">
              <button
                onClick={() => { setshoweditPetModal(false); reset(); }}
                className="px-10 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updatesellingpet();
                  setshoweditPetModal(false);
                  reset();
                  getallsellingpets();
                }}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-bold text-xl shadow-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModalOpen && selectedImages.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8" onClick={() => setImageModalOpen(false)}>
          <div className="max-w-5xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 bg-gray-800">
              <h3 className="text-2xl font-bold text-white">Pet Images ({selectedImages.length})</h3>
              <button onClick={() => setImageModalOpen(false)} className="text-3xl text-gray-400 hover:text-white">
                <FaTimes />
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[70vh] overflow-y-auto">
              {selectedImages.map((photo, index) => (
                <img
                  key={index}
                  src={`${SERVERURL}/uploadImages/${photo}`}
                  alt={`Pet image ${index + 1}`}
                  className="w-full h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;