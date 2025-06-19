import { createSlice } from "@reduxjs/toolkit"
import type { Device } from "../devices/deviceReducer"

type CartState = {
    userId: number | undefined | any
    items: {
        cartItemId: number
        device: Device
    }[]
}

const initialCartState:CartState = {
    userId: undefined,
    items: []
}

export const cartSlice = createSlice({
    name: "cartState",
    initialState: initialCartState,
    reducers:{
        LOG_IN:(state, action) => {
            state.userId = action.payload
        },
        ADD_CART_ITEM:(state, action)=>{
            state.items = [...state.items, {
                cartItemId: new Date().getTime(),
                device: action.payload
            }]
        },
        DELETE_CART_ITEM:(state,action) => {
            state.items = state.items.filter(item => item.cartItemId != action.payload)
        },
        CLEAR_CART:(state) =>{
            state.items = []
        },
        LOG_OUT:(state) =>{
            state.userId = undefined
        }
    }
})