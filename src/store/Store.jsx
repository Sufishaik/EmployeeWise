import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UseSlice"

export const Store = configureStore({
    reducer: {
        user: userReducer
    },

})