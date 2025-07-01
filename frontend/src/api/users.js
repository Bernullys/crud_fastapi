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
        return ([])
    }
}