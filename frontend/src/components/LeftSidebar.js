import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//import { get } from 'mongoose';
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  // navigate karna hai logout ko
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      // ye sab nhi dikhana hai
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      localStorage.removeItem("authToken");
      dispatch({ type: "CLEAR_USER_DATA" });
      navigate("/login");
      //navigate('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex flex-col items-center md:items-start">
        <div className="mb-4 md:ml-5">
          <img
            className="  h-10 w-10"
            width={"50px"}
            src="https://www.citypng.com/public/uploads/preview/hd-twitter-x-new-logo-png-735811696672788haniphkh2j.png"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4 space-y-4">
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start my-2 px-2 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiHome />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiHashtag />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoIosNotificationsOutline />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Notifications</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center justify-center md:justify-start my-2 px-2 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiUser />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiBookmark />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <AiOutlineLogout />
            </div>
            <h1 className="hidden md:block font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className=" px-4 py-2 border-none text-md bg-blue-500 w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
