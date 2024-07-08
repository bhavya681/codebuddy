import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  const getFromFav = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getFromFav`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = await res.data;
      setFriends(data);
    } catch (error) {
      toast.error("Failed to load friends. Please try again.");
    }
  };

  useEffect(() => {
    getFromFav();
  }, []);

  return (
    <div className="container mx-auto p-4 h-[80vh] overflow-y-scroll scroll-smooth">
        <h1 className="my-3 text-3xl font-semibold text-white text-center items-center">Liked Friends List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {friends.map((friend) => (
          <div
            key={friend._id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={friend.profile}
              alt={friend.name}
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h1 className="text-lg font-semibold">{friend.name}</h1>
            <h2 className="text-sm text-gray-500">{friend.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
