import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaEdit, FaTrash,
  FaLock, FaPaw, FaHeart, FaExclamationTriangle, FaCheckCircle,
  FaShoppingCart, FaCalendarAlt, FaTimes, FaPlus, FaUpload
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  handledeleteuserpet,
  handlegetalluseradoptpets, handlegetalluserfoundpets,
  handlegetalluserlostpets, handlegetalluserpets,
  handlegetalluserstraypets, handleupdateprofile,
  handleupdateprofilepic, reportadoptpetapi, updatepasswordapi,
  updateuserpetapi,

} from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";
import { userProfileUpdateContent } from "../../context/ContextShare";

function UserProfile() {
    const {setuserProfileUpdateStatus,userProfileUpdateStatus}=useContext(userProfileUpdateContent)

  // Modal States
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [adoptionModal, setAdoptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, type: "" });

  // Data States
  const [alladoptpetsdata, setalladoptpetsdata] = useState([]);
  const [allstraypetsdata, setallstraypetsdata] = useState([]);
  const [alllostpetsdata, setalllostpetsdata] = useState([]);
  const [allfoundpetsdata, setallfoundpetsdata] = useState([]);
  const [editPetModal, setEditPetModal] = useState(false);
  const [currentEditPet, setCurrentEditPet] = useState({});
  const [currentEditType, setCurrentEditType] = useState(""); // "adopt", "lost", "found", "stray"


  // User Details
  const [userdetails, setUserdetails] = useState({
    _id: '', username: "", email: "", profile: "", bio: "", phone: "", location: "", joinDate: ""
  });

  const [edituserdetails, setEditUserdetails] = useState({ ...userdetails });
  const [userpassword, setUserPassword] = useState({ password: "", newpassword: "", confirm: "" });

  // Current pet being edited

  // Adoption Form (New & Edit)
  const [adoptiondata, setAdoptionData] = useState({
    _id: "", petname: "", breed: "", age: "", gender: "", animaltype: "",
    vaccinated: "", contactno: "", location: "", neutered: "", bio: "", photos: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [profileImage, setProfileImage] = useState("https://www.w3schools.com/howto/img_avatar.png");

  // Load user from session
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userdetails"));
    if (userData) {
      setUserdetails(userData);
      setEditUserdetails(userData);
      if (userData.profile) {
        setProfileImage(`${SERVERURL}/uploadImages/${userData.profile}`);
      }
      handlegetallpets();
    }
  }, [userProfileUpdateStatus]);

  // Fetch all user reports
  const handlegetallpets = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const adopt = await handlegetalluseradoptpets(reqHeader);
      console.log(adopt);

      setalladoptpetsdata(adopt.data || []);

      const found = await handlegetalluserfoundpets(reqHeader);
      setallfoundpetsdata(found.data || []);

      const lost = await handlegetalluserlostpets(reqHeader);
      setalllostpetsdata(lost.data || []);

      const stray = await handlegetalluserstraypets(reqHeader);
      setallstraypetsdata(stray.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Profile picture update
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("profile", file);
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      const result = await handleupdateprofilepic(formData, reqHeader);
      if (result?.data?.user?.profile) {
        const newUrl = `${SERVERURL}/uploadImages/${result.data.user.profile}`;
        setProfileImage(newUrl);
        const updatedUser = { ...userdetails, profile: result.data.user.profile };
        sessionStorage.setItem("userdetails", JSON.stringify(updatedUser));
        setUserdetails(updatedUser);
      }
    } catch (err) {
      console.error("Profile pic update failed", err);
    }
  };

  // Save edited profile
  const handleSaveProfile = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handleupdateprofile(edituserdetails, reqHeader);
      if (result.status === 200) {
        setUserdetails(result.data.user || edituserdetails);
        setuserProfileUpdateStatus(true)
        window.location.reload();
        sessionStorage.setItem("userdetails", JSON.stringify(result.data.user || edituserdetails));
        setEditModal(false);
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Change password
  const updatepassword = async () => {
    if (userpassword.newpassword !== userpassword.confirm) {
      toast.warning("Passwords do not match");
      return;
    }
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const payload = { currentPassword: userpassword.password, newPassword: userpassword.newpassword };
      const result = await updatepasswordapi(payload, reqHeader);
      if (result.status === 200) {
        toast.success("Password updated successfully!");
        setPasswordModal(false);
        setUserPassword({ password: "", newpassword: "", confirm: "" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  // Image upload handler (shared)
  const handleImageUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const currentCount = uploadedImages.length;
    if (currentCount + files.length > 5) {
      toast.warning("Maximum 5 images allowed");
      return;
    }
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newPreviews]);

    if (type === "adopt") {
      setAdoptionData({ ...adoptiondata, photos: [...adoptiondata.photos, ...files] });
    }
  };

  const removeImage = (index) => {
    const newPreviews = uploadedImages.filter((_, i) => i !== index);
    const newFiles = adoptiondata.photos.filter((_, i) => i !== index);
    setUploadedImages(newPreviews);
    setAdoptionData({ ...adoptiondata, photos: newFiles });
  };

  // Submit new adoption
  const handleSubmitAdoption = async () => {
    if (adoptiondata.photos.length === 0) {
      toast.warning("Please upload at least one photo");
      return;
    }
    const formData = new FormData();
    Object.keys(adoptiondata).forEach(key => {
      if (key === "photos") {
        adoptiondata.photos.forEach(file => formData.append("uploadImages", file));
      } else {
        formData.append(key, adoptiondata[key]);
      }
    });

    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    try {
      await reportadoptpetapi(formData, reqHeader);
      toast.success("Pet listed for adoption successfully!");
      setAdoptionModal(false);
      setAdoptionData({ petname: "", breed: "", age: "", gender: "", animaltype: "", vaccinated: "", contactno: "", location: "", neutered: "", bio: "", photos: [] });
      setUploadedImages([]);
      handlegetallpets();
    } catch (err) {
      toast.error("Failed to submit");
    }
  };


  // Edit form data (shared for all types)
  const [editFormData, setEditFormData] = useState({
    _id: "",
    petname: "", breed: "", age: "", gender: "", animaltype: "",
    vaccinated: "", contactno: "", location: "", neutered: "", bio: "",
    condition: "", mdate: "", identification: "", price: "",
    existingPhotos: [], // string array of old filenames
    photos: [] // new File objects
  });

  // Open edit modal with correct data
  const openEditModal = (pet, type) => {
    setCurrentEditPet(pet);
    setCurrentEditType(type);

    // Pre-fill form
    setEditFormData({
      _id: pet._id,
      petname: pet.petname || "",
      breed: pet.breed || "",
      age: pet.age || "",
      gender: pet.gender || "",
      animaltype: pet.animaltype || "",
      vaccinated: pet.vaccinated || "",
      contactno: pet.contactno || "",
      location: pet.location || "",
      neutered: pet.neutered || "",
      bio: pet.bio || "",
      condition: pet.condition || "",
      mdate: pet.mdate || "",
      identification: pet.identification || "",
      price: pet.price || "",
      existingPhotos: pet.photos || [],
      photos: []
    });

    // Show existing images as previews
    const existingPreviews = (pet.photos || []).map(p => `${SERVERURL}/uploadImages/${p}`);
    setUploadedImages(existingPreviews);

    setEditPetModal(true);
  };

  // Handle image upload in edit modal
  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentTotal = editFormData.existingPhotos.length + editFormData.photos.length;

    if (currentTotal + files.length > 5) {
      toast.warning(`Maximum 5 images allowed. You can add ${5 - currentTotal} more.`);
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newPreviews]);
    setEditFormData({ ...editFormData, photos: [...editFormData.photos, ...files] });
  };

  // Remove image from edit preview
  const removeEditImage = (index) => {
    const isExisting = index < editFormData.existingPhotos.length;

    if (isExisting) {
      const newExisting = editFormData.existingPhotos.filter((_, i) => i !== index);
      setEditFormData({ ...editFormData, existingPhotos: newExisting });
    } else {
      const actualIndex = index - editFormData.existingPhotos.length;
      const newFiles = editFormData.photos.filter((_, i) => i !== actualIndex);
      setEditFormData({ ...editFormData, photos: newFiles });
    }

    const newPreviews = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newPreviews);
  };

  // Submit update
  const handleUpdatePet = async () => {
    const totalPhotos = editFormData.existingPhotos.length + editFormData.photos.length;
    if (totalPhotos === 0) {
      toast.warning("At least one photo is required");
      return;
    }

    const formData = new FormData();
    formData.append("_id", editFormData._id);
    formData.append("existingPhotos", JSON.stringify(editFormData.existingPhotos));

    // Append all text fields
    const textFields = ["petname", "breed", "age", "gender", "animaltype", "vaccinated", "contactno", "location", "neutered", "bio", "condition", "mdate", "identification", "price"];
    textFields.forEach(field => {
      if (editFormData[field]) formData.append(field, editFormData[field]);
    });

    // Append new files
    editFormData.photos.forEach(file => formData.append("uploadImages", file));

    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await updateuserpetapi(formData, reqHeader);
      console.log(result);
      
      if (result.status === 200) {
        toast.success("Updated successfully!");
        setEditPetModal(false);
        handlegetallpets();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };




  // Delete handler
const handleDelete = async () => {
  const { id } = deleteModal;
  if (!id) return;

  const token = sessionStorage.getItem("token");
  const reqHeader = { Authorization: `Bearer ${token}` };

  // Send id as body: { _id: id }
  const reqBody = { _id: id };

  try {
    const result = await handledeleteuserpet(reqBody, reqHeader);
    
    if (result.status === 200) {
      toast.success("Deleted successfully!");
      handlegetallpets(); // Refresh the lists
      setDeleteModal({ show: false, id: null, type: "" });
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error(err.response?.data?.message || "Failed to delete");
  }
};
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 mt-10">
        <div className="container mx-auto px-6">

          {/* Profile Header Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border-4 border-orange-200">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-8 border-orange-400 shadow-xl"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 text-white p-3 rounded-full shadow-lg">
                  <FaCheckCircle className="text-2xl" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-4 justify-center md:justify-start">
                  {userdetails.username || "Pet Lover"}
                  <FaPaw className="text-orange-600 text-4xl animate-bounce" />
                </h1>
                <p className="text-2xl text-orange-700 mt-2">{userdetails.bio || "Pet Lover & Animal Rescuer"}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-lg text-gray-700">
                  <p className="flex items-center gap-3"><FaEnvelope /> {userdetails.email}</p>
                </div>
                
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => { setEditModal(true); setEditUserdetails(userdetails); }} className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center gap-3">
                  <FaEdit /> Edit Profile
                </button>
                <button onClick={() => setPasswordModal(true)} className="bg-gray-700 hover:bg-gray-800 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center gap-3">
                  <FaLock /> Change Password
                </button>
                <button onClick={() => setAdoptionModal(true)} className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition flex items-center gap-3 justify-center">
                  <FaPlus /> Put Pet on Adoption
                </button>
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Your PetHub Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaHeart className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{alladoptpetsdata.length}</p>
              <p className="text-xl mt-2">Pets Given for Adoption</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaPaw className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{allfoundpetsdata.length}</p>
              <p className="text-xl mt-2">Found Pets Reported</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaExclamationTriangle className="text-6xl mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold">{alllostpetsdata.length}</p>
              <p className="text-xl mt-2">Lost Pets Reported</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl text-center transform hover:scale-110 transition">
              <FaPaw className="text-6xl mx-auto mb-4 opacity-90 rotate-12" />
              <p className="text-5xl font-bold">{allstraypetsdata.length}</p>
              <p className="text-xl mt-2">Strays Helped</p>
            </div>
          </div>

          {/* === MY ACTIVITY OVERVIEW === */}
          <div className="space-y-20">

            {/* My Adoption Listings */}
            <section>
              <h2 className="text-3xl font-bold text-teal-800 mb-8 flex items-center gap-4">
                <FaHeart className="text-4xl text-teal-600" /> My Adoption Listings ({alladoptpetsdata.length})
              </h2>
              {alladoptpetsdata.length === 0 ? (
                <p className="text-center text-gray-600 py-12">You haven't listed any pets for adoption yet</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-10">
                  {alladoptpetsdata.map((pet) => (
                    <div key={pet._id} className="bg-white rounded-2xl shadow-xl border-4 border-teal-200 p-6">
                      <img
                        src={pet.photos?.[0] ? `${SERVERURL}/uploadImages/${pet.photos[0]}` : "https://via.placeholder.com/300"}
                        alt={pet.petname}
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.petname}</h3>
                      <p className="text-teal-700">{pet.breed} • {pet.age}</p>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                        <FaMapMarkerAlt /> {pet.location}
                      </p>
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openEditModal(pet, "adopt")}
                          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal({ show: true, id: pet._id, type: "adopt" })}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* My Lost Pet Reports */}
            <section>
              <h2 className="text-3xl font-bold text-red-800 mb-8 flex items-center gap-4">
                <FaExclamationTriangle className="text-4xl text-red-600" /> My Lost Pet Reports ({alllostpetsdata.length})
              </h2>
              {alllostpetsdata.length === 0 ? (
                <p className="text-center text-gray-600 py-12">No lost pet reports</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-10">
                  {alllostpetsdata.map((pet) => (
                    <div key={pet._id} className="bg-white rounded-2xl shadow-xl border-4 border-red-200 p-6">
                      <img
                        src={pet.photos?.[0] ? `${SERVERURL}/uploadImages/${pet.photos[0]}` : "https://via.placeholder.com/300"}
                        alt={pet.petname}
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{pet.petname}</h3>
                      <p className="text-red-700">Last seen: {pet.location}</p>
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openEditModal(pet, "lost")}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit Alert
                        </button>
                        <button
                          onClick={() => setDeleteModal({ show: true, id: pet._id, type: "lost" })}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* My Found Pet Reports */}
            <section>
              <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-4">
                <FaPaw className="text-4xl text-green-600" /> Found Pets I Reported ({allfoundpetsdata.length})
              </h2>
              {allfoundpetsdata.length === 0 ? (
                <p className="text-center text-gray-600 py-12">No found reports yet</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-10">
                  {allfoundpetsdata.map((pet) => (
                    <div key={pet._id} className="bg-white rounded-2xl shadow-xl border-4 border-green-200 p-6">
                      <img
                        src={pet.photos?.[0] ? `${SERVERURL}/uploadImages/${pet.photos[0]}` : "https://via.placeholder.com/300"}
                        alt="Found pet"
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />
                      <p className="text-green-700 font-medium text-lg mb-3">{pet.animaltype || "Pet"} found</p>
                      <p className="text-gray-700 text-sm flex items-center gap-1">
                        <FaMapMarkerAlt /> {pet.location}
                      </p>
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openEditModal(pet, "found")}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal({ show: true, id: pet._id, type: "found" })}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* My Stray Reports */}
            <section>
              <h2 className="text-3xl font-bold text-amber-800 mb-8 flex items-center gap-4">
                <FaPaw className="text-4xl text-amber-600" /> Strays I Helped ({allstraypetsdata.length})
              </h2>
              {allstraypetsdata.length === 0 ? (
                <p className="text-center text-gray-600 py-12">No stray reports yet — thank you for caring!</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-10">
                  {allstraypetsdata.map((pet) => (
                    <div key={pet._id} className="bg-white rounded-2xl shadow-xl border-4 border-amber-200 p-6">
                      <img
                        src={pet.photos?.[0] ? `${SERVERURL}/uploadImages/${pet.photos[0]}` : "https://via.placeholder.com/300"}
                        alt="Stray"
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />
                      <p className="text-amber-700 font-medium text-lg mb-2">{pet.animaltype}</p>
                      <p className="text-gray-700 text-sm flex items-center gap-1 mb-3">
                        <FaMapMarkerAlt /> {pet.location}
                      </p>
                      <p className="text-sm text-gray-600 italic">{pet.condition || "Needs help"}</p>
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openEditModal(pet, "stray")}
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal({ show: true, id: pet._id, type: "stray" })}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border-8 border-red-500 text-center">
            <FaExclamationTriangle className="text-8xl text-red-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Delete This Report?</h3>
            <p className="text-gray-600 mb-8">This action cannot be undone.</p>
            <div className="flex gap-6">
              <button
                onClick={() => setDeleteModal({ show: false, id: null, type: "" })}
                className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition"
              >
                Cancel
              </button>
              <button
                onClick={()=>{handleDelete()}}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-10 border-8 border-orange-400">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
                <FaEdit className="text-orange-600" /> Edit Profile
              </h2>
              <button onClick={() => setEditModal(false)} className="text-4xl hover:bg-gray-100 rounded-full p-2 transition">
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto border-4 border-orange-400" />
                <input id="profilePicInput" type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                <button className="mt-4 text-orange-600 font-bold hover:underline" onClick={() => document.getElementById('profilePicInput').click()}>
                  Change Photo
                </button>
              </div>

              <input type="text" placeholder="Username" value={edituserdetails.username} onChange={(e) => setEditUserdetails({ ...edituserdetails, username: e.target.value })} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />
              <input type="email" placeholder="Email" value={edituserdetails.email} onChange={(e) => setEditUserdetails({ ...edituserdetails, email: e.target.value })} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg" />
              <textarea placeholder="Bio" value={edituserdetails.bio || ""} onChange={(e) => setEditUserdetails({ ...edituserdetails, bio: e.target.value })} className="w-full px-6 py-4 border-2 border-orange-300 rounded-xl focus:border-orange-600 focus:outline-none text-lg resize-none" rows="3"></textarea>

              <div className="flex gap-4 pt-6">
                <button onClick={handleSaveProfile} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition">
                  Save Changes
                </button>
                <button onClick={() => setEditModal(false)} className="px-10 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 border-8 border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
                <FaLock className="text-gray-700" /> Change Password
              </h2>
              <button onClick={() => setPasswordModal(false)} className="text-4xl hover:bg-gray-100 rounded-full p-2 transition">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); updatepassword(); }} className="space-y-6">
              <input
                type="password"
                placeholder="Current Password"
                value={userpassword.password}
                onChange={(e) => setUserPassword({ ...userpassword, password: e.target.value })}
                className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={userpassword.newpassword}
                onChange={(e) => setUserPassword({ ...userpassword, newpassword: e.target.value })}
                className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={userpassword.confirm}
                onChange={(e) => setUserPassword({ ...userpassword, confirm: e.target.value })}
                className="w-full px-6 py-4 border-2 border-gray-400 rounded-xl focus:border-gray-700 focus:outline-none text-lg"
                required
              />

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordModal(false);
                    setUserPassword({ password: "", newpassword: "", confirm: "" });
                  }}
                  className="px-10 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Adoption Modal */}
      {adoptionModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-8 border-teal-500">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-3">
                  <FaPaw className="text-teal-600" /> Put Pet Up for Adoption
                </h2>
                <button onClick={() => setAdoptionModal(false)} className="text-3xl hover:bg-gray-100 rounded-full p-2 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmitAdoption} className="space-y-8">
                {/* Photo Upload */}
                <div className="text-center">
                  <div className="border-4 border-dashed border-teal-300 rounded-2xl p-8 bg-teal-50">
                    <FaPaw className="text-6xl text-teal-500 mx-auto mb-4" />
                    <p className="text-lg lg:text-xl text-gray-700 mb-4">
                      Upload photos of your pet (up to 5)
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {uploadedImages.length}/5 images selected
                    </p>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-6 max-h-64 overflow-y-auto">
                        {uploadedImages.map((src, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={src}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg shadow-lg border-2 border-teal-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                            >
                              <FaTimes className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <input
                      id="adoptionPhotos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, "adopt")}
                      disabled={uploadedImages.length >= 5}
                    />
                    <button
                      type="button"
                      disabled={uploadedImages.length >= 5}
                      onClick={() => document.getElementById('adoptionPhotos').click()}
                      className={`${uploadedImages.length >= 5
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"
                        } text-white font-semibold py-3 px-8 rounded-xl transition shadow-md`}
                    >
                      {uploadedImages.length >= 5 ? "Max 5 Images Reached" : "Choose Images"}
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <input type="text" placeholder="Pet Name *" value={adoptiondata.petname} onChange={e => setAdoptionData({ ...adoptiondata, petname: e.target.value })} required className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <input type="text" placeholder="Breed" value={adoptiondata.breed} onChange={e => setAdoptionData({ ...adoptiondata, breed: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <input type="text" placeholder="Age (e.g. 2 years)" value={adoptiondata.age} onChange={e => setAdoptionData({ ...adoptiondata, age: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <select value={adoptiondata.gender} onChange={e => setAdoptionData({ ...adoptiondata, gender: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base">
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <select value={adoptiondata.animaltype} onChange={e => setAdoptionData({ ...adoptiondata, animaltype: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base">
                    <option value="">Pet Type</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Other</option>
                  </select>
                  <input type="text" placeholder="Vaccinated? (Yes/No)" value={adoptiondata.vaccinated} onChange={e => setAdoptionData({ ...adoptiondata, vaccinated: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <input type="tel" placeholder="Contact Number *" value={adoptiondata.contactno} onChange={e => setAdoptionData({ ...adoptiondata, contactno: e.target.value })} required className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <input type="text" placeholder="Location *" value={adoptiondata.location} onChange={e => setAdoptionData({ ...adoptiondata, location: e.target.value })} required className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                  <input type="text" placeholder="Neutered? (Yes/No)" value={adoptiondata.neutered} onChange={e => setAdoptionData({ ...adoptiondata, neutered: e.target.value })} className="px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base" />
                </div>

                <textarea rows="5" placeholder="Description *" value={adoptiondata.bio} onChange={e => setAdoptionData({ ...adoptiondata, bio: e.target.value })} required className="w-full px-5 py-4 border-2 border-teal-300 rounded-xl focus:border-teal-600 focus:outline-none text-base resize-none"></textarea>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button type="submit" disabled={uploadedImages.length === 0} className={`flex-1 py-4 rounded-2xl font-bold text-lg shadow-lg transform hover:scale-105 transition ${uploadedImages.length === 0 ? "bg-gray-400 cursor-not-allowed text-gray-700" : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"}`}>
                    {uploadedImages.length === 0 ? "Add at least 1 photo" : "Submit for Adoption"}
                  </button>
                  <button type="button" onClick={() => {
                    setAdoptionModal(false);
                    setAdoptionData({ petname: "", breed: "", age: "", gender: "", animaltype: "", vaccinated: "", contactno: "", location: "", neutered: "", bio: "", photos: [] });
                    setUploadedImages([]);
                  }} className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Single Edit Modal for ALL Types */}
      {editPetModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-8 border-purple-500">
            <div className="p-8 lg:p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  Edit {currentEditType === "adopt" ? "Adoption Listing" :
                    currentEditType === "lost" ? "Lost Pet Alert" :
                      currentEditType === "found" ? "Found Pet Report" :
                        "Stray Report"}
                </h2>
                <button onClick={() => setEditPetModal(false)} className="text-3xl hover:bg-gray-100 rounded-full p-2 transition">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleUpdatePet(); }} className="space-y-8">
                {/* Photo Upload & Preview */}
                <div className="text-center">
                  <div className="border-4 border-dashed border-purple-300 rounded-2xl p-8 bg-purple-50">
                    <FaUpload className="text-6xl text-purple-600 mx-auto mb-4" />
                    <p className="text-xl text-gray-700 mb-4">Update Photos (up to 5 total)</p>
                    <p className="text-sm text-gray-600 mb-6">
                      {uploadedImages.length} images ({editFormData.existingPhotos.length} existing + {editFormData.photos.length} new)
                    </p>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-6 max-h-64 overflow-y-auto">
                        {uploadedImages.map((src, index) => {
                          const isExisting = index < editFormData.existingPhotos.length;
                          return (
                            <div key={index} className="relative group">
                              <img src={src} alt="Preview" className="w-full h-32 object-cover rounded-lg shadow-lg border-2 border-purple-200" />
                              <button
                                type="button"
                                onClick={() => removeEditImage(index)}
                                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                              >
                                <FaTimes className="text-sm" />
                              </button>
                              {isExisting && <span className="absolute bottom-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">Old</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <input
                      id="editPhotos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditImageUpload}
                      disabled={uploadedImages.length >= 5}
                    />
                    <button
                      type="button"
                      disabled={uploadedImages.length >= 5}
                      onClick={() => document.getElementById('editPhotos').click()}
                      className={`${uploadedImages.length >= 5 ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"} text-white font-semibold py-3 px-8 rounded-xl transition`}
                    >
                      Add New Photos
                    </button>
                  </div>
                </div>

                {/* Dynamic Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <input type="text" placeholder="Pet Name" value={editFormData.petname} onChange={e => setEditFormData({ ...editFormData, petname: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  <input type="text" placeholder="Breed" value={editFormData.breed} onChange={e => setEditFormData({ ...editFormData, breed: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  <input type="text" placeholder="Age" value={editFormData.age} onChange={e => setEditFormData({ ...editFormData, age: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  <select value={editFormData.gender} onChange={e => setEditFormData({ ...editFormData, gender: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base">
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <input type="text" placeholder="Location *" value={editFormData.location} onChange={e => setEditFormData({ ...editFormData, location: e.target.value })} required className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  <input type="tel" placeholder="Contact Number" value={editFormData.contactno} onChange={e => setEditFormData({ ...editFormData, contactno: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />

                  {/* Type-specific fields */}
                  {currentEditType === "adopt" && (
                    <>
                      <input type="text" placeholder="Price" value={editFormData.price} onChange={e => setEditFormData({ ...editFormData, price: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                      <input type="text" placeholder="Vaccinated?" value={editFormData.vaccinated} onChange={e => setEditFormData({ ...editFormData, vaccinated: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                      <input type="text" placeholder="Neutered?" value={editFormData.neutered} onChange={e => setEditFormData({ ...editFormData, neutered: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                    </>
                  )}
                  {currentEditType === "stray" && (
                    <input type="text" placeholder="Condition" value={editFormData.condition} onChange={e => setEditFormData({ ...editFormData, condition: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  )}
                  {currentEditType === "lost" && (
                    <input type="date" value={editFormData.mdate} onChange={e => setEditFormData({ ...editFormData, mdate: e.target.value })} className="px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base" />
                  )}
                </div>

                <textarea
                  rows="5"
                  placeholder="Description"
                  value={editFormData.bio}
                  onChange={e => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-purple-300 rounded-xl focus:border-purple-600 text-base resize-none"
                />

                <div className="flex gap-6 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xl py-5 rounded-2xl shadow-xl transition transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPetModal(false)}
                    className="px-12 py-5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default UserProfile;