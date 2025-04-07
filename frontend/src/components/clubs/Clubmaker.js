import React, { useState } from 'react';

const ClubMakerPage = () => {
  const [clubData, setClubData] = useState({
    clubName: '',
    location: '',
    description: '',
    clubLogo: null,
    images: [],
    boardMembers: [],
    headCoach: { name: '', age: '', email: '', qualifications: '', sportHistory: '' },
    facilities: '',
    events: [],
    clubHistory: '',
    registrationFee: ''
  });

  const handleClubLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setClubData({ ...clubData, clubLogo: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold bg-yellow-300 p-2">Make Your Portfolio</h1>
      
      {/* Club Logo */}
      <div className="flex flex-col items-center my-4">
        <label htmlFor="clubLogoInput" className="cursor-pointer">
          <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center relative overflow-hidden">
            {clubData.clubLogo ? (
              <img src={clubData.clubLogo} alt="Club Logo" className="w-full h-full object-cover" />
            ) : (
              <>📷</>
            )}
          </div>
        </label>
        <input id="clubLogoInput" type="file" className="hidden" onChange={handleClubLogoChange} />
      </div>
      
      {/* Club Details */}
      <input type="text" placeholder="Club Name" className="w-full p-2 bg-yellow-200" />
      <select className="w-full p-2 bg-yellow-200 mt-2">
        <option>Location</option>
      </select>
      <textarea placeholder="Description" className="w-full p-2 bg-yellow-200 mt-2" rows="4"></textarea>
      
      {/* Images and Videos */}
      <h2 className="mt-4 font-bold">Images and Videos</h2>
      <input type="file" className="w-full p-2 bg-yellow-200 mt-2" />
      <button className="bg-yellow-300 p-2 mt-2">Add New</button>
      
      {/* Top Board Members */}
      <h2 className="mt-4 font-bold">Top Board Members</h2>
      <button className="bg-yellow-300 p-2">Add New</button>
      <div className="flex mt-2">
        <input type="file" className="bg-yellow-200 p-2" />
        <input type="text" placeholder="Member Name" className="p-2 bg-yellow-200 ml-2" />
        <input type="text" placeholder="Member's Position" className="p-2 bg-yellow-200 ml-2" />
      </div>
      
      {/* Head Coach Details */}
      <h2 className="mt-4 font-bold">Head Coach Details</h2>
      <div className="bg-yellow-200 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mr-4">
            📷
          </div>
          <div className="w-full">
            <input type="text" placeholder="Name" className="p-2 bg-white w-full mb-2" />
            <input type="text" placeholder="Age" className="p-2 bg-white w-full mb-2" />
            <input type="text" placeholder="Email" className="p-2 bg-white w-full mb-2" />
            <input type="text" placeholder="Qualifications" className="p-2 bg-white w-full mb-2" />
            <input type="text" placeholder="Sport History" className="p-2 bg-white w-full mb-2" />
          </div>
        </div>
      </div>
      
      {/* Facilities */}
      <h2 className="mt-4 font-bold">Facilities</h2>
      <textarea placeholder="List the club facilities here..." className="w-full p-2 bg-yellow-200" rows="4"></textarea>
      
      {/* Events */}
      <h2 className="mt-4 font-bold">Events</h2>
      <div className="flex items-center">
        <button className="bg-yellow-300 p-2">Add Image</button>
        <textarea placeholder="Event Description" className="w-full p-2 bg-yellow-200 ml-2" rows="2"></textarea>
      </div>
      
      {/* Club History */}
      <h2 className="mt-4 font-bold">Club History</h2>
      <textarea placeholder="Enter club history here..." className="w-full p-2 bg-yellow-200" rows="4"></textarea>
      
      {/* Registration Fee */}
      <h2 className="mt-4 font-bold">Registration Fee</h2>
      <input type="text" placeholder="Enter fee amount" className="w-full p-2 bg-yellow-200" />
      
      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-yellow-400 p-3 font-bold">SUBMIT</button>
      </div>
    </div>
  );
};

export default ClubMakerPage;