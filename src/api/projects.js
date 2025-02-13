import { URL } from '../api/configuration'

export const add = async(body, token) => {
    console.log(body)
    const request = await fetch(
        `${URL}/projects/`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body 
            //The reason why we don't use stringify it to json is because the formdata body is a multipart form which consists of files
        }
    )
    return await request.json()
}

export const update = async(body, token, id) => {
    console.log(body)
    const request = await fetch(
        `${URL}/projects/${id}?_method=PATCH`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body 
            //The reason why we don't use stringify it to json is because the formdata body is a multipart form which consists of files
        }
    )
    return await request.json()
}

export const indexTopRated = async() =>{
    const request = await fetch(`${URL}/projects/top-rated`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}

export const indexPopular = async() =>{
    const request = await fetch(`${URL}/projects/popular`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}

export const indexRecent = async() =>{
    const request = await fetch(`${URL}/projects/recent`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}
 
export const show = async(id) =>{
    const request = await fetch(`${URL}/projects/${id}`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}
 