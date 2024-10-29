import {createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name:"tweets",
    initialState:{
        tweets:null,
        refresh:false,
        isActive:true
    },
    reducers:{
        // multiple actions
        getAllTweets:(state,action)=> {
            state.tweets = action.payload;
        },
        getRefresh:(state) => {
            state.refresh = !state.refresh;
        },
        getIsActive:(state,action)=>{
            state.isActive = action.payload;
        }
        
    }
});
export const { getAllTweets , getRefresh, getIsActive} = tweetSlice.actions; // Export the action
export default tweetSlice.reducer;
// tweetSlice ko store me paas karna hai