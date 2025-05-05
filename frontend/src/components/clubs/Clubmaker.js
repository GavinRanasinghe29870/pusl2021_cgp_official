import React, { useState } from 'react';
import axios from 'axios';
import { useClubAuthStore } from '../../store/useClubAuthStore';

const ClubMakerPage = () => {
  const [clubData, setClubData] = useState({
    ClubName: '',
    location: '',
    description: '',
    clubLogo: null,
    clubLogoPreview: null,
    images: [],
    boardMembers: [{ name: '', image: null, imagePreview: null }],
    headCoach: { 
      information: '', 
      image: null, 
      imagePreview: null
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

  const {club}=useClubAuthStore();

  const handleClubLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setClubData({ ...clubData, clubLogo: file, clubLogoPreview: previewUrl });
    }
  };

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files);

    if (clubData.images.length + files.length > 4) {
      alert('You can upload a maximum of 4 images.');
      return;
    }

    setClubData({ ...clubData, images: [...clubData.images, ...files] });
  };

  const handleBoardMemberChange = (index, field, value) => {
    const updatedMembers = [...clubData.boardMembers];
    updatedMembers[index][field] = value;
    setClubData({ ...clubData, boardMembers: updatedMembers });
  };

  const handleBoardMemberImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      handleBoardMemberChange(index, 'image', file);
      handleBoardMemberChange(index, 'imagePreview', previewUrl);
    }
  };

  const handleAddBoardMember = () => {
    setClubData({
      ...clubData,
      boardMembers: [...clubData.boardMembers, { name: '', image: null, imagePreview: null }]
    });
  };

  const handleRemoveBoardMember = (index) => {
    if (clubData.boardMembers.length > 1) {
      const updatedMembers = [...clubData.boardMembers];
      updatedMembers.splice(index, 1);
      setClubData({ ...clubData, boardMembers: updatedMembers });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('ClubName', clubData.clubName);
    formData.append('location', clubData.location);
    formData.append('description', clubData.description);
    formData.append('_id', club._id);
    

    if (clubData.clubLogo) {
      formData.append('logo', clubData.clubLogo);
    }

    clubData.images.forEach((image) => {
      formData.append('photos', image);
    });

    clubData.boardMembers.forEach((member, index) => {
      if (member.image) {
        formData.append(`boardMemberImages`, member.image);
      }
    });

    if (clubData.headCoach.image) {
      formData.append('headCoachImage', clubData.headCoach.image);
    }

    formData.append('boardMembers', JSON.stringify(clubData.boardMembers.map((member) => ({
      name: member.name
    }))));
    formData.append('headCoach', JSON.stringify({ information: clubData.headCoach.information }));
    formData.append('facilities', clubData.facilities);
    formData.append('events', JSON.stringify(clubData.events));
    formData.append('matchHistory', clubData.clubHistory);
    formData.append('registrationFee', clubData.registrationFee);

    try {
      const response = await axios.post('http://localhost:5000/api/club/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Club user created successfully:', response.data);
      const clubId = response.data.id; // Use the returned ID
      window.location.href = `/clubportfolio/${clubId}`; // Redirect to ClubPortfolio page
    } catch (error) {
      console.error('Error creating club user:', error);
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto bg-blue-100 p-6 rounded-lg shadow-md">
      <h1>{club._id}</h1>
      <h1 className="text-xl font-bold bg-yellow-300 p-2">Create Your Club</h1>

      {/* Club Logo */}
      <div className="flex flex-col items-center my-4">
        <label htmlFor="clubLogoInput" className="cursor-pointer">
          <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center relative overflow-hidden">
            {clubData.clubLogoPreview ? (
              <img
                src={clubData.clubLogoPreview}
                alt="Club Logo"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
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
        className="w-full p-2 bg-yellow-200 mt-2" 
        value={clubData.clubName}
        onChange={handleInputChange}
      />
      <input 
        type="text" 
        name="location"
        placeholder="Location" 
        className="w-full p-2 bg-yellow-200 mt-2" 
        value={clubData.location}
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

      {/* Club Images */}
      <h2 className="mt-4 font-bold">Club Images</h2>
      <input
        type="file"
        multiple
        className="w-full p-2 bg-yellow-200 mt-2"
        onChange={handleImagesChange}
      />
      <div className="grid grid-cols-2 gap-2 mt-2">
        {clubData.images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt={`Club Image ${index}`}
              className="w-full h-32 object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Board Members */}
      <h2 className="mt-4 font-bold">Board Members</h2>
      {clubData.boardMembers.map((member, index) => (
        <div key={index} className="flex items-center mt-2">
          <label htmlFor={`boardMemberPhoto-${index}`} className="cursor-pointer">
            <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center relative overflow-hidden">
              {member.imagePreview ? (
                <img
                  src={member.imagePreview}
                  alt={`Board Member ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>📷</>
              )}
            </div>
          </label>
          <input
            id={`boardMemberPhoto-${index}`}
            type="file"
            className="hidden"
            onChange={(e) => handleBoardMemberImageChange(index, e)}
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
      <h2 className="mt-4 font-bold">Head Coach</h2>
      <div className="flex items-center mt-2">
        {/* Head Coach Image */}
        <label htmlFor="headCoachPhotoInput" className="cursor-pointer">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center relative overflow-hidden">
            {clubData.headCoach.imagePreview ? (
              <img
                src={clubData.headCoach.imagePreview}
                alt="Head Coach"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>📷</>
            )}
          </div>
        </label>
        <input
          id="headCoachPhotoInput"
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setClubData({
                ...clubData,
                headCoach: { ...clubData.headCoach, image: file, imagePreview: previewUrl }
              });
            }
          }}
        />
      </div>

      {/* Head Coach Information */}
      <textarea
        placeholder="Enter head coach information here..."
        className="w-full p-2 bg-yellow-200 mt-2"
        rows="4"
        value={clubData.headCoach.information}
        onChange={(e) =>
          setClubData({
            ...clubData,
            headCoach: { ...clubData.headCoach, information: e.target.value }
          })
        }
      />

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
            onChange={(e) => {
              const updatedEvents = [...clubData.events];
              updatedEvents[index] = e.target.value;
              setClubData({ ...clubData, events: updatedEvents });
            }}
          />
          {clubData.events.length > 1 && (
            <button
              className="bg-red-500 text-white p-2 ml-2"
              onClick={() => {
                const updatedEvents = [...clubData.events];
                updatedEvents.splice(index, 1);
                setClubData({ ...clubData, events: updatedEvents });
              }}
            >
              Remove
            </button>
          )}
          {index === clubData.events.length - 1 && (
            <button
              className="bg-green-500 text-white p-2 ml-2"
              onClick={() => setClubData({ ...clubData, events: [...clubData.events, ''] })}
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

      {/* Registration Fee */}
      <h2 className="mt-4 font-bold">Registration Fee</h2>
      <input 
        type="text" 
        name="registrationFee"
        placeholder="Enter registration fee..." 
        className="w-full p-2 bg-yellow-200" 
        value={clubData.registrationFee}
        onChange={handleInputChange}
      />

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-yellow-400 hover:bg-yellow-500 p-3 font-bold rounded transition-colors"
          onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default ClubMakerPage;