// USER JAISE HI LOGIN KAREGA USKA PROFILE AAYEGA ISS FOLDER SE
/*import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        console.log(res);
        
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyProfile();
  }, [id]);
};
export default useGetProfile; */

import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; // Stop if `id` is not available

    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        //console.log(res);

        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchMyProfile();
  }, [id]);
};

export default useGetProfile;
