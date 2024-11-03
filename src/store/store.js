import { configureStore} from "@reduxjs/toolkit";
import notesReducer from "./Slices/notesSlice.js";
import authReducer  from "../store/Slices/authSlice.js"


export const store = configureStore({
  reducer : {
    notesSlice : notesReducer,
    authSlice : authReducer
  }
})

