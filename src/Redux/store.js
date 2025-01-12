import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import instituteReducer from "./Slices/Institute/fethInstituteSlice";
import postReducer from "./Slices/postSlice"


export const store = configureStore({
   reducer:{
    auth:authReducer,
    institute: instituteReducer,
    post: postReducer
   }
})