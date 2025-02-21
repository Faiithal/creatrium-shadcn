import { URL } from "./configuration"

export const show = async(id) => {
    const result = await fetch(`${URL}/comments/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    })
}

export const store = async(body, id, token) => {
    const result = await fetch(`${URL}/comments/${id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export const destroy = async(id, token) => {
    const result = await fetch(`${URL}/comments/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
}