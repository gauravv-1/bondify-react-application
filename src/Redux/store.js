import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import instituteReducer from "./Slices/Institute/fethInstituteSlice";
import postReducer from "./Slices/postSlice"
import searchReducer from "./Slices/Search/searchSlice"
import profileReducer from "./Slices/Profile/profileSlice";


export const store = configureStore({
   reducer:{
    auth:authReducer,
    institute: instituteReducer,
    post: postReducer,
    search: searchReducer,
    profile: profileReducer
   }
})