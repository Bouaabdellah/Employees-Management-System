import { createSlice } from "@reduxjs/toolkit";

interface state{
    displaySidebar : boolean;
}
const initialState : state = {
    displaySidebar : false
}

export const sidebar = createSlice({
    name : "sideBar",
    initialState,
    reducers : {
        setSidebar : (state : state) => {
            state.displaySidebar = !state.displaySidebar;
        }
    }
});

export const {setSidebar} = sidebar.actions;

export default sidebar.reducer;