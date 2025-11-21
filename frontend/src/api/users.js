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

    const token = localStorage.getItem("access_token")
    
    if (!token) {
        alert("You have to be a register app user")
        return
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(extractErrorMessage(errorData))
        }
        
        const data = await response.json()
        console.log(data)
        return { data }

    } catch (error) {
        alert("Catched error on getUser: " + error.message)
        return ({ data: [] })
    }
}


export async function postUser(url, formData) {

    try {
        const request = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })

        const data = await request.json()

        if (!request.ok) {
            throw new Error(extractErrorMessage(data))
        }
        console.log("User added successfully: ", data)

    } catch (error) {
        alert("Catched error on postUser: " + error.message)
        console.log("Catched error on postUser: ", error.message)
    }
}

export async function patchUser(url, updateData) {

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateData)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(extractErrorMessage(error))
        }

    } catch (error) {
        alert("Catched error on patchUser: " + error.message)
        console.log("Catched error on patchUser: ", error.message)
    }
}

export async function deleteUser(url) {
    try {
        const response = await fetch (url, {
            method: "DELETE"
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(extractErrorMessage(data))
        }

        console.log("User delete successfully: ", data)
        return data

    } catch (error) {
        alert("Catched error on delete user: " + error.message)
        console.log("Catched error on delete user: ", error.message)
    }
}