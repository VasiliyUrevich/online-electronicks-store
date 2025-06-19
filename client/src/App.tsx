import React, { useEffect, useState } from "react"
import { BrowserRouter} from "react-router"
import Routing from "./components/Routing"
import Header from "./components/Header"
import { userCheck } from "./store/user/fetchUserData"
import { useAppDispatch } from "./store"
import { UserSlice } from "./store/user/userReducer"
import Footer from "./components/Footer"
import { fetchTypes } from "./store/types/fetchTypes"
import { fetchBrands } from "./store/brands/fetchBrands"

function App() {

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(userCheck())
    setLoading(false)
    dispatch(fetchTypes())
    dispatch(fetchBrands())
}, [])

  if (loading) {
    return <h1>Loading...</h1>
  }
 
  return (
    <>
    <BrowserRouter>
      <Header></Header>

      <Routing></Routing>
      <Footer></Footer>
    </BrowserRouter>
    </>
    
  )
}

export default App
