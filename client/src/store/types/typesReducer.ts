import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

type Types = {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
} 

type TypesState = {
    error: string | null,
    types:  Types[] 
}

const initialTypesState:TypesState = {
    error: null,
    types: []
}

export const typesSlice = createSlice({
    name: "typeState",
    initialState: initialTypesState,
    reducers: {
        FETCH_TYPES: (state, action)=>{
            state.types = action.payload
        },
        FETCH_ERRORS: (state, action)=>{
            state.error = action.payload
        },
        CREATE_TYPE: (state, action) =>{
            state.types = [...state.types, action.payload]
        }
    }
})