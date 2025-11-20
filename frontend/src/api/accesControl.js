import { extractErrorMessage } from "./extractErrorMessage";

const baseEndPoint = "http://127.0.0.1:8000"

export async function fetchAppUsers (formData, endPoint) {
    try {
        const response = await fetch(`${baseEndPoint}/${endPoint}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(extractErrorMessage(data))
        }
        alert(`${endPoint} added successfully`)
    } catch (error) {
        alert(`Error adding ${endPoint}: ` + error.message)
    }
}

// Submit a POST request to login app_users:

export async function logUsers (formData) {
    try {
        const urlEncoded = new URLSearchParams()
        urlEncoded.append("username", formData.username)
        urlEncoded.append("password", formData.password)

        const response = await fetch(`${baseEndPoint}/login/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
            body: urlEncoded.toString()
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(extractErrorMessage(data))
        }

        const token = data.access_token
        console.log("User logged successfully: ", data, token)
        localStorage.setItem("access_token", token)

    } catch (error) {
        alert(`Error loging: ` + error.message)
    }
}