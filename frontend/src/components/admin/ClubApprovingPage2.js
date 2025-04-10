import React from "react";
// import Navbar from "../sportPeople/Navbar";
import { Download } from "lucide-react";

const clubs = [
  {
    sport: "Cricket",
    name: "Six Streakers",
    owner: "Dulith Rajapaksha",
    image: "Cricket.png",
  },
  {
    sport: "Badminton",
    name: "Ace Racquets",
    owner: "Vihanga Dewindi",
    image: "Badminton.jpg",
  },
  {
    sport: "Volleyball",
    name: "Smash Squad",
    owner: "Kavishka Ihalagama",
    image: "Vollyball.jpg",
  },
  {
    sport: "Basketball",
    name: "Fast Breakers",
    owner: "Joshua Jacob",
    image: "basketball.jpeg",
  },
  {
    sport: "Table Tennis",
    name: "Ping Pong",
    owner: "Thisuri Gamage",
    image: "tabletennis.jpg",
  },
  {
    sport: "Tennis",
    name: "Spin Squad",
    owner: "Agasthi Imashi",
    image: "Tennis.jpg",
  },
  {
    sport: "Football",
    name: "United FC",
    owner: "Udula Dissanayaka",
    image: "football.jpg",
  },
  {
    sport: "Chess",
    name: "Royal Rooks",
    owner: "Thamindu",
    image: "chess.jpg",
  },
  {
    sport: "Netball",
    name: "Court Queens",
    owner: "Alice Watson",
    image: "netball.jpg",
  },
  {
    sport: "Swimming",
    name: "Splash Kings",
    owner: "Gavin Ranasinghe",
    image: "1.jpg",
  },
];

const ClubApprovingPage2 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* <Navbar /> */}
      <div className="bg-white shadow-lg rounded-lg p-6 m-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Club Approvals
        </h2>

        {clubs.map((club, index) => {
          const imagePath = `/${club.image}`; // ✅ No "public" prefix

          return (
            <div
              key={index}
              className="bg-[#0D1271] text-white rounded-lg p-4 mb-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-4"
            >
              <div className="flex items-center w-full md:w-1/3">
                <img
                  src={imagePath}
                  alt={club.sport}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    console.error(`Image failed to load: ${imagePath}`);
                    e.target.onerror = null;
                    e.target.src = "/uploads/defaultProfilePic.jpg"; // ✅ fallback image path
                  }}
                />
                <div className="ml-4">
                  <p className="text-lg font-bold">{club.sport}</p>
                  <p className="text-sm">{club.name}</p>
                  <p className="text-xs text-gray-300">{club.owner}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-1/3 justify-center">
                <input
                  type="text"
                  className="bg-gray-200 text-black p-2 rounded-md w-[250px] md:w-[350px]"
                  placeholder="Enter remarks"
                />
                <Download className="text-yellow-400 cursor-pointer mx-4" />
              </div>

              <div className="flex space-x-2 w-full md:w-1/3 justify-end">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">
                  Approve
                </button>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClubApprovingPage2;
