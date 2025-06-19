import axios from "axios"
import { useAppDispatch } from ".."
import { UserSlice, type User } from "./userReducer"
import { jwtDecode } from "jwt-decode"
import { cartSlice } from "../cart/cartReducer"


export const userLogin = (email:any, password:any) => {
    return async(dispatch = useAppDispatch()) => {
        try{
            const {data} = await axios.post('http://localhost:5000/api/user/login', {email, password})
            localStorage.setItem('token', data.token)
            const userData:User = jwtDecode(data.token)
            dispatch(UserSlice.actions.FETCH_DATA(userData))
            dispatch(cartSlice.actions.LOG_IN(userData.id))
        }catch(e:any){
            dispatch(UserSlice.actions.FETCH_ERROR(`Error: ${e} `))
        }
    }
}


export const userRegistration = (email:any, password:any) => {
    return async(dispatch = useAppDispatch()) => {
        try{
            const {data} = await axios.post('http://localhost:5000/api/user/registration', {email, password})
            localStorage.setItem('token', data.token)
            const userData:User = jwtDecode(data.token)
            dispatch(UserSlice.actions.FETCH_DATA(userData))
            dispatch(cartSlice.actions.LOG_IN(userData.id))
        } catch(e:any){
            dispatch(UserSlice.actions.FETCH_ERROR(`Error: ${e.response.data.message} `))
        }
    }
}


export const userCheck = () => {
    return async(dispatch = useAppDispatch()) => {
        try{
            const {data} = await axios.get('http://localhost:5000/api/user/auth', {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}} )
            localStorage.setItem('token', data.token)
            const userData:User = jwtDecode(data.token)
            dispatch(UserSlice.actions.FETCH_DATA(userData))
            dispatch(UserSlice.actions.FETCH_ERROR(null))
            dispatch(cartSlice.actions.LOG_IN(userData.id))
        } catch(e:any){
            
        }
    }
}


