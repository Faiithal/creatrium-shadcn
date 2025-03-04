// The reason behind using Authcontext is so that we minimize the amount of requests needed to go inside a page

import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { logout as logoutRequest } from '../api/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies()

    // Login
    const login = (userData) => {
        setUser(userData)
    }

    const logout = () => {
        logoutRequest(cookies.token).then((res) => {
            removeCookie('token')
        })
        // add logout link
    }

    return (
        // Don't mind the other things above, this is the core concept of context. Children refers to the components and the values are the one to pass to children
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}



