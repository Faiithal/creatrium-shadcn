import { URL } from "./configuration";

export const show = async(userId) => {
    const request = await fetch(`${URL}/profile/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await request.json()
}
 
export const userProjects = async(userId) => {
    const request = await fetch(`${URL}/profile/${userId}/projects`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await request.json()
}
 
export const update = async(userId) => {
    const request = await fetch(`${URL}/profile/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await request.json()
}