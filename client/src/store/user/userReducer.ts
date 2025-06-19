import { createSlice, isAction } from "@reduxjs/toolkit";

export type User = {
    id:number
    email:string
    role:string
    iat:number
    exp:number
}

export type UserState = {
    isAuth: boolean,
    isAdmin: boolean,
    error: string | null,
    data?: User
}

const initialUserState:UserState = {
    isAuth: false,
    isAdmin: false,
    error:  null 
}

interface TakeTokenData{
    payload: any
}

export const UserSlice = createSlice({
    name: "userState",
    initialState: initialUserState,
    reducers:{
        FETCH_DATA: (state, action:TakeTokenData)=>{
            state.error = null
            state.data = action.payload
            state.isAuth = true
            if(state.data?.role == 'ADMIN'){
                state.isAdmin = true
            } else{
                state.isAdmin = false
            }
        },
        FETCH_ERROR: (state, action) =>{
            state.error = action.payload
        },
        LOG_OUT: (state)=>{
            state.isAuth = false
            state.isAdmin = false
            state.data = undefined
            localStorage.removeItem('token')
        }
        
    }
})