import { toast } from 'react-toastify'
import { URL } from '../api/configuration'

export const search = async (searchQuery) => {
    const request = await fetch(
        `${URL}/projects/search/${searchQuery}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }
    )
    return await request.json()
}

export const add = async (body, token) => {
    const request = await toast.promise(
        fetch(
            `${URL}/projects`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: body
                //The reason why we don't use stringify it to json is because the formdata body is a multipart form which consists of files
            }
        ),
        {
            pending: 'Uploading Project',
            success: 'Project successfully uploaded!',
            error: `There's an error in uploading the Project!`
        }
    )
    return await request.json()
}

export const checkProjectLikeFavorite = async (id, token) => {
    const request = await fetch(
        `${URL}/projects/check/${id}`,
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

export const update = async (body, token, id) => {
    const request = await toast.promise(
        fetch(
            `${URL}/projects/${id}?_method=PATCH`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: body
            }
        ),
        {
            pending: 'Uploading Project',
            success: 'Project successfully uploaded!',
            error: `There's an error in uploading the Project!`
        }
    )
    return await request.json()
}

export const destroy = async (id, token) => {
    const request = await fetch(
        `${URL}/projects/${id}`,
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

export const indexTopRated = async () => {
    const request = await fetch(`${URL}/projects/top-rated`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}

export const indexPopular = async () => {
    const request = await fetch(`${URL}/projects/popular`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}

export const indexRecent = async () => {
    const request = await fetch(`${URL}/projects/recent`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}

export const show = async (id) => {
    const request = await fetch(`${URL}/projects/${id}`, {
        headers: {
            Accept: 'application/json',
        }
    })

    return await request.json()
}
