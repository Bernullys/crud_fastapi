import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";

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

    console.log(data)

    return (

        <section>
            <h2>Users Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </section>
    )
}

export default UsersTable;