import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const MyFriends = () => {
  const { user } = useAuthStore();
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/myfrnd/myfriends/${user._id}`
        );
        setFriends(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (user?._id) fetchFriends();
  }, [user]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/myfrnd/remove/${user._id}/${friendId}`
      );
      setFriends((prev) => prev.filter((f) => f._id !== friendId));
    } catch (error) {
      console.error("Failed to remove friend:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#0D1271]">My Friends</h2>

      {friends.length === 0 ? (
        <p className="text-center text-gray-600">You have no friends added yet.</p>
      ) : (
        <div className="space-y-4 max-w-4xl mx-auto">
          {friends.map((friend) => (
            <div
              key={friend._id}
              onClick={() => navigate(`/profile/${friend._id}`)}
              className="bg-[#2E3C90] text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full">
                {/* Left: Avatar */}
                <div className="mr-4 flex-shrink-0 mb-4 md:mb-0">
                  <img
                    src={
                      friend.profilePhoto
                        ? `http://localhost:5000/uploads/${friend.profilePhoto}`
                        : "/default-avatar.png"
                    }
                    alt={friend.firstName}
                    className="w-16 h-16 rounded-full border-2 border-white object-cover"
                  />
                </div>
                {/* Right: Info */}
                <div className="flex-grow flex flex-col justify-center  md:mr-4">
                  <p>
                    <span className="font-bold">Name:</span> {friend.firstName} {friend.lastName}
                  </p>
                  <p>
                    <span className="font-bold">Username:</span> @{friend.username}
                  </p>
                  <p>
                    <span className="font-bold">Age:</span> {friend.age}
                  </p>
                  {friend.sportcategory && (
                    <p>
                      <span className="font-bold">Sport Category:</span> {friend.sportcategory}
                    </p>
                  )}
                  <p className="mt-2">
                    <span className="font-bold">Status:</span>{" "}
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                      Friend
                    </span>
                  </p>
                </div>

                {/* Remove Button */}
                <div className="flex justify-end mt-4 md:mt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFriend(friend._id);
                    }}
                    className="bg-red-600 text-white px-4 py-1 rounded-md text-sm transition duration-300 hover:bg-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFriends;

