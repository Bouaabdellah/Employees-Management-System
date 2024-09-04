import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userInfo";

const store = configureStore({
   reducer : {
      userInformation : userInfo
   }
});

export default store;