import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';


export const apiEndpoint =createApi({
    reducerPath:'apiEndpoint',
    baseQuery:fetchBaseQuery(
        {
            baseUrl:'http://localhost:4000',
            prepareHeaders:(headers,{getState})=>{
                const authToken=(getState() as RootState).auth.authToken;
                const refreshToken=(getState() as RootState).auth.refreshToken;
                if(authToken && refreshToken){
                    console.log(`Bearer ${authToken}+${refreshToken}`)
                    headers.set("authorization",`Bearer ${authToken}+${refreshToken}`);
                }
                return headers;
            }
        }
    ),
    endpoints:(builder)=>({

        RegisterUser:builder.mutation({
            query:(payload:{name:string;email:string;password:string})=>{
                return{
                    url:"/register",
                    method:'POST',
                    body:payload,
                }
            }
        }),
        
        SigninUser:builder.mutation({
            query:(payload:{email:string;password:string})=>{
                return{
                    url:"/signup",
                    method:'POST',
                    body:payload,
                }
            }
        }),
    })
})

export const {useRegisterUserMutation,useSigninUserMutation,} =apiEndpoint;