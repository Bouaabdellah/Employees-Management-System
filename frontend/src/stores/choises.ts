import { createSlice } from "@reduxjs/toolkit";
import choises from "../interfaces/choises";

const initialState : choises = {
    branches : [],
    roles : [],
    managers : []
}
const choisesStore = createSlice({
    name : 'choises',
    initialState : initialState,
    reducers : {
    setManagers : (state : choises,action) => {
    state.managers = action.payload;
    },
    setBranches : (state : choises,action) => {
    state.branches = action.payload;
    },
    setRoles : (state : choises,action) => {
    state.roles = action.payload;
    }
    }
});

export const {setManagers,setBranches,setRoles} = choisesStore.actions;

export default choisesStore.reducer;