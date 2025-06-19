import { createSlice } from "@reduxjs/toolkit"

type Brands = {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
} 

type BrandsState = {
    error: string | null,
    brands:  Brands[] 
}

const initialBrandsState:BrandsState = {
    error: null,
    brands: []
}

export const brandsSlice = createSlice({
    name: "brandsState",
    initialState: initialBrandsState,
    reducers: {
        FETCH_BRANDS: (state, action)=>{
            state.brands = action.payload
        },
        FETCH_ERRORS: (state, action)=>{
            state.error = action.payload
        },
        CREATE_BRAND: (state, action)=>{
            state.brands = [...state.brands, action.payload]
        }
    }
})