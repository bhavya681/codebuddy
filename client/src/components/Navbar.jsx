import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  

  const checkAuth = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkAuth`, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    const data = await res.data;
    if (data.success === true) {
      setUser(data.data);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <div className="bg-primary flex p-5 flex-col md:flex-row items-center justify-between">
        <div className="flex gap-3">
          <img
            src={user?.profile}
            alt={user.name}
            width={40}
            height={30}
            className={`rounded-full shadow-inner ${
              user?.profile ? "block" : "hidden"
            }`}
          />
          <h2 className="font-concertOne text-3xl text-white">CodeBuddy</h2>
        </div>
        {!user?.name ? (
          <>
            <ul className="flex gap-3 text-white font-ropaSans text-2xl">
              <Link
                to="/about"
                className="hover:underline cursor-pointer transition-all duration-300 ease-in-out"
              >
                About
              </Link>
              <Link to="/download">Download</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/contact">Contact</Link>
            </ul>
          </>
        ) : (
          <>
            <ul className="flex gap-3 text-white font-ropaSans text-2xl">
              <Link
                to="/profile"
                className="hover:underline cursor-pointer transition-all duration-300 ease-in-out"
              >
                New
              </Link>
              <Link to="/profile/chats">Chats</Link>
              <Link to="/profile/friends">Friends</Link>
              <Link to="/profile/disliked">Disliked</Link>
            </ul>
          </>
        )}
        <div>
          {user?.name ? (
            <>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  toast.success("Successfully Logout");
                  navigate("/login");
                  setUser([]);
                }}
                className="font-ropaSans text-2xl text-black rounded-full bg-white hover:bg-black hover:text-white px-5 py-1
        transition-all duration-300 ease-in-out"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-ropaSans text-2xl text-black rounded-full bg-white hover:bg-black hover:text-white px-5 py-1
        transition-all duration-300 ease-in-out"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
