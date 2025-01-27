import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'

// Note: Basically we create a variable of a router for it to be used by a routerProvider in the actual app ^^
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
])
export default router