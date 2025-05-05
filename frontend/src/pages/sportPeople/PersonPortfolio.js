import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FaLocationDot } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const PersonPortfolio = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sportPeople/${personId}`);
        setPerson(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching person data", error);
        setLoading(false);
      }
    };
    fetchPerson();
  }, [personId]);

  if (loading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  if (!person) {
    return <div className="text-center py-20 text-red-500">User not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img src="/Cover.jpg" alt="Cover" className="w-full h-96 object-cover" />
          <div className="absolute bottom-0 left-6 flex items-center gap-6">
            <img
              src={`http://localhost:5000${person.image}`}
              alt={person.name}
              className="w-40 h-40 rounded-full border-4 border-white -mb-16 object-cover"
            />
          </div>
        </div>

        <div className="p-10 pt-20">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {person.name} <MdEdit />
          </h1>
          <p className="text-gray-600 flex items-center gap-2 text-lg">
            <FaLocationDot /> {person.location || "N/A"} <MdEdit />
          </p>
          <p className="text-gray-600 text-lg flex items-center gap-2">
            {person.sports || "No sports info"} <MdEdit />
          </p>
        </div>

        {/* About */}
        <div className="bg-primary-light p-6 mb-6 rounded-lg text-lg">
          <h2 className="bg-secondary-light px-4 py-2 inline-block font-bold text-xl">About</h2>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Name:</strong> {person.name}</p>
            <p><strong>Email:</strong> {person.email || "N/A"}</p>
            <p><strong>Location:</strong> {person.location || "N/A"}</p>
            <p><strong>Contact No:</strong> {person.contact || "N/A"}</p>
            <p><strong>Birthday:</strong> {person.birthday || "N/A"}</p>
            <p><strong>Job:</strong> {person.job || "N/A"}</p>
          </div>
          <button className="bg-gray-700 text-white px-6 py-3 rounded mt-4 flex items-center text-lg gap-2"><MdEdit /> Edit</button>
        </div>

        {/* Sports Info */}
        <div className="bg-primary-light p-6 mb-6 rounded-lg text-lg">
          <h2 className="bg-secondary-light px-4 py-2 inline-block font-bold text-xl">Sports Interests and Skills</h2>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Favorite Sports:</strong> {person.sports || "N/A"}</p>
            <p><strong>Skill Level:</strong> {person.skillLevel || "N/A"}</p>
            <p><strong>Preferred Positions/Disciplines:</strong> {person.position || "N/A"}</p>
          </div>
          <h3 className="bg-secondary-light px-4 py-2 inline-block font-bold text-xl mt-4">Sports History</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Training Background:</strong> {person.training || "N/A"}</p>
            <p><strong>Clubs and Teams:</strong> {person.clubs || "N/A"}</p>
            <p><strong>Years Playing:</strong> {person.years || "N/A"}</p>
          </div>
          <button className="bg-gray-700 text-white px-6 py-3 rounded mt-4 flex items-center text-lg gap-2"><MdEdit /> Edit</button>
        </div>

        {/* Achievements */}
        <div className="bg-primary-light p-6 mb-6 rounded-lg text-lg">
          <h2 className="bg-secondary-light px-4 py-2 inline-block font-bold text-xl">Personal Achievements</h2>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Personal Records:</strong> {person.records || "N/A"}</p>
            <p><strong>Recent Highlights:</strong> {person.highlights || "N/A"}</p>
          </div>
          <h3 className="bg-secondary-light px-4 py-2 inline-block font-bold text-xl mt-4">Goals and Motivations</h3>
          <div className="grid grid-cols-2 gap-6 mt-4">
            <p><strong>Short-Term Goals:</strong> {person.goals || "N/A"}</p>
            <p><strong>Long-Term Aspirations:</strong> {person.aspirations || "N/A"}</p>
          </div>
          <button className="bg-gray-700 text-white px-6 py-3 rounded mt-4 flex items-center text-lg gap-2"><MdEdit /> Edit</button>
        </div>

        {/* Media */}
        <div className="flex items-center justify-between mb-6">
          <span className="bg-secondary-light px-6 py-3 font-semibold text-lg flex items-center gap-2"><FaPlus /> Add Photos / Videos</span>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5].map((num) => (
            <img key={num} src={`/${num}.jpg`} alt={`${num}`} className="rounded-lg shadow-lg w-full h-64 object-cover" />
          ))}
          <div className="flex items-center justify-center bg-gray-300 rounded-lg shadow-lg cursor-pointer w-full h-64">
            <span className="text-4xl">+</span>
          </div>
        </div>

        {/* New Post */}
        <div className="bg-primary-light p-6 border-2 border-blue-400 rounded-lg mt-6 text-lg mb-9">
          <button className="bg-secondary-light px-6 py-3 font-semibold flex items-center space-x-3 rounded">
            <span className="text-2xl"><FaPlus /></span>
            <span>New Posts</span>
          </button>

          <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <img src={`http://localhost:5000${person.image}`} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-sm text-gray-500">5,938 Followers</p>
              </div>
              <span className="ml-auto text-2xl">...</span>
            </div>

            <p className="mt-4 text-gray-700 flex items-center gap-2">Post Description <FaPlus /></p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-300 h-50 rounded"></div>
              <div className="grid grid-rows-2 gap-4">
                <div className="bg-gray-300 h-20 rounded"></div>
                <div className="bg-gray-300 h-20 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-2xl"><FaPlus /></span>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-3 flex justify-around text-gray-600 text-lg">
              <button className="flex items-center space-x-2"><AiFillLike className="text-3xl" /></button>
              <button className="flex items-center space-x-2"><FaComment className="text-3xl" /></button>
              <button className="flex items-center space-x-2"><BiRepost className="text-3xl" /></button>
              <button className="flex items-center space-x-2"><IoIosSend className="text-3xl" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPortfolio;
