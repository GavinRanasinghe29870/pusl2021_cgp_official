import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const ClubPortfolio = () => {
  const { id } = useParams(); // Get the club ID from the URL
  const [clubData, setClubData] = useState(null);

  // Fetch club data by ID
  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/club/clubs/${id}`);
        console.log('Fetched Club Data:', response.data);
        setClubData(response.data);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, [id]);

  if (!clubData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{clubData.clubName}</h1>

      {/* Club Logo */}
      <div className="flex justify-center mb-4">
        {clubData.logo && (
          <img
            src={`http://localhost:5000${clubData.logo}`}
            alt="Club Logo"
            className="w-32 h-32 object-cover rounded-full"
          />
        )}
      </div>

      {/* Club Details */}
      <p><strong>Location:</strong> {clubData.location}</p>
      <p><strong>Description:</strong> {clubData.description}</p>

      {/* Photo Gallery */}
      <h2 className="mt-4 font-bold">Photo Gallery</h2>
      <div className="grid grid-cols-2 gap-2">
        {clubData.photos.map((photo, index) => (
          <img
            key={index}
            src={`http://localhost:5000${photo}`}
            alt={`Club Photo ${index + 1}`}
            className="w-full h-32 object-cover rounded"
          />
        ))}
      </div>

      {/* Board Members */}
      <h2 className="mt-4 font-bold">Top Board Members</h2>
      <div className="grid grid-cols-2 gap-4">
        {clubData.boardMembers.map((member, index) => (
          <div key={index} className="flex items-center">
            {member.image && (
              <img
                src={`http://localhost:5000${member.image}`}
                alt={member.name}
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
            )}
            <p>{member.name}</p>
          </div>
        ))}
      </div>

      {/* Head Coach */}
      <h2 className="mt-4 font-bold">Head Coach</h2>
      <div className="flex items-center">
        {clubData.headCoach.image && (
          <img
            src={`http://localhost:5000${clubData.headCoach.image}`}
            alt="Head Coach"
            className="w-16 h-16 object-cover rounded-full mr-4"
          />
        )}
        <p>{clubData.headCoach.information}</p>
      </div>

      {/* Facilities */}
      <h2 className="mt-4 font-bold">Facilities</h2>
      <p>{clubData.facilities}</p>

      {/* Events */}
      <h2 className="mt-4 font-bold">Events</h2>
      <ul>
        {clubData.events.map((event, index) => (
          <li key={index}>✅ {event}</li>
        ))}
      </ul>

      {/* Match History */}
      <h2 className="mt-4 font-bold">Match History</h2>
      <p>{clubData.matchHistory}</p>

      {/* Membership Fees */}
      <h2 className="mt-4 font-bold">Membership Fees</h2>
      <p>Membership Fee: <strong>{clubData.registrationFee}</strong></p>
    </div>
  );
};

export default ClubPortfolio;
