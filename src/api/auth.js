import { URL } from "./configuration"

export const register = async(body) => {
    const request = await fetch(
        `${URL}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
    )
    return await request.json()
}

export const login = async(body) => {
    const request = await fetch(
        `${URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json', // This receives a response in json format from the api
        },
        body: body // This contains the formdata, 
    }
    )
    return await request.json()
}

export const logout = async(token) => {
    const request = await fetch(
        `${URL}/logout`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json', // This receives a response in json format from the api
            Authorization: `Bearer ${token}`
        }
    }
    )
    return await request.json()
}

export const checkToken = async(token) => {
    const request = await fetch(`${URL}/checkToken`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })

    return await request.json()
}