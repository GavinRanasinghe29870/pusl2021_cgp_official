import React from "react";
import { Download } from "lucide-react";

const clubs = [
  { sport: "Cricket", name: "Six Streakers", owner: "Dulith Rajapaksha", image: "Cricket.png" },
  { sport: "Badminton", name: "Ace Racquets", owner: "Vihanga Dewindi", image: "Badminton.jpg" },
  { sport: "Volleyball", name: "Smash Squad", owner: "Kavishka Ihalagama", image: "Vollyball.jpg" },
  { sport: "Basketball", name: "Fast Breakers", owner: "Joshua Jacob", image: "basketball.jpeg" },
  { sport: "Table Tennis", name: "Ping Pong", owner: "Thisuri Gamage", image: "tabletennis.jpg"},
  { sport: "Tennis", name: "Spin Squad", owner: "Agasthi Imashi", image: "Tennis.jpg" },
  { sport: "Football", name: "United FC", owner: "Udula Dissanayaka", image: "football.jpg" },
  { sport: "Chess", name: "Royal Rooks", owner: "Thamindu", image: "chess.jpg" },
  { sport: "Netball", name: "Court Queens", owner: "Alice Watson", image: "netball.jpg" },
  { sport: "Swimming", name: "Splash Kings", owner: "Gavin Ranasinghe", image: "1.jpg" },
];

const ClubApprovingPage2 = () => {
    
  return (
    <div className="min-h-screen flex flex-col">
       
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Club Approvals</h2>
        
        {clubs.map((club, index) => {
          // ✅ Ensure the correct image path
          const imagePath = `/uploads/${club.image}`;

          console.log("Image path:", imagePath); // Debugging output

          return(

            <div key={index} className="bg-[#0D1271] text-white rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                {/* ✅ Fix the image path syntax */}
                <img
  src={`/uploads/${club.image}`} // ✅ Correct path
  alt={club.sport}
  className="w-12 h-12 rounded-full"
  onError={(e) => {
    console.error(`Image failed to load: /uploads/${club.image}`);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "/uploads/default.jpg"; // Fallback image
  }}
/>

              <div className="ml-4">
                <p className="text-lg font-bold">{club.sport}</p>
                <p className="text-sm">{club.name}</p>
                <p className="text-xs text-gray-300">{club.owner}</p>
              </div>
              </div>
           

            <input
              type="text"
              className="bg-gray-200 text-black p-2 rounded-md w-1/4"
              placeholder="Enter remarks"
            />

            <Download className="text-yellow-400 cursor-pointer mx-4" />

            <div>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-md mr-2 hover:bg-yellow-500">Approve</button>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500">Decline</button>
            </div>
            </div>
          );
        })}
        </div>
        </div>

       
   
  );
};

export default ClubApprovingPage2;
