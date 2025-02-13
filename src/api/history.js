import { URL } from "./configuration"

export const index = async (token) => {
    const request = await fetch(
        `${URL}/history`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    )
    return await request.json()
}

export const store = async (projectId, token) => {
    const request = await fetch(
        `${URL}/history/${projectId}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

    )
}