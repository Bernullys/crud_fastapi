import { useState } from "react";

function Header () {

    const [currentTable, setCurrentTable] = useState("")

    function handleTable (event) {
        event.preventDefault()
        setCurrentTable(event.target.value)
    } 
    console.log(currentTable)

    return (
        <section>
            <h1>CRUD APP</h1>
            <p>Create, Read, Update and Delete</p>
            <form action="">
                <label htmlFor="selection">Select a Table </label>
                <select name="selections" id="selections" onChange={handleTable}>
                    <option value="users-table">Users</option>
                    <option selected value="products-table">Products</option>
                </select>
            </form>
        </section>
    )
}

export default Header;