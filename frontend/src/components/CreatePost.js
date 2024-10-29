import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh, getIsActive } from "../redux/tweetSlice";
//import { getAllTweets } from "../redux/tweetSlice";

const CreatePost = () => {
  /* const [description, setDescription] = useState("");
  //loggedin user ki id store se lekar aani hai
  const { user } = useSelector((store) => store.user);

  // refresh action ko dispatch krenge tweetslice.js wale ka
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      // api ko call karenge
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          withCredentials: true,
        }
      );
      // refresh action ko dispatch krenge tweetslice.js wale ka
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  }; */

  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className=" w-full md:w-[70%] mx-auto">
      <div>
        <div className=" flex items-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-1/2 text-center px-4 py-2 md:py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-sm md:text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-1/2 text-center px-4 py-2 md:py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-sm md:text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className=" flex items-center p-2 md:p-4">
            <div>
              <Avatar
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                size="40"
                round={true}
              />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" w-full outline-none border-none text-base md:text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>

          <div className=" flex items-center justify-between p-2 md:p-4 border-b border-gray-200">
            <div>
              <CiImageOn size="24px" className="md:text-2xl"/>
            </div>
            <button
              onClick={submitHandler}
              className=" bg-[#1D9BF0] px-3 md:px-4 py-1 text-sm md:text-lg text-white border-none rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
