import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section id="home" className="pt-28">
        <div
          className="bg-[#ffcb68] md:bg-[url('https://s3.ap-southeast-2.amazonaws.com/ls-asset-service/cku253woo008a08i3dewa7nln/cku253woo008b08i30qhlcqwi')] bg-cover bg-center bg-no-repeat 
          flex flex-col md:flex-row items-center justify-between px-10 py-25"
        >
          <div className="md:mx-12 md:w-1/2">
            <h1 className="md:text-6xl text-3xl font-bold text-gray-800 leading-tight">
              Choosing the Right Partner for Your Pet
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Connect with adorable pets, adopt your favorite companion, and
              explore our pet-friendly world.
            </p>
            <button onClick={() => navigate("/login")} className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition">
              Explore Pets
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About PetHub
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <img
            src="https://t4.ftcdn.net/jpg/07/00/88/79/360_F_700887990_N5qrQLgFO8zgzmqRXbS4m4dRKHValmPM.jpg"
            alt=""
            className="rounded-2xl shadow-lg"
          />

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-3 text-orange-600">
              A Place Made With Love for Pets
            </h3>
            <p className="text-gray-700 leading-relaxed">
              PetHub is your trusted place to find pets, adopt rescues, and get
              expert advice from trained animal lovers. We aim to create a safe,
              joyful, and caring environment for every pet lover.
            </p>
            <button onClick={() => navigate("/login")} className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-xl transition font-semibold w-fit">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* UPDATED SERVICES SECTION */}
      <section id="services" className="py-20 bg-orange-50 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-10 justify-center">
          {[
            {
              title: "Pet Adoption",
              img: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
            },
            {
              title: "Found / Lost Pets",
              img: "https://images.pexels.com/photos/5731861/pexels-photo-5731861.jpeg",
            },
            {
              title: "Report Missing",
              img: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
            },
            {
              title: "Buy New Pets",
              img: "https://images.pexels.com/photos/14440674/pexels-photo-14440674.jpeg",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={service.img}
                alt=""
                className="rounded-xl h-40 w-full object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mt-4">{service.title}</h3>
              <p className="text-gray-600 mt-2">
                Quick & reliable service available 24/7.
              </p>
              <button onClick={() => navigate("/login")} className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PET LISTING SECTION */}
      <section id="pets" className="py-10 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Featured Pets
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              name: "Golden Retriever",
              price: "₹25,000",
              img: "https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg",
            },
            {
              name: "Persian Cat",
              price: "₹18,000",
              img: "https://puppiezo.com/wp-content/uploads/2025/06/PERISAN-CAT-DOLL-FACE-2-scaled.jpg",
            },
            {
              name: "German Shepherd",
              price: "₹30,000",
              img: "https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg",
            },
          ].map((pet, i) => (
            <div
              key={i}
              className="bg-orange-50 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <img
                src={pet.img}
                className="rounded-t-xl h-60 w-full object-cover"
                alt=""
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
                <p className="text-gray-600 mt-2">Price: {pet.price}</p>
                <button onClick={() => navigate("/login")} className="mt-4 bg-orange-600 hover:bg-orange-700 w-full text-white px-6 py-2 rounded-lg transition font-semibold">
                  Know More / Explore
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-10">
          <button onClick={() => navigate("/login")} className="bg-black hover:bg-gray-800 text-white px-10 py-3 rounded-xl font-semibold transition">
            Explore More Pets
          </button>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-10 px-6 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Akhil", "Manu", "Dinu"].map((name, i) => (
            <div
              key={i}
              className="bg-orange-100 rounded-xl p-8 shadow hover:shadow-xl transition"
            >
              <p className="text-gray-700 italic">
                “Amazing platform! Found my best pet companion. Highly recommended!”
              </p>
              <h3 className="mt-4 font-semibold text-xl text-orange-700">
                - {name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-gray-900 text-white px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-300 mb-6">
              Have questions or need help? Our friendly team is here for you.
            </p>
            <p className="font-semibold">📍 Kochi, Kerala</p>
            <p className="font-semibold mt-2">📞 +91 6235452818</p>
            <p className="font-semibold mt-2">📧 support@pethub.com</p>
          </div>

          <form className="bg-white text-gray-800 p-6 rounded-xl shadow-xl">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded mb-3"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded mb-3"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-3 border rounded mb-3"
            ></textarea>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer/>
    </>
  );
}

export default LandingPage;
