import { createSlice } from "@reduxjs/toolkit";
import userInfoInterfase from "../interfaces/userInfo";

const initialState : userInfoInterfase = {
    username : "",
    role_id : 0,
    id : 0
}
export const userSlice = createSlice({
   name : "userInfo",
   initialState,
   reducers : {
    setusername : (state : userInfoInterfase,action) => {
    state.username = action.payload;
    },
    setRole_id : (state : userInfoInterfase,action) => {
    state.role_id = action.payload;
    },
    setID : (state : userInfoInterfase,action) => {
        state.id = action.payload;
    }
   }
});

export const {setusername,setRole_id,setID} = userSlice.actions;

export default userSlice.reducer;