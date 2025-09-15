import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import Registration from './Component/AuthComponent/Registration.jsx'
import VerifyOtp from './Component/AuthComponent/VerifyOtp.jsx'
import UserLogin from './Component/AuthComponent/UserLogin.jsx'
import HomePage from './Component/HomeComponent/HomePage.jsx'
import ChangePassword from './Component/AuthComponent/ChangePassword.jsx'
// import GetResetOtp from './Component/AuthComponent/GetResetOtp.jsx'
import ContextProvider from './Context/ContextProvider.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Registration />} />
      <Route path='verifyOtp' element={<VerifyOtp />} />
      <Route path='userLogin' element={<UserLogin />} />
      <Route path='homepage' element={<HomePage />} />
      <Route path='resetPassword' element={<ChangePassword />} />
      {/* <Route path='resetPassword' element={<GetResetOtp />} /> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </ContextProvider>
)
