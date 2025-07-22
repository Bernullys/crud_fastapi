import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import { usersBaseUrl } from "../../config";
import TableCard from "../TableCard/TableCard";

function SearchUser () {
    
    const [results, setResults] = useState([])

    const [formValues, setFormValues] = useState({
        userId: "",
        userName: "",
        userEmail: ""
    })

    function handleFormValues (e) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }
    
    async function searchAUser (e) {
        e.preventDefault()

        // A way to safely construct the query string:
        const queryParams = new URLSearchParams()
        if (formValues.userId) queryParams.append("id", formValues.userId);
        if (formValues.userName) queryParams.append("name", formValues.userName);
        if (formValues.userEmail) queryParams.append("email", formValues.userEmail);
        if (!queryParams.toString()) {
            alert("Please enter at least one value to search.")
        }

        const url = `${usersBaseUrl}search/?${queryParams.toString()}`;
        const response = await fetchUsers(url)

        if (response && response.data) {
            const mapped = response.data.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email
            }))
            console.log(mapped)
            setResults(mapped)
        } else {
            console.log("Not result")
            setResults(["no Id", "not Name", "not email"])
        }
    }

    const headers = ["Id", "Name", "Email"]

    return (
        <div className="crud-form-container">
            <h3>Search user(s)</h3>
            {
                results.length > 0 ? <TableCard headers={headers} data={results} /> : ""
            }
            <form onSubmit={searchAUser} className="crud-form" action="">
                <div>
                    <label htmlFor="user-id">Id</label>
                    <input type="numeric" name="userId" id="user-id" value={formValues.userId} onChange={handleFormValues}/>
                </div>
                <div>
                    <label htmlFor="user-name">Name</label>
                    <input type="text" name="userName" id="user-name" value={formValues.userName} onChange={handleFormValues}/>
                </div>
                <div>
                    <label htmlFor="user-email">Email</label>
                    <input type="email" name="userEmail" id="user-email" value={formValues.userEmail} onChange={handleFormValues}/>
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    )
};

export default SearchUser;