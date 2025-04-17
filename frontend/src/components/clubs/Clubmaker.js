import React, { useState } from 'react';

const ClubMakerPage = () => {
  const [clubData, setClubData] = useState({
    clubName: '',
    location: '',
    description: '',
    clubLogo: null,
    images: [],
    boardMembers: [{ name: '', image: null }], // Initialize with one empty member
    headCoach: { 
      name: '', 
      age: '', 
      email: '', 
      qualifications: '', 
      sportHistory: '',
      image: null 
    },
    facilities: '',
    events: [''],
    clubHistory: '',
    registrationFee: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  const handleClubLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setClubData({ ...clubData, clubLogo: URL.createObjectURL(file) });
    }
  };

  const handleBoardMemberChange = (index, field, value) => {
    const updatedMembers = [...clubData.boardMembers];
    updatedMembers[index][field] = value;
    setClubData({ ...clubData, boardMembers: updatedMembers });
  };

  const handleAddBoardMember = () => {
    setClubData({
      ...clubData,
      boardMembers: [...clubData.boardMembers, { name: '', image: null }]
    });
  };

  const handleRemoveBoardMember = (index) => {
    if (clubData.boardMembers.length > 1) {
      const updatedMembers = [...clubData.boardMembers];
      updatedMembers.splice(index, 1);
      setClubData({ ...clubData, boardMembers: updatedMembers });
    }
  };

  const handleHeadCoachChange = (field, value) => {
    setClubData({
      ...clubData,
      headCoach: { ...clubData.headCoach, [field]: value }
    });
  };

  const handleHeadCoachImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setClubData({
        ...clubData,
        headCoach: { ...clubData.headCoach, image: URL.createObjectURL(file) }
      });
    }
  };

  const handleAddEvent = () => {
    setClubData({ ...clubData, events: [...clubData.events, ''] });
  };

  const handleEventChange = (index, value) => {
    const updatedEvents = [...clubData.events];
    updatedEvents[index] = value;
    setClubData({ ...clubData, events: updatedEvents });
  };

  const handleRemoveEvent = (index) => {
    if (clubData.events.length > 1) {
      const updatedEvents = [...clubData.events];
      updatedEvents.splice(index, 1);
      setClubData({ ...clubData, events: updatedEvents });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
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
      <input 
        type="text" 
        name="clubName"
        placeholder="Club Name" 
        className="w-full p-2 bg-yellow-200" 
        value={clubData.clubName}
        onChange={handleInputChange}
      />
      <textarea 
        name="description"
        placeholder="Description" 
        className="w-full p-2 bg-yellow-200 mt-2" 
        rows="4"
        value={clubData.description}
        onChange={handleInputChange}
      ></textarea>
      
      {/* Images and Videos */}
      <h2 className="mt-4 font-bold">Images</h2>
      <input 
        type="file" 
        className="w-full p-2 bg-yellow-200 mt-2" 
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const imageUrls = files.map(file => URL.createObjectURL(file));
          setClubData({ ...clubData, images: [...clubData.images, ...imageUrls] });
        }}
        multiple
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {clubData.images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`Club Image ${index}`} className="w-full h-32 object-cover rounded" />
            <button 
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              onClick={() => {
                const updatedImages = [...clubData.images];
                updatedImages.splice(index, 1);
                setClubData({ ...clubData, images: updatedImages });
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {/* Board Members */}
      <h2 className="mt-4 font-bold">Board Members</h2>
      {clubData.boardMembers.map((member, index) => (
        <div key={index} className="flex items-center mt-2">
          <label htmlFor={`boardMemberPhoto-${index}`} className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mr-2 cursor-pointer overflow-hidden">
            {member.image ? (
              <img src={member.image} alt={`Board Member ${index}`} className="w-full h-full object-cover" />
            ) : (
              <span>📷</span>
            )}
          </label>
          <input
            id={`boardMemberPhoto-${index}`}
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                handleBoardMemberChange(index, 'image', URL.createObjectURL(file));
              }
            }}
          />
          <input
            type="text"
            placeholder="Member Name"
            className="p-2 bg-yellow-200 flex-grow"
            value={member.name}
            onChange={(e) => handleBoardMemberChange(index, 'name', e.target.value)}
          />
          {clubData.boardMembers.length > 1 && (
            <button
              type="button"
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => handleRemoveBoardMember(index)}
            >
              Remove
            </button>
          )}
          {index === clubData.boardMembers.length - 1 && (
            <button
              type="button"
              className="bg-green-500 text-white p-2 ml-2"
              onClick={handleAddBoardMember}
            >
              Add
            </button>
          )}
        </div>
      ))}
      
      {/* Head Coach */}
      <h2 className="mt-4 font-bold">Head Coach Details</h2>
      <div className="bg-yellow-200 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row items-start">
          <label htmlFor="headCoachPhotoInput" className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mr-4 cursor-pointer overflow-hidden mb-4 md:mb-0">
            {clubData.headCoach.image ? (
              <img src={clubData.headCoach.image} alt="Head Coach" className="w-full h-full object-cover" />
            ) : (
              <span>📷</span>
            )}
          </label>
          <input
            id="headCoachPhotoInput"
            type="file"
            className="hidden"
            onChange={handleHeadCoachImageChange}
          />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 bg-white w-full"
              value={clubData.headCoach.name}
              onChange={(e) => handleHeadCoachChange('name', e.target.value)}
            />
            <input
              type="text"
              name="age"
              placeholder="Age"
              className="p-2 bg-white w-full"
              value={clubData.headCoach.age}
              onChange={(e) => handleHeadCoachChange('age', e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 bg-white w-full"
              value={clubData.headCoach.email}
              onChange={(e) => handleHeadCoachChange('email', e.target.value)}
            />
            <input
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              className="p-2 bg-white w-full"
              value={clubData.headCoach.qualifications}
              onChange={(e) => handleHeadCoachChange('qualifications', e.target.value)}
            />
            <textarea
              name="sportHistory"
              placeholder="Sport History"
              className="p-2 bg-white w-full md:col-span-2"
              rows="3"
              value={clubData.headCoach.sportHistory}
              onChange={(e) => handleHeadCoachChange('sportHistory', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Facilities */}
      <h2 className="mt-4 font-bold">Facilities</h2>
      <textarea 
        name="facilities"
        placeholder="List the club facilities here..." 
        className="w-full p-2 bg-yellow-200" 
        rows="4"
        value={clubData.facilities}
        onChange={handleInputChange}
      ></textarea>
      
      {/* Events */}
      <h2 className="mt-4 font-bold">Events</h2>
      {clubData.events.map((event, index) => (
        <div key={index} className="flex items-center mt-2">
          <textarea
            placeholder="Event Description"
            className="w-full p-2 bg-yellow-200"
            rows="2"
            value={event}
            onChange={(e) => handleEventChange(index, e.target.value)}
          />
          {clubData.events.length > 1 && (
            <button
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => handleRemoveEvent(index)}
            >
              Remove
            </button>
          )}
          {index === clubData.events.length - 1 && (
            <button
              className="bg-green-500 text-white p-2 ml-2"
              onClick={handleAddEvent}
            >
              Add
            </button>
          )}
        </div>
      ))}
      
      {/* Club History */}
      <h2 className="mt-4 font-bold">Club History</h2>
      <textarea 
        name="clubHistory"
        placeholder="Enter club history here..." 
        className="w-full p-2 bg-yellow-200" 
        rows="4"
        value={clubData.clubHistory}
        onChange={handleInputChange}
      ></textarea>
      
      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-yellow-400 hover:bg-yellow-500 p-3 font-bold rounded transition-colors">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default ClubMakerPage;