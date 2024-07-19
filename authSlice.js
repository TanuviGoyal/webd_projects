//reducer created that is mentioned in index.js(reducer) and then combined.rootReducer is then used in index.js(src)
import {createSlice} from '@reduxjs/toolkit';

const initialState={
    token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
}

const authSlice =createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
        }
    }

})

export const {setToken}=authSlice.actions;
export default authSlice.reducer;