import { extractErrorMessage } from "./extractErrorMessage.js"

export async function fetchProducts (url) {
    try {
        const response = await fetch(url, { method: "GET" })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(extractErrorMessage(errorData) || `HTTP ${response.status}`)
        }

        const data = await response.json()
        
        return data

    } catch (error) {
        alert("Catched error on get products" + error.message)
        throw error
    }
}