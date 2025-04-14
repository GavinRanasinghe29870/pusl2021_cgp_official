import React from "react";
import "react-multi-carousel/lib/styles.css";

const ClubList = ({ title, clubs }) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{title}</h2>
      <ul className="list-none space-y-4">
        {clubs.map((club, index) => (
          <li
            key={index}
            className="p-6 bg-yellow-300 border border-gray-300 rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 ease-in-out"
          >
            {club}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubList;
