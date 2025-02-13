import { URL } from "./configuration"

export const add = async(project, token) => {
    const request = await fetch(
        `${URL}/favorites/${project}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
    )
    return await request.json()
}

export const destroy = async(project, token) => {
    const request = await fetch(
        `${URL}/favorites/${project}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
    )
    return await request.json()
}

export const checkFavorite = async(project, token) => {
    const request = await fetch(
        `${URL}/favorites/check/${project}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        }
    )
    return await request.json()
}