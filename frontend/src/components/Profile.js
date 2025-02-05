import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

//import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useGetProfile(id);
  useGetProfile(user?._id);
  const dispatch = useDispatch();

  const followAndUnfollowHandler = async () => {
    if (user?.following?.includes(id)) {
      //unfollow
      //call api
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id: user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id: user?._id});
        console.log(res);
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className=" w-full md:w-[50%] border-l border-r border-gray-200">
      <div>
        <div className=" flex items-center py-2">
          <Link
            to="/"
            className=" p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className=" ml-2">
            <h1 className=" font-bold text-base md:text-lg">{profile?.name}</h1>
            <p className=" text-gray-500 text-xs md:text-sm">10 post</p>
          </div>
        </div>
        <img className="w-full"
          src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"
          alt="banner"
        />
        <div className="absolute top-40 md:top-52 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="90"
            round={true}
          />
        </div>
        <div className=" text-right m-4">
          {
           profile?._id === user?._id ? (
            <button className=" px-3 py-1 hover:bg-gray-200 rounded-full border border-gray-400 text-xs md:text-sm">
              Edit Profile
            </button>
           ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-3 py-1 bg-black text-white rounded-full text-xs md:text-sm"
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
           )
          }
        </div>
        <div className=" m-4">
          <h1 className=" font-bold text-lg md:text-xl">{profile?.name}</h1>
          <p className="text-sm md:text-base">{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-xs md:text-sm">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
            Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me
            on this coding journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
