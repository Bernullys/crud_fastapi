import { extractErrorMessage } from "./extractErrorMessage";
import { useState, useEffect } from "react";

// export function useUsersFetch (url) {

//     const [data, setData] = useState(null);

//     useEffect(() => {
//         fetch(url)
//             .then((response) => response.json())
//             .then((data) => setData(data));
//     }, [])

//     return { data }
// };


export async function fetchUsers (url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(extractErrorMessage(errorData))
        }
        const data = await response.json()
        console.log(data)
        return { data }

    } catch (error) {
        alert(error.message)
        return ({ data: [] })
    }
}


export async function postUser(url, formData) {
    try {
        const request = await fetch(url, {
            method: "Post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        const data = await request.json()
        if (!request.ok) {
            throw new Error(extractErrorMessage(data))
        }
        console.log("User added successfully: ", data)
    } catch (error) {
        console.log("Catched error on postUser: ", error.message)
    }
}