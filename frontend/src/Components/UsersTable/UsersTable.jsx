import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import TableCard from "../TableCard/TableCard";
import Header from "../Header/Header";
import SearchUser from "./SearchUser";
import { usersBaseUrl } from "../../config";

function UsersTable () {

    // This will lift action state to parent
    const [selectedAction, setSelectedAction] = useState(null);
    function handleTableAction (action) {
        setSelectedAction(action);
    }

    const [data, setData] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await fetchUsers(usersBaseUrl)
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
            <Header selectedTable = { "users" } onAction={handleTableAction}/>
            {
                selectedAction === "search" && (
                    <SearchUser />
                )
            }
            {
                selectedAction === "add" && (
                    <h3>Add form</h3>
                )
            }
            {
                selectedAction === "update" && (
                    <h3>Update form</h3>
                )
            }
            {
                selectedAction === "delete" && (
                    <h3>Delete form</h3>
                )
            }
            <TableCard headers={headers} data={users} />
        </section>
    )
}

export default UsersTable;