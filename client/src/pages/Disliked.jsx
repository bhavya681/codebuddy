import axios from "axios";
import  { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Disliked = () => {
  const [dFriends, setDFriends] = useState([]);

  const getDFriends = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getFromDis`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = await res.data;
      setDFriends(data);
    } catch (error) {
      toast.error("Failed to load disliked friends. Please try again.");
    }
  };

  useEffect(() => {
    getDFriends();
  }, []);

  return (
    <div className="container mx-auto p-4 h-[80vh] overflow-y-scroll scroll-smooth">
        <h1 className="my-3 text-3xl font-semibold text-white text-center items-center">Disliked Friends List</h1>
      <div className="grid grid-cols-1  sm:grid-cols-2 cursor-pointer md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dFriends.map((frnd) => (
          <div
            key={frnd._id}
            className="bg-gray-800 text-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={frnd.profile}
              alt={frnd.name}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-red-500"
            />
            <h1 className="text-lg font-semibold">{frnd.name}</h1>
            <h2 className="text-sm text-gray-400">{frnd.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disliked;
