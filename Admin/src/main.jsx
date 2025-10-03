import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import App from './App.jsx'
import AddItem from './Component/AddItemComponent/AddItem.jsx'
import ListItem from './Component/ListItemComponent/ListItem.jsx'
import AdminRegistration from './Component/AdminAuthenticationComponent/AdminRegistration.jsx'
import AdminLogin from './Component/AdminAuthenticationComponent/AdminLogin.jsx'
import VerifyOtp from './Component/AdminAuthenticationComponent/VerifyOtp.jsx'
import AdminContextProvider from './Context/AdminContextProvider.jsx'
import ProtectedRoute from './Component/ProtectedComponent/ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route element={<ProtectedRoute/>}>
        <Route path='additem' element={<AddItem />} />
        <Route path='listitem' element={<ListItem />} />
      </Route>
      <Route path='adminregistration' element={<AdminRegistration />} />
      <Route path='verify' element={<VerifyOtp />} />
      <Route path='adminlogin' element={<AdminLogin />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
      <RouterProvider router={router} />
    </AdminContextProvider>
    {/* <App/> */}
  </StrictMode>,
)
