import { useState } from "react";
import UsersTable from "../UsersTable/UsersTable";
import ProductsTable from "../Products/ProductsTable";
import BackButton from "../BackButton/BackButton";


function Body () {

    const [currentTable, setCurrentTable] = useState("")

    function handleTable (event) {
        event.preventDefault()
        setCurrentTable(event.target.value)
    }

    function renderTable () {
        switch (currentTable) {
            case "users-table":
                return <UsersTable/>
            case "products-table":
                return <ProductsTable/>
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
            <div>
                <BackButton />
            </div>
        </div>
    )
}

export default Body;