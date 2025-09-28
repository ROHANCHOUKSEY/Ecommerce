import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom"
import App from './App.jsx'
import AddItem from './Component/AddItemComponent/AddItem.jsx'
import ListItem from './Component/ListItemComponent/ListItem.jsx'
import AdminRegistration from './Component/AdminAuthenticationComponent/AdminRegistration.jsx'
import AdminLogin from './Component/AdminAuthenticationComponent/AdminLogin.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      {/* <Route path='additem' element={<AddItem/>}/>
      <Route path='listitem' element={<ListItem/>}/> */}
      <Route path='adminregistration' element={<AdminRegistration/>}/>
      <Route path='adminlogin' element={<AdminLogin/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App/> */}
  </StrictMode>,
)
