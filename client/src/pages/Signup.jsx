/*

import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useUpload } from "../hooks/useUpload";

const Signup = () => {

  const { setProgress } = useContext(AppContext);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      console.log;
      toast.error("Image Size must be less than 1MB");
    }
    setImage(file);
  };

  const onUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(progress);
  };

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (!name || !email || !password || !image) {
        return toast.success("All Fields are required");
      }
      if (name.trim === "" || email.trim === "" || password.trim === "") {
        return toast.success("All Fields are required");
      }
      if (name.length < 3 || (!email.includes("@") && !email.includes("."))) {
        return toast.success("Please enter valid email address or name");
      }
      const { public_id, url } = await useUpload({ image, onUploadProgress });
      if (!public_id || !url) {
        toast.error("Error Uploading Image");
        return
      } else {
        const res = await axios.post("http://localhost:5000/api/signup", {
          name,
          email,
          password,
          profile: url,
          publiId: public_id,
        });
        const data = await res.data;
        if (data.success === true) {
          toast.success(data.message);
          e.target.reset();
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center my-20 h-[50vh]">
        <h2 className="text-white font-bold text-xl sm:text-3xl">
          Lets Create Your Profile
        </h2>
        <form onSubmit={handleSignUp} className="grid sm:grid-cols-2 gap-5">
          <div className="flex flex-col mt-5 gap-5 ">
            <label htmlFor="name" className="text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
         
              required
              className="p-2 border boder-gray-700 rounded-md"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col mt-5 gap-5 ">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
        
              name="email"
              required
              className="p-2 border boder-gray-700 rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col mt-5 gap-5 ">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
          
              required
              className="p-2 border boder-gray-700 rounded-md"
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col mt-5 gap-5 ">
            <label htmlFor="profile" className="text-white">
              Profile:
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile"
              name="profile"
              onChange={handleImageChange}
              required
              className="p-2 border boder-gray-700 rounded-md text-white"
              placeholder="Profile"
            />
          </div>
          <div className="flex gap-5 items-center mx-5">
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-md "
            >
              Sign up
            </button>

            <Link
              to="/login"
              className="text-white relative right-0 font-poppins text-xl sm:text-3xl"
            >
              Already have account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
*/

import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useUpload } from "../hooks/useUpload";

const Signup = () => {
  const { setProgress } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      toast.error("Image Size must be less than 1MB");
    } else {
      setImage(file);
    }
  };

  const onUploadProgress = (progressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(progress);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      if (!name || !email || !password || !image) {
        return toast.error("All Fields are required");
      }
      if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return toast.error("All Fields are required");
      }
      if (name.length < 3 || (!email.includes("@") || !email.includes("."))) {
        return toast.error("Please enter a valid email address or name");
      }

      const { public_id, url, error } = await useUpload({ image, onUploadProgress });
      if (error) {
        return toast.error("Error Uploading Image: " + error);
      }

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        name,
        email,
        password,
        profile: url,
        publicId: public_id,
      });

      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        e.target.reset();
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Signup failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-20 h-[50vh]">
      <h2 className="text-white font-bold text-xl sm:text-3xl mt-3">Let's Create Your Profile</h2>
      <form onSubmit={handleSignUp} className="grid sm:grid-cols-2 gap-5">
        {/* Form Inputs */}
        <div className="flex flex-col mt-3 gap-5">
          <label htmlFor="name" className="text-white">Name:</label>
          <input type="text" id="name" name="name" required className="p-2 border border-gray-700 rounded-md" placeholder="Name" />
        </div>
        <div className="flex flex-col mt-3 gap-5">
          <label htmlFor="email" className="text-white">Email:</label>
          <input type="email" id="email" name="email" required className="p-2 border border-gray-700 rounded-md" placeholder="Email" />
        </div>
        <div className="flex flex-col mt-3 gap-5">
          <label htmlFor="password" className="text-white">Password:</label>
          <input type="password" id="password" name="password" required className="p-2 border border-gray-700 rounded-md" placeholder="Password" />
        </div>
        <div className="flex flex-col mt-3 gap-5">
          <label htmlFor="profile" className="text-white">Profile:</label>
          <input type="file" accept="image/*" id="profile" name="profile" onChange={handleImageChange} required className="p-2 border border-gray-700 rounded-md text-white" />
        </div>
        <div className="flex gap-5 items-center mx-5">
          <button type="submit" className="bg-primary text-white p-2 rounded-md">Sign up</button>
          <Link to="/login" className="text-primary text-sm">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
