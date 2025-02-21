import { toast } from "react-toastify";
import { URL } from "./configuration";

export const show = async (userId) => {
    const request = await fetch(`${URL}/profile/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await request.json()
}

export const userProjects = async (userId) => {
    const request = await fetch(`${URL}/profile/${userId}/projects`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })

    return await request.json()
}

export const update = async (body, token) => {
    const request = await toast.promise(
        fetch(`${URL}/profile?_method=PATCH`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: body
            }),
        {
            pending: 'Uploading Project',
            success: 'Project successfully uploaded!',
            error: `There's an error in uploading the Project!`
        }
    )
    return await request.json()
}