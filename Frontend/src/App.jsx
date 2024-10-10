import React from 'react'
import Home from "./component/Home"
import Login from './component/Login'
import Signup from './component/Signup'
import PageNotFound from "./component/PageNotFound"
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
const App = () => {
  const token = localStorage.getItem("jwt");
  return (
    <div>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App