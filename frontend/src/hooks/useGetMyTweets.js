/*
// USER JAISE HI LOGIN KAREGA USKA PROFILE AAYEGA ISS FOLDER SE
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";


const useGetMyTweets = () => {
  const dispatch = useDispatch();

  //createPost.js ka use kar rahe hain
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`, {
        withCredentials: true,
      });
      console.log(res);

      dispatch(getAllTweets(res.data.tweets));
   } catch (error) {
      console.log(error);
    }
  };

  // following tweet
  const followingTweetHandler = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweet/${id}`
      );
      console.log(res);
      dispatch(getAllTweets(res.data.tweets));
      //dispatch(getRefresh());
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {
    console.log("IsActive state:", isActive);
    if (isActive) {
      fetchMyTweets();
    } else {
      followingTweetHandler();
    }
  }, [refresh, isActive]);
}; 

export default useGetMyTweets;

// isko home.js me use kareng

*/

import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);

  const fetchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`, {
        withCredentials: true,
      });
      //console.log(res);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  const followingTweetHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweet/${id}`
      );
      //console.log(res);
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fetchMyTweets();
    } else {
      followingTweetHandler();
    }
  }, [isActive, refresh]);
};
export default useGetMyTweets;
