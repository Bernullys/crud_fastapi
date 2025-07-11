import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import TableCard from "../TableCard/TableCard";

const baseUrlUsers = "http://127.0.0.1:8000/users/"

function UsersTable () {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await fetchUsers(baseUrlUsers)
            setData(response || [])
        }
        loadUsers();

    },[])

    if (!data || !Array.isArray(data.data)) {
        return <div> Loading...</div>
    }

    console.log("data", data)

    const users = data.data.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email
    }))

    console.log("users", users)

    const headers = ["ID", "Name", "Email"]

    return (

        <section>
            <h2>Users Table</h2>
            <TableCard headers={headers} data={users} />
        </section>
    )
}

export default UsersTable;