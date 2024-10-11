import React, { useEffect, useState } from 'react';
import Home from "./component/Home";
import Login from './component/Login';
import Signup from './component/Signup';
import PageNotFound from "./component/PageNotFound";
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  // State to track the token
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  // useEffect to listen for changes in localStorage (token) and update state
  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("jwt");
    setToken(tokenInLocalStorage); // Set token when app mounts or localStorage changes
  }, [token]); // Re-run this effect if token changes

  return (
    <div>
      <Routes>
        {/* Agar token nahi hai to Signup pe redirect karna */}
        <Route path="/" element={!token ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
