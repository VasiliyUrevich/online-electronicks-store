import axios from "axios"
import { useAppDispatch } from ".."
import { DevicesSlice } from "./deviceReducer"


export const fetchDevices = (brandId?:number, typeId?:number, limit?:number, page?:number) => {
    return async(dispatch = useAppDispatch()) => {
        try{
            dispatch(DevicesSlice.actions.FETCH_DEVICES())
            const {data} = await axios.get('http://localhost:5000/api/device/', {params:{brandId: brandId, typeId: typeId, limit: limit, page: page}} )
            dispatch(DevicesSlice.actions.FETCH_DEVICES_SUCCES(data))
        } catch(e:any){
             dispatch(DevicesSlice.actions.FETCH_ERROR(`Error: ${e.response.data.message} `))
        }
    }
}

export const fetchOneDevice = (deviceId:number) => {
    return async(dispatch = useAppDispatch()) => {
        try{
            dispatch(DevicesSlice.actions.FETCH_ONE_DEVICE())
            const {data} = await axios.get(`http://localhost:5000/api/device/${deviceId}` )
            dispatch(DevicesSlice.actions.FETCH_ONE_DEVICE_SUCCES(data))
        } catch(e:any){
             dispatch(DevicesSlice.actions.FETCH_ERROR(`Error: ${e.response.data.message} `))
        }
    }
}

export const createDevice = (device:FormData) => {
    return async function(dispatch = useAppDispatch()){
        try{
            const {data} = await axios.post('http://localhost:5000/api/device/', device)  
        }catch(e:any){
            dispatch(DevicesSlice.actions.FETCH_ERROR(`error: ${e.response.message}`))
        }
    }
}
