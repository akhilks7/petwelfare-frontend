import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginAPI, handleregisterAPI } from "../../services/allAPI";
import { toast } from "react-toastify";
import { userProfileUpdateContent } from "../../context/ContextShare";

function Auth({ register }) {
  const{setuserProfileUpdateStatus}=useContext(userProfileUpdateContent)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [token, settoken] = useState("")
  console.log(data);

  const handlelogin = async () => {
    if (data.email == "" || data.password == "") {
      toast.warning("please fill in all feilds")
    } else {
      try {
        const result = await handleLoginAPI(data)
        console.log(result);
        if (result.status == 200 && result.data.existinguser.role == "user") {
          settoken(result.data.tocken)
          console.log(result.data.tocken);
          toast.success("loginned succssfully")
          setuserProfileUpdateStatus(true)
          navigate("/UserDashboard")
          sessionStorage.setItem("token", result.data.tocken)
          sessionStorage.setItem("userdetails", JSON.stringify(result.data.existinguser))
        } else if (result.status == 200 && result.data.existinguser.role == "admin"){
          settoken(result.data.tocken)
          console.log(result.data.tocken);
          toast.success("loginned succssfully")
          navigate("/admindashboard")
          sessionStorage.setItem("token", result.data.tocken)
          sessionStorage.setItem("userdetails", JSON.stringify(result.data.existinguser))
        }else{
          toast.error("something went wrong")
        }
      } catch (error) {
        console.log(error);

      }
    }


  }

  const handleRegister = async () => {
    try {
      if (data.username == "" || data.email == "" || data.password == "") {
        toast.warning(`please fill in all feilds`)
      } else {
       const result = await handleregisterAPI(data)
        console.log(result);
        if (result.status == 200) {
          toast.success(`registeration success`)
          navigate("/login")
        }

      }

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="w-full bg-[#fffaf1] min-h-screen flex flex-col">
      {/* Full-width container with max width for content */}
      <div className="w-full max-w-7xl mx-auto px-5 pt-8">
        {/* Back to Home Button - Top Left */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#d99d2e] hover:text-orange-700 font-semibold text-2xl transition-colors"
        >
          <FaArrowLeft className="text-2xl" />
          Back to Home
        </Link>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-5 pb-10">
        <div className="grid md:grid-cols-2 gap-10 w-full max-w-7xl items-stretch">

          <div className="bg-[#e3ba6c] text-white p-10 rounded-3xl shadow-2xl flex flex-col justify-center">

            <h1 className="text-4xl font-bold text-center">
              {register ? "Create Your Account" : "Welcome Back!"}
            </h1>
            <p className="text-center mt-2 opacity-90">
              {register
                ? "Please enter your details to register."
                : "Login to continue your journey."}
            </p>

            <div className="mt-8 space-y-5">
              {register && (
                <div className="relative">
                  <FaUser className="absolute top-4 left-4 text-gray-800" />
                  <input onChange={(e) => setdata({ ...data, username: e.target.value })}
                    type="text"
                    placeholder="Username"
                    className="w-full p-4 pl-12 rounded-xl text-gray-800 bg-white"
                  />
                </div>
              )}

              <div className="relative">
                <FaEnvelope className="absolute top-4 left-4 text-gray-800" />
                <input onChange={(e) => setdata({ ...data, email: e.target.value })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white p-4 pl-12 rounded-xl text-gray-800"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-4 left-4 text-gray-800" />
                <input onChange={(e) => setdata({ ...data, password: e.target.value })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-white p-4 pl-12 rounded-xl text-gray-800"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-4 cursor-pointer text-gray-700 text-xl"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>


              <button onClick={() => { register ? handleRegister() : handlelogin() }} className="w-full bg-white text-orange-700 font-bold py-3 rounded-xl mt-6 hover:bg-gray-100 transition">
                {register ? "Register" : "Login"}
              </button>


              {/* SWITCH LINKS */}
              <p className="text-center text-white mt-6">
                {register ? (
                  <>
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold underline">
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <Link to="/register" className="font-bold underline">
                      Register
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE - Desktop */}
          <div className="relative hidden md:flex items-center justify-center">
            <img
              src="https://t3.ftcdn.net/jpg/01/66/36/48/360_F_166364817_5HXRbTRNFk1nOp7ymC72o07kMkXirumm.jpg"
              alt="Cute pet"
              className="w-full max-w-lg lg:max-w-2xl rounded-3xl shadow-2xl object-cover"
              style={{ maxHeight: "720px" }}
            />
            <div className="absolute top-10 right-10 bg-[#ffcb68] text-gray-800 font-bold px-7 py-4 rounded-full shadow-xl text-xl">
              {register ? "Join Us!" : "Woof! Welcome Back!"}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Image - Below form */}
      <div className="md:hidden flex justify-center px-5 pb-10">
        <img
          src="https://t3.ftcdn.net/jpg/01/66/36/48/360_F_166364817_5HXRbTRNFk1nOp7ymC72o07kMkXirumm.jpg"
          alt="Cute pet"
          className="w-80 rounded-3xl shadow-xl"
        />
      </div>
    </div>
  );
}

export default Auth;