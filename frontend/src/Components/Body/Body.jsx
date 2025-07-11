import { useState } from "react";
import UsersTable from "../UsersTable/UsersTable";


function Body () {

    const [currentTable, setCurrentTable] = useState("")

    function handleTable (event) {
        event.preventDefault()
        setCurrentTable(event.target.value)
    }

   const actualTable = currentTable;

    function renderTable () {
        switch (actualTable) {
            case "users-table":
                return <UsersTable/>
            default:
                return null;
        }
    }

    return (
        <div>
            <h1>CRUD APP</h1>
            <p>Create, Read, Update and Delete</p>
            <form action="">
                <label htmlFor="selection">Select a Table </label>
                <select name="selections" id="selections" onChange={handleTable}>
                    <option value="users-table">Users</option>
                    <option selected value="products-table">Products</option>
                </select>
            </form>
            <div>
                { renderTable() }
            </div>
        </div>
    )
}

export default Body;