import { toast } from "react-toastify"
import { URL } from "./configuration"

export const show = async (id) => {
    const result = await fetch(`${URL}/comments/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })

    return await result.json()
}

export const store = async (body, id, token) => {
    const result = await toast.promise(
        fetch(`${URL}/comments/${id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body
        }),
        {
            pending: 'Adding comment',
        }
    )

    return await result.json()
}

export const destroy = async (id, token) => {
    const result = await fetch(`${URL}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })

    return await result.json()
}