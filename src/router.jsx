import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ClientHome from './Pages/ClientHome'
import Projects from './Pages/Projects'
import NavigationBar from './components/ui/NavigationBar'
import Profile from './Pages/Profile'
import Test from './Pages/Test'
import UserProject from './Pages/UserProject'

// Note: Basically we create a variable of a router for it to be used by a routerProvider in the actual app ^^
const router = createBrowserRouter([
    {
        path: "/",
        element: <NavigationBar />,
        children: [
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
            {
                path: '/home',
                element: <ClientHome />
            },
            {
                path: '/projects',
                element: <Projects />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/test',
                element: <Test />
            },
            {
                path: '/my-projects',
                element: <UserProject />

            }
        ]
    },
])
export default router