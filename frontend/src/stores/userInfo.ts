import { createSlice } from "@reduxjs/toolkit";

interface state{
    email : string;
    role_id : number;
}
const initialState : state = {
    email : "",
    role_id : 0
}
export const userSlice = createSlice({
   name : "userInfo",
   initialState,
   reducers : {
    setEmail : (state : state,action) => {
    state.email = action.payload;
    },
    setRole_id : (state : state,action) => {
    state.role_id = action.payload;
    }
   }
});

export const {setEmail,setRole_id} = userSlice.actions;

export default userSlice.reducer;