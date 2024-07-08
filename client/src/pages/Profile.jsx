import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { IoHeartSharp, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const Profile = () => {

  const { user } = useContext(AppContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState([]);

  const getUser = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getUsers`);

      const data = await res.data.data;

      const filteredUsers = data.filter(
        (u) =>
          u._id !== user?._id &&
          !user.disliked.includes(u._id) &&
          !user.favourites.includes(u._id)
      );

      setProfiles(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };


  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const addToFav = async (id) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/addToFav/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.data;
    if (data.success === true) {
      toast.success(data.message);
      nextProfile();
    } else {
      toast.error(data.message);
    }
  };

  const addToDis = async (id) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/addToDis/${id}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.data;
    if (data.success === true) {
      nextProfile();
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return (
    <>
       <div className="flex justify-center items-center my-10 sm:my-32">
        <div className="rounded-lg shadow-primaryLight shadow-sm w-[75vw] h-[80vw] sm:w-[25vw] sm:h-[60vh] overflow-hidden relative">
       
              <img
                src={profiles[currentIndex]?.profile}
                alt={profiles[currentIndex]?.name}
                key={profiles[currentIndex]?._id}
                className="rounded-lg object-cover-full w-full h-full transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              />
              <div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h1 className="text-white text-2xl font-semibold">
                    {profiles[currentIndex]?.name}
                  </h1>
                  <p className="text-white ">{profiles[currentIndex]?.email}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div className="bg-gray-800 rounded-full overflow-hidden hover:bg-red-500 p-2 transition-all duration-300 ease-in-out cursor-pointer">
                      <IoClose
                        onClick={() => {
                          addToDis(profiles[currentIndex]?._id);
                        }}
                        className="hover:text-white text-red-500 text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
                      />
                    </div>
                    <div className="bg-gray-800 rounded-full overflow-hidden hover:bg-green-500 p-2 transition-all duration-300 ease-in-out cursor-pointer">
                      <IoHeartSharp
                        onClick={() => {
                          addToFav(profiles[currentIndex]?._id);
                        }}
                        className="hover:text-white text-green-500 text-3xl hover:scale-125 transition-all duration-300 ease-in-out cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
           
        </div>
      </div>
    </>
  );
};

export default Profile;
