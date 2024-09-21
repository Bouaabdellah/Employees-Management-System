import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./userInfo";
import sideBar from "./sidebar";
import choises from "./choises";

const store = configureStore({
   reducer : {
      userInformation : userInfo,
      sidebar : sideBar,
      choises : choises
   }
});

export default store;