import React from 'react';
import {Routes,  Navigate, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({children, redirectTo}) => {
  const [cookies, setCookies] = useCookies(['isAuthenticated'])
  const isAuthenticated = cookies.isAuthenticated

  return (
      isAuthenticated ? children : <Navigate to={redirectTo}/>
  )
}

export default ProtectedRoute;
