import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState{
    name:string | null;
    authToken:string | null;
    refreshToken:string |null;
}
const data = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!): {};
const authSlice =createSlice({
    name:"auth",
    initialState:{
        name:null,
        authToken:data.authToken,
        refreshToken:data.refreshToken,
    } as AuthState,
    reducers:{
      setUser:(state,action:PayloadAction<{name:string; authToken:string; refreshToken:string; role:string}>)=>{
        localStorage.setItem("user",JSON.stringify({
          name:action.payload.name,
          authToken:action.payload.authToken,
          refreshToken:action.payload.refreshToken,
        }))
        state.name=action.payload.name;
        state.authToken=action.payload.authToken;
        state.refreshToken=action.payload.refreshToken;
      },
      logout:(state) =>{
        localStorage.clear();
        state.name =null;
        state.authToken=null;
        state.refreshToken=null;
      },
      

    }
  })
  
  
  export const selectAuth =(state:RootState) =>state.auth; 
  export const {setUser,logout} =authSlice.actions;

  export default authSlice.reducer;
  
  export const selectCurrentUser = (state:any) => state.auth.name;
  export const selectCurrentauth = (state:any) => state.auth.authToken;
  export const selectCurrentrefresh = (state:any) => state.auth.refreshToken;
  