import React from "react";

const DonorPortfolio = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-custom-900 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-primary text-white p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
          <div>
            <h1 className="text-header-02 font-header">Ashnika Premarathna</h1>
            <p className="text-body font-body flex items-center gap-2">
              📍 Rideekotaliya, Mahiyanganaya
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 bg-secondary-light text-body font-body">
          <p>
            I am a young, aspiring cricketer with a passion for the game. I am
            seeking donations of cricket equipment, such as a cricket bat, ball,
            helmet, or other essential gear, to help me improve my skills and
            pursue my dreams. Your generous contribution will not only provide
            me with the necessary tools but also inspire me to work harder and
            strive for excellence. Thank you for your support!
          </p>
        </div>

        {/* Contact Button */}
        <div className="p-4 flex justify-end">
          <button className="bg-secondary hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorPortfolio;
