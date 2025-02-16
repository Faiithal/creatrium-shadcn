import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { checkToken } from '../api/auth'

// Basically checks if you're actually logged in or not and it does not consume any calls as it references entirely from the authcontext
// which its data is grabbed onto onLogin function

const withAuth = (WrappedComponent) => {
    const withAuth = (props) => {
        const [cookies, setCookies, removeCookie] = useCookies()
        const navigate = useNavigate()
        const { user, login } = useContext(AuthContext) // Essentially, we're grabbing the values from the global context of user
        const token = cookies.token // grabs the cookie value made by the login
    
        if(!token){
            return <Navigate to='/login'/>
        }
        else {
            if(!user) {
                checkToken(token).then(res => {
                    if(res?.ok){
                        login(res?.data)
                        console.log('!!!')
                    }
                    else{
                        navigate('/login')
                    }
                })
            }
        }
        return <WrappedComponent {...props} />
    }
    
    return withAuth
}

export default withAuth