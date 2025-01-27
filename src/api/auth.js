import { URL } from "./configuration"

const login = async(body) => {
    const request = fetch(
        `${URL}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json', // This receives a response in json format from the api
            "Content-Type": 'application/json' // This sends the request as a json format to the api
        },
        body: JSON.stringify(body) // This contains the formdata, 
    }
    )
    return await request.json()
}

const checkToken = async(body) => {
    const request = fetch(`${URL}/checktoken`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })

    return await request
}