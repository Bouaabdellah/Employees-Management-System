import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userInfo";
import sideBar from "./sidebar";

const store = configureStore({
   reducer : {
      userInformation : userInfo,
      sidebar : sideBar
   }
});

export default store;