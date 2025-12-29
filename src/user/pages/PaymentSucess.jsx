import React from 'react';
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';
import { Link } from 'react-router-dom';

function PaymentSuccess() {
  return (
    <>
      <Header />

      {/* Success Section */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-20 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-green-100 text-green-700 px-6 py-3 rounded-full text-lg font-semibold mb-6">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L10 10.586l-1.293-1.293z" clipRule="evenodd" />
              </svg>
              Payment Successful!
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-orange-600 leading-tight">
              Woof! Meow! Congratulations! 🐾
            </h1>

            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              Thank you for choosing <span className="font-bold text-orange-600">PetHub</span>! 
              Your payment has been successfully processed. We're thrilled to help you give your pet the love, care, and joy they deserve.
            </p>

            <p className="mt-4 text-lg text-gray-600">
              Whether it's a new toy, grooming service, or adoption — a happy pet adventure awaits!
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/userdashboard"
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg rounded-xl shadow-lg transition transform hover:scale-105"
              >
                Go to My Dashboard
              </Link>

              <Link
                to="/"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-orange-600 font-semibold text-lg rounded-xl shadow-lg border-2 border-orange-600 transition transform hover:scale-105"
              >
                Explore More Pets & Services
              </Link>
            </div>
          </div>

          {/* Right: Pet Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://cdn.pixabay.com/photo/2024/04/24/16/09/dog-8717853_1280.png"
              alt="Happy dog and cat celebrating with confetti"
              className="w-full max-w-md drop-shadow-2xl animate-bounce-slow"
            />
          </div>
        </div>

        {/* Fun Pet Paw Prints Decoration */}
        <div className="mt-20 text-center text-gray-400">
          <p className="text-6xl">🐾 🐶 🐱 🐾</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PaymentSuccess;