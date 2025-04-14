import React from "react";
import ClubList from "../../components/clubs/ClubList";

const RegisteredClubs = () => {
  const registeredClubs = [
    "Club A",
    "Club B",
    "Club C",
    "Club D",
    "Club E",
    "Club F",
  ];

  const pendingClubs = ["Pending Club 1", "Pending Club 2", "Pending Club 3"];

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-6">
        <ClubList title="Clubs" clubs={registeredClubs} />
        <ClubList title="Pending Clubs" clubs={pendingClubs} />
      </div>
    </div>
  );
};

export default RegisteredClubs;
