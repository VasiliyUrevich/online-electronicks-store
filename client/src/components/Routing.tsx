import React from 'react'
import { Route, Routes } from 'react-router'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Auth from '../pages/Auth'
import Admin from '../pages/Admin'
import Device from '../pages/Device'

const Routing = () => {
    const isAuth = true

    const isAuthRoutes = [
        {
            path: "/admin",
            element: <Admin/>
        },
        {
            path: "/cart",
            element: <Cart/>
        },
    ] 
   
  return (
    <Routes>

        {isAuth && isAuthRoutes.map(({path, element})=>
            <Route key={path} path={path} element={element}/>
        )}

        <Route path="/" element={<Catalog/>}/>
        <Route path="*" element={<Catalog/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/device/:id" element={<Device/>}/>
       
        
    </Routes>
  )
}

export default Routing