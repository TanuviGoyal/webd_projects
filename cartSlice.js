//reducer created that is mentioned in index.js(reducer) and then combined.rootReducer is then used in index.js(src)
import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast';

const initialState={
    totalItems:localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")):0
}

const cartSlice =createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems=value.payload;
        }
    }

})

export const {setTotalItems}=cartSlice.actions;
export default cartSlice.reducer;