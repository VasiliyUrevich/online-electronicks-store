import axios from "axios"
import { useAppDispatch } from ".."
import { typesSlice } from "./typesReducer"

export const createType = (name:any) => {
    return async function(dispatch = useAppDispatch()){
        try{
            const {data} = await axios.post('http://localhost:5000/api/type', {name})
            dispatch(typesSlice.actions.CREATE_TYPE(data))
        }catch(e:any){
            dispatch(typesSlice.actions.FETCH_ERRORS(`error: ${e.response.message}`))
        }
    }
}

export const fetchTypes = () => {
    return async function(dispatch = useAppDispatch()){
        try{
            const {data} = await axios.get('http://localhost:5000/api/type')
            dispatch(typesSlice.actions.FETCH_TYPES(data))
        }catch(e:any){
            dispatch(typesSlice.actions.FETCH_ERRORS(`error: ${e.response.message}`))
        }
    }
}