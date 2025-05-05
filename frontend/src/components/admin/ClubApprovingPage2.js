import React from "react";
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
    sport: "Volly ball",
    name: "Smash Squad",
    owner: "Kawishka Igalagama",
    image: "Vollyball.jpg",
  },
  {
    sport: "Basket Ball",
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
    owner: "Thamindu Samarasinghe",
    image: "chess.jpg",
  },
  {
    sport: "NetBall",
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
    <div className="min-h-screen bg-white px-4 py-6 md:px-12 lg:px-32">
      <h1 className="text-center text-3xl font-bold mb-10 text-[#0D1271]">
        Club Approvals
      </h1>

      {clubs.map((club, index) => {
        const imagePath = `/${club.image}`;

        return (
          <div
            key={index}
            className="bg-[#0D1271] text-white rounded-md p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md"
          >
            {/* Club Info */}
            <div className="flex items-center flex-1">
              <img
                src={imagePath}
                alt={club.sport}
                className="w-14 h-14 rounded-full object-cover border-2 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/uploads/defaultProfilePic.jpg";
                }}
              />
              <div className="ml-4">
                <p className="text-sm">{club.sport}</p>
                <p className="font-bold text-lg">{club.name}</p>
                <p className="text-yellow-400 text-sm">{club.owner}</p>
              </div>
            </div>

            {/* Remarks and Icon */}
            <div className="flex flex-1 items-center gap-3">
              <input
                type="text"
                className="bg-[#e6ebf5] text-black px-4 py-2 rounded-md w-full focus:outline-none"
                placeholder="Enter Remarks"
              />
              <Download className="text-yellow-400 cursor-pointer" />
            </div>

            {/* Buttons */}
            <div className="flex flex-1 justify-end gap-2">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md w-full md:w-auto">
                Approve
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md w-full md:w-auto">
                Decline
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClubApprovingPage2;
