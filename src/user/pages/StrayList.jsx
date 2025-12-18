import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt, FaClock, FaPaw, FaExclamationTriangle, FaFilter,
  FaDog, FaCat, FaPhoneAlt, FaCalendarAlt, FaTimes, FaInfoCircle,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";

function StrayList() {
  const [filter, setFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  const strayReports = [
    // ... (your same data array - unchanged)
    {
      id: 1,
      type: "Injured Dog",
      animal: "Street Dog",
      condition: "Injured / Bleeding",
      location: "MG Road, Near Shenoy's Theatre, Kochi",
      time: "2 hours ago",
      status: "rescue-dispatched",
      images: 3,
      reporter: "Anonymous",
      contact: "+91 98*** ****",
      description: "Dog hit by bike. Bleeding from left hind leg. Limping badly. Seen near Shenoy's signal. Very scared but not aggressive.",
      reportedAt: "Today, 3:45 PM",
      updatedAt: "Rescue team reached spot at 5:20 PM",
      rescueTeam: "Kochi Street Paws Rescue"
    },
    // ... rest of your reports
    {
      id: 6,
      type: "Starving Cat",
      animal: "Adult Cat",
      condition: "Normal but Hungry",
      location: "Marine Drive Walkway",
      time: "Yesterday",
      status: "feeding",
      images: 3,
      reporter: "Priya M.",
      contact: "+91 8089*****",
      description: "Thin grey cat meowing loudly near walkway. Eats everything given. Very gentle. Locals feeding daily but needs permanent solution.",
      reportedAt: "Yesterday, 8:40 AM",
      updatedAt: "Regular feeding point established",
      rescueTeam: "Marine Drive Cat Lovers"
    }
  ];

  const filteredReports = filter === "all" 
    ? strayReports 
    : strayReports.filter(r => r.status === filter);

  const getStatusBadge = (status) => {
    switch (status) {
      case "rescue-dispatched":
        return <span className="bg-green-100 text-green-800 px-5 py-3 rounded-full font-bold flex items-center gap-2"><FaPaw /> Rescue Team Dispatched</span>;
      case "feeding":
        return <span className="bg-blue-100 text-blue-800 px-5 py-3 rounded-full font-bold flex items-center gap-2"><FaHeart /> Daily Feeding Active</span>;
      case "awaiting":
        return <span className="bg-yellow-100 text-yellow-800 px-5 py-3 rounded-full font-bold flex items-center gap-2"><FaClock /> Awaiting Help</span>;
      case "urgent":
        return <span className="bg-red-100 text-red-800 px-6 py-4 rounded-full font-bold text-lg animate-pulse flex items-center gap-3"><FaExclamationTriangle /> URGENT ACTION NEEDED</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">

        {/* Hero Section (you can add back if needed) */}
        {/* ... */}

        {/* Filters */}
        <div className="container mx-auto px-6 mt-24 mb-12">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-wrap items-center justify-between gap-6 border-4 border-amber-300">
            <div className="flex items-center gap-4">
              <FaFilter className="text-3xl md:text-4xl text-amber-700" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Filter Reports</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {["all", "urgent", "rescue-dispatched", "feeding", "awaiting"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-sm md:text-lg transition transform hover:scale-105 ${
                    filter === f
                      ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                >
                  {f === "all" ? "All Reports" : 
                   f === "urgent" ? "Urgent Only" :
                   f === "rescue-dispatched" ? "Rescue Sent" :
                   f === "feeding" ? "Being Fed" : "Awaiting Help"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="container mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-6 transition-all duration-500 hover:shadow-3xl ${
                  report.status === "urgent" ? "border-red-600 animate-pulse" :
                  report.status === "rescue-dispatched" ? "border-green-600" :
                  report.status === "feeding" ? "border-blue-600" : "border-amber-600"
                }`}
              >
                <div className="h-64 bg-gradient-to-br from-amber-200 to-orange-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <FaPaw className="text-8xl text-white" />
                  </div>
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full font-bold">
                    {report.images} Photos
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm">
                    {report.animal.includes("Dog") ? <FaDog /> : <FaCat />} {report.animal}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{report.type}</h3>
                  
                  <div className="space-y-4 text-gray-700 text-sm">
                    <p className="flex items-center gap-3">
                      <FaExclamationTriangle className="text-amber-700" />
                      <span className="font-medium">{report.condition}</span>
                    </p>
                    <p className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-red-600 text-lg mt-0.5" />
                      <span>{report.location}</span>
                    </p>
                    <p className="flex items-center gap-3 text-gray-600">
                      <FaCalendarAlt className="text-sm" />
                      {report.time}
                    </p>
                  </div>

                  <div className="my-6">
                    {getStatusBadge(report.status)}
                  </div>

                  <button
                    onClick={() => setSelectedReport(report)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all"
                  >
                    View Full Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED RESPONSIVE MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-3xl w-full max-w-4xl max-h-screen overflow-y-auto border-8 border-amber-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-6 md:p-8 rounded-t-3xl sticky top-0 z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold">{selectedReport.type}</h2>
                  <p className="text-lg md:text-2xl mt-2 opacity-90">{selectedReport.animal}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-3xl md:text-4xl hover:bg-white/20 rounded-full p-3 transition"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 md:p-10 space-y-8">
              {/* Photos */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FaPaw /> Photos ({selectedReport.images})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(selectedReport.images)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 border-4 border-dashed rounded-2xl flex items-center justify-center">
                      <FaPaw className="text-4xl md:text-6xl text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-600 font-semibold">Condition</p>
                    <p className="text-xl font-bold text-amber-700">{selectedReport.condition}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Location</p>
                    <p className="flex items-center gap-2 text-gray-800">
                      <FaMapMarkerAlt className="text-red-600" /> {selectedReport.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">Reported</p>
                    <p>{selectedReport.reportedAt}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-gray-600 font-semibold">Status</p>
                    <div className="mt-2">{getStatusBadge(selectedReport.status)}</div>
                  </div>
                  {selectedReport.rescueTeam && (
                    <div>
                      <p className="text-gray-600 font-semibold">Rescue Team</p>
                      <p className="text-lg font-bold text-green-700">{selectedReport.rescueTeam}</p>
                    </div>
                  )}
                  {selectedReport.contact && (
                    <div>
                      <p className="text-gray-600 font-semibold">Contact</p>
                      <p className="text-xl font-bold text-green-700 flex items-center gap-2">
                        <FaPhoneAlt /> {selectedReport.contact}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Full Description</h3>
                <p className="text-gray-700 bg-amber-50 p-5 rounded-2xl border-l-8 border-amber-600 leading-relaxed">
                  {selectedReport.description}
                </p>
              </div>

              {/* Update */}
              <div>
                <p className="text-lg font-bold text-gray-800 mb-2">Latest Update</p>
                <p className="bg-gray-100 p-4 rounded-xl text-gray-700">
                  {selectedReport.updatedAt}
                </p>
              </div>

              {/* Close Button */}
              <div className="text-center pt-4 pb-6">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-12 py-5 bg-gray-800 hover:bg-gray-900 text-white font-bold text-xl rounded-2xl shadow-xl transition transform hover:scale-105"
                >
                  Close Report
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

export default StrayList;