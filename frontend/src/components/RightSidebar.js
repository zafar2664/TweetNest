import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const RightSidebar = ({ otherUsers }) => {
  // home.js se laa kar recieve kar liye
  return (
    <div className=" w-full ml-2 mr-2 md:w-[25%]">
      <div className=" flex items-center p-2 bg-gray-100 rounded-full outline-none w-full mb-4">
        <CiSearch size="20px" />

        <input
          type="text"
          className=" bg-transparent outline-none px-2 w-full text-sm md:text-base"
          placeholder="Search"
        />
      </div>

      <div className=" p-4 bg-gray-100 rounded-2xl my-4 ">
        <h1 className=" font-bold text-lg md:text-xl">Who to follow</h1>
        {
          //multiple user ko display karne ke liye map ka use karenge
          otherUsers?.map((user) => {
            return (
              <div
                key={user?._id}
                className="flex items-center justify-between my-3"
              >
                <div className=" flex items-center">
                  <div>
                    <Avatar
                      src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                      size="40"
                      round={true}
                    />
                  </div>
                  <div className=" ml-2">
                    <h1 className=" font-bold text-sm md:text-base">
                      {user?.name}
                    </h1>
                    <p className=" text-xs md:text-sm">{`@${user?.username}`}</p>
                  </div>
                </div>

                <Link to={`/profile/${user?._id}`}>
                  <button className=" px-3 py-1 bg-black text-white text-xs md:text-sm rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default RightSidebar;
