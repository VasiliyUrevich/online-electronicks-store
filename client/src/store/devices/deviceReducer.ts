import { createSlice } from "@reduxjs/toolkit"

export type Device = {
    id:number,
    name: string,
    price: number,
    rating: number,
    img: string,
    createdAt: Date,
    updatedAt: Date,
    typeId: number,
    brandId: number
}


type DeviceState = {
    error: string | null,
    loading: boolean,
    devices: {
        count: number,
        rows: Device[] 
    }
}

const initialDevicesState:DeviceState = {
    error: null,
    loading: false,
    devices:{
        count: 0,
        rows: []
    }
}

interface  FETCH_DEVICES_SUCCES_ACTION{
    payload:{
        count: number,
        rows: Device[] 
    }
}
interface  FETCH_ONE_DEVICE_SUCCES_ACTION{
    payload:Device 
}

interface FETCH_ERROR_ACTION{
    payload: string
}

export const DevicesSlice = createSlice({
    name: "devicesState",
    initialState: initialDevicesState,
    reducers:{
        FETCH_DEVICES: (state)=>{
            state.loading = true
        },
        FETCH_DEVICES_SUCCES: (state, action:FETCH_DEVICES_SUCCES_ACTION)=>{
            state.loading = false
            state.devices.count = action.payload.count
            state.devices.rows = action.payload.rows 
        },
        FETCH_ONE_DEVICE: (state)=>{
            state.loading = true
        },
        FETCH_ONE_DEVICE_SUCCES: (state, action:FETCH_ONE_DEVICE_SUCCES_ACTION)=>{
            state.loading = false
            state.devices.rows = [action.payload]
        },
        FETCH_ERROR: (state, action:FETCH_ERROR_ACTION)=>{
            state.loading = false
            state.error = action.payload
        }
        
    }
})