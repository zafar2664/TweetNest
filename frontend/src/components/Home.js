import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
//import Feed from './Feed'
import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  //condition for homepage- agar user hai to thik hai, agar nahi hai aur user try kar rha hai homepage par jaane ka to usko navigate kar denge .
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  // custom hooks
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  return (
    <div className="flex justify-between w-[80%] mx-auto mt-2">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUsers={otherUsers} />
    </div> // rightsidebar me props paas kar diye aur sidebar me use kar liye
  );
};

export default Home;
