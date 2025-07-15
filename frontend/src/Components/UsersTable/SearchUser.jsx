import { useState } from "react";

function SearchUser () {

    const [formValues, setFormValues] = useState({
        userId: "",
        userName: "",
        userEmail: ""
    })

    function handleFormValues (e) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    console.log(formValues)

    return (
        <div className="crud-form-container">
            <h3>Search user(s)</h3>
            <form className="crud-form" action="">
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
                <button>Search</button>
            </form>
        </div>
    )
};

export default SearchUser;