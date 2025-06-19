import axios from "axios"
import { useAppDispatch } from ".."
import { brandsSlice } from "./brandsReducer"

export const createBrand = (name:any) => {
    return async function(dispatch = useAppDispatch()){
        try{
            const {data} = await axios.post('http://localhost:5000/api/brand', {name})
            dispatch(brandsSlice.actions.CREATE_BRAND(data))
        }catch(e:any){
            dispatch(brandsSlice.actions.FETCH_ERRORS(`error: ${e.response.message}`))
        }
    }
}

export const fetchBrands = () => {
    return async(dispatch = useAppDispatch()) =>{
        try{
            const {data} = await axios.get('http://localhost:5000/api/brand')
            dispatch(brandsSlice.actions.FETCH_BRANDS(data))

        } catch(e:any){
            dispatch(brandsSlice.actions.FETCH_ERRORS(`error: ${e.response.message}`))
        }
    }
}