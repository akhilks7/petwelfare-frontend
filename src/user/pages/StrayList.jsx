import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaPaw, FaMapMarkerAlt, FaFilter, FaTimes, FaPhoneAlt,
  FaWhatsapp, FaExclamationTriangle, FaClock, FaHeart
} from "react-icons/fa";
import { handlegetstraypets } from "../../services/allAPI";
import SERVERURL from "../../services/serverURL";

function StrayList() {
  const [filter, setFilter] = useState("all");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);

  const [strayanimals, setstrayanimals] = useState([]);
  const [token, settoken] = useState("");

  // Fetch stray animals
  const getallstrayanimals = async () => {
    if (!token) return;
    const reqheader = { Authorization: `Bearer ${token}` };
    try {
      const result = await handlegetstraypets(reqheader);
      const data = result?.data || [];
      setstrayanimals(data);
    } catch (error) {
      console.error("Error fetching stray animals:", error);
      setstrayanimals([]);
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) settoken(stored);
  }, []);

  useEffect(() => {
    if (token) getallstrayanimals();
  }, [token]);

  // Filter reports
  const filteredReports = filter === "all"
  ? strayanimals
  : strayanimals.filter(r => r.condition === filter);

  const openReportModal = (report) => {
    setCurrentImageIndex(0);
    setSelectedReport(report);
  };

  // Status Badge
  const getStatusBadge = (status) => {
    const baseClasses = "px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2";
    switch (status) {
      case "rescue-dispatched":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}><FaPaw /> Rescue Sent</span>;
      case "feeding":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}><FaHeart /> Being Fed</span>;
      case "awaiting":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}><FaClock /> Awaiting Help</span>;
      case "urgent":
        return <span className={`${baseClasses} bg-red-100 text-red-800 animate-pulse`}><FaExclamationTriangle /> URGENT</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>Reported</span>;
    }
  };

  return (
    <>
      <Header />

      {/* Compact Amber Filter Bar */}
     {/* Compact Amber Filter Bar */}
<div className="bg-amber-50 border-b-8 border-amber-600 sticky top-23 z-40 shadow-xl">
  <div className="container mx-auto px-4 py-2">
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <div className="flex items-center gap-3 text-amber-800 font-bold">
        <FaFilter className="text-xl" />
        <span className="text-lg">Filter Reports</span>
        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm">
          {filteredReports.length} Reports
        </span>
      </div>

      {/* EXACT MATCH FILTERS - DO NOT CHANGE SPELLING OR SPACING */}
      {[
        "all",
        "Injured / Bleeding",
        "Sick / Weak",
        "Pregnant / Nursing",
        "Aggressive",
        "Friendly / Approaching People",
        "Normal but Hungry"
      ].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f === "all" ? "all" : f)}
          className={`px-5 py-3 rounded-xl font-medium transition ${
            filter === (f === "all" ? "all" : f)
              ? "bg-amber-600 text-white shadow-lg"
              : "bg-white text-amber-800 border border-amber-300 hover:bg-amber-100"
          }`}
        >
          {f === "all" ? "All Reports" : f}
        </button>
      ))}
    </div>
  </div>
</div>

      {/* Compact Grid */}
      <div className="container mx-auto px-4 py-10 mt-17">
        {filteredReports.length === 0 ? (
          <div className="text-center py-20">
            <FaPaw className="text-8xl text-amber-200 mx-auto mb-6 opacity-40" />
            <p className="text-2xl text-gray-600 font-semibold">No active stray reports</p>
            <p className="text-gray-500 mt-2">New reports will appear here when submitted</p>
          </div>
        ) : (
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredReports.map((report) => {
              const firstPhoto = report.photos && report.photos.length > 0 ? report.photos[0] : null;

              return (
                <div
                  key={report._id}
                  onClick={() => openReportModal(report)}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-amber-200 hover:border-amber-600 transition-all duration-300 cursor-pointer group"
                >
                  {/* Status Tag */}
                  <div className="text-center py-2 font-bold text-sm bg-amber-600 text-white">
                    {report.status?.toUpperCase().replace("-", " ") || "REPORTED"}
                  </div>

                  {/* Image */}
                  <div className="relative h-52 bg-gray-100">
                    {firstPhoto ? (
                      <img
                        src={`${SERVERURL}/uploadImages/${firstPhoto}`}
                        alt="Stray animal"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaPaw className="text-5xl text-gray-300" />
                      </div>
                    )}

                    {/* Photos Count */}
                    {report.photos && report.photos.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        +{report.photos.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lg text-gray-800 truncate">
                      {report.animaltype || "Stray Animal"}
                    </h3>
                    <p className="text-amber-600 text-sm truncate">{report.location}</p>
                    {getStatusBadge(report.status || "awaiting")}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Compact & Caring Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReport(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-8 border-amber-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 bg-red-700 hover:bg-red-800 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg z-10"
            >
              <FaTimes />
            </button>

            {/* Image Carousel */}
            {selectedReport.photos && selectedReport.photos.length > 0 ? (
              <div className="relative">
                <div className="overflow-hidden rounded-t-3xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {selectedReport.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={`${SERVERURL}/uploadImages/${photo}`}
                        alt={`Stray animal - ${index + 1}`}
                        className="w-full h-72 object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>

                {selectedReport.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === 0 ? selectedReport.photos.length - 1 : prev - 1);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(prev => prev === selectedReport.photos.length - 1 ? 0 : prev + 1);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedReport.photos.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white w-8" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-72 bg-amber-100 flex items-center justify-center rounded-t-3xl">
                <FaPaw className="text-7xl text-amber-300 opacity-50" />
              </div>
            )}

            {/* Report Details */}
            <div className="p-6 text-center">
              <div className="bg-amber-600 text-white py-3 rounded-2xl font-bold text-xl mb-6">
                STRAY ANIMAL REPORT
              </div>

              <h2 className="text-4xl font-bold text-gray-800 mb-2">{selectedReport.animaltype}</h2>
              {selectedReport.condition && (
                <p className="text-xl text-amber-700 font-semibold mb-4">
                  Condition: {selectedReport.condition}
                </p>
              )}

              <div className="grid grid-cols-2 gap-6 py-6 border-y-2 border-amber-200">
                <div>
                  <FaMapMarkerAlt className="text-3xl text-red-600 mx-auto mb-2" />
                  <p className="font-bold text-lg">{selectedReport.location}</p>
                </div>
                <div>
                  {getStatusBadge(selectedReport.status || "awaiting")}
                </div>
              </div>

              <div className="my-8 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-700 bg-amber-50 p-5 rounded-2xl leading-relaxed">
                  {selectedReport.bio || "No description provided."}
                </p>
              </div>

              {selectedReport.contactno && (
                <div className="mt-8 space-y-4">
                  {/* Call Button */}
                  <a
                    href={`tel:${selectedReport.contactno}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaPhoneAlt className="text-3xl" />
                    CALL REPORTER
                  </a>

                  {/* WhatsApp Button */}
                  <a
                    href={`https://wa.me/${selectedReport.contactno.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi! I saw your stray animal report in ${selectedReport.location}. How can I help?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-2xl py-6 rounded-2xl shadow-2xl flex items-center justify-center gap-4 transition transform hover:scale-105"
                  >
                    <FaWhatsapp className="text-3xl" />
                    MESSAGE ON WHATSAPP
                  </a>

                  <p className="text-center text-gray-600 mt-4 font-medium text-lg">
                    {selectedReport.contactno}
                  </p>
                </div>
              )}

              <p className="text-center text-amber-700 font-bold text-lg mt-10">
                Every report helps save a life ❤️ Thank you!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Compassionate CTA */}
      {/* <section className="bg-gradient-to-b from-amber-100 to-orange-50 py-16 text-center">
        <div className="container mx-auto px-6">
          <FaPaw className="text-8xl text-amber-600 mx-auto mb-6" />
          <h2 className="text-5xl font-bold text-gray-800 mb-6">See a Stray in Need?</h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            Your report can connect them with food, medical care, or a loving home.
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-2xl px-16 py-6 rounded-3xl shadow-2xl hover:shadow-amber-600/50 transform hover:scale-110 transition-all">
            Report a Stray Now
          </button>
        </div>
      </section> */}

      <Footer />
    </>
  );
}

export default StrayList;