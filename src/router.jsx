import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ClientHome from './Pages/ClientHome'
import Projects from './Pages/Projects'
import NavigationBar from './components/ui/NavigationBar'
import Profile from './Pages/Profile'
import UserProject from './Pages/UserProject'
import EditProject from './Pages/EditProject'
import ProfileSettings from './Pages/ProfileSettings'
import SecuritySettings from './Pages/SecuritySettings'
import SearchProject from './Pages/SearchProject'

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
                path: '/profile/:id',
                element: <Profile />
            },
            {
                path: '/my-projects/edit/:id/',
                element: <EditProject />
            },
            {
                path: '/my-projects',
                element: <UserProject />
            },
            {
                path: '/settings/profile',
                element: <ProfileSettings />
            },
            {
                path: '/settings/security',
                element: <SecuritySettings />
            },
            {
                path: '/results',
                element: <SearchProject />
            },
        ]
    },
])
export default router