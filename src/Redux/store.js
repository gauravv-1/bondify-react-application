import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import instituteReducer from "./Slices/Institute/fethInstituteSlice";


export const store = configureStore({
   reducer:{
    auth:authReducer,
    institute: instituteReducer,
   }
})