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