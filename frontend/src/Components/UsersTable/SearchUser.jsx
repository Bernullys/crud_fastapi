import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import { usersBaseUrl } from "../../config";

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
        // const queryParams = new URLSearchParams()
        // if (formValues.userId) queryParams.append("id", formValues.userId);
        // if (formValues.userName) queryParams.append("name", formValues.userName);
        // if (formValues.userEmail) queryParams.append("email", formValues.userEmail);
        // const url = `${usersBaseUrl}search/?${queryParams.toString()}`;


        const response = await fetchUsers(`${usersBaseUrl}search/?id=${formValues.userId}&name=${formValues.userName}&email=${formValues.userEmail}`)

        setResults(response || [])
    }

    console.log(results)

    return (
        <div className="crud-form-container">
            <h3>Search user(s)</h3>
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
                    <input type="email" name="email" id="user-email" value={formValues.email} onChange={handleFormValues}/>
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    )
};

export default SearchUser;