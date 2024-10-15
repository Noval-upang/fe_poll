import "./index.css"

import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom'

import ControlPanel from './components/All/ControlPanel/ControlPanel'
import User from './components/All/User'
import Dasboard from './components/Admin/Dasboard/Dasboard'
import Casier from './components/All/Casier/Casier'
import Product from "./components/Admin/Product/Product"
import Auth from "./components/Middleware/Auth"
import NoAuth from "./components/Middleware/NoAuth"
import Navbar from "./components/All/Navbar/Navbar"

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/user" element={<NoAuth/>}>
        <Route index element={<User />}/>
      </Route>
      
      <Route path="/" element={<Auth/>}>
        <Route index element={<ControlPanel/>}/> 
        
        <Route 
          path='/company/:id' element={<Outlet/>}>
          <Route index element={<><Navbar /><Dasboard/></>}/>
          <Route path='product' element={<><Navbar/><Product/></>}/>
          <Route path='casier' element={<Casier/>}/>
        </Route>
      </Route>

      <Route path='*' element={<>404</>}/>
    </Routes>
    
  </BrowserRouter>
)
  
