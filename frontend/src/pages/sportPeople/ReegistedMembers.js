import React from 'react';

const clubs = [
  {
    logo: 'https://via.placeholder.com/50',
    name: 'Eagle Sports Club',
    location: 'Colombo, Sri Lanka',
    description: 'A premier club for football and cricket enthusiasts.',
  },
  {
    logo: 'https://via.placeholder.com/50',
    name: 'Oceanic Swim Team',
    location: 'Negombo, Sri Lanka',
    description: 'Dedicated to swimmers of all ages and levels.',
  },
  {
    logo: 'https://via.placeholder.com/50',
    name: 'High Flyers',
    location: 'Kandy, Sri Lanka',
    description: 'Focused on track and field athletics with top facilities.',
  },
];

const pendingClubs = [
  {
    logo: 'https://via.placeholder.com/50',
    name: 'Mountain Bikers',
    location: 'Ella, Sri Lanka',
    description: 'A club for adventurous bikers and nature lovers.',
  },
  {
    logo: 'https://via.placeholder.com/50',
    name: 'Sky Volleyball',
    location: 'Galle, Sri Lanka',
    description: 'Upcoming volleyball club looking for new players.',
  },
];

const ClubCard = ({ club }) => (
  <div className="flex items-start bg-yellow-100 p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
    <img
      src={club.logo}
      alt="Club Logo"
      className="w-14 h-14 rounded-full border-2 border-gray-700 mr-4"
    />
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{club.name}</h3>
      <p className="text-sm text-gray-600 italic">{club.location}</p>
      <p className="text-gray-700 mt-1">{club.description}</p>
    </div>
  </div>
);

const ClubList = () => {
  return (
    <div className="p-6 md:p-12 bg-blue-50 min-h-screen font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-sm">Clubs</h2>
      <div className="space-y-4 bg-blue-100 p-4 rounded-xl mb-12">
        {clubs.map((club, index) => (
          <ClubCard key={index} club={club} />
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-sm">Pending Clubs</h2>
      <div className="space-y-4 bg-blue-100 p-4 rounded-xl">
        {pendingClubs.map((club, index) => (
          <ClubCard key={index} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubList;
