import React from "react";

const ClubList = ({ title, clubs }) => {
  return (
    <div className="bg-white my-8 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div className="grid grid-cols-1 gap-4">
        {clubs.map((club, index) => (
          <div key={index} className="bg-yellow-200 py-4 px-6 rounded-lg">
            {club}
          </div>
        ))}
      </div>
    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  );
};

export default ClubList;
