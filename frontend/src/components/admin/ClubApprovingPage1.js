import React from "react"; 
import Navbar from "../sportPeople/Navbar";
import Footer from "../sportPeople/Footer";

// Define the sports categories array
const sportsCategories = [
  { name: "Cricket", img: "/Cricket.png" },
  { name: "Badminton", img: "/Badminton.jpg" },
  { name: "Volleyball", img: "/Vollyball.jpg" },
  { name: "Basket Ball", img: "/basketball.jpeg" },
  { name: "Table Tennis", img: "/tabletennis.jpg" },
  { name: "Tennis", img: "/Tennis.jpg" },
  { name: "Football", img: "/football.jpg" },
  { name: "Chess", img: "/chess.jpg" },
  { name: "Netball", img: "/netball.jpg" },
  { name: "Swimming", img: "/1.jpg" },
];

const ClubApprovingPage1 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full mb-8 aspect-w-16 aspect-h-9">
        <img
          src="/Site Banner.jpg" // Replace with the actual image path
          alt="Sports Banner"
          className="w-full h-85 object-cover"
        />
      </div>

      {/* Sports Categories */}
      <div className="relative w-full pb-8">
      <div className="bg-[#0D1271] text-white py-12">
        <h2 className="text-center text-2xl font-bold mb-8">Sports Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto px-4">
          {sportsCategories.map((sport, index) => (
            <div key={index} className="text-center transition-transform duration-300 hover:scale-110 cursor-pointer">
              <img
                src={sport.img}
                alt={sport.name}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white"
              />
              <p className="mt-2 font-semibold">{sport.name}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClubApprovingPage1;
