import { URL } from './configuration'

export const index = async() => {
    const request = await fetch(`${URL}/categories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await request.json()
}