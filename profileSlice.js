//reducer created that is mentioned in index.js(reducer) and then combined.rootReducer is then used in index.js(src)
import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:null,
}

const profileSlice =createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
        }
    }

})

export const {setUser}=profileSlice.actions;
export default profileSlice.reducer;