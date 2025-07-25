import { useState } from "react";
import { postUser } from "../../api/users";
import { usersBaseUrl } from "../../config";

function AddUser ({ onUserAdded }) {

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    })

    const handleInputs = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    } 

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await postUser(`${usersBaseUrl}add/`, formData)
            setFormData({
                name: "",
                email: ""
            })
            onUserAdded() // notify parent to re-fetch users
        } catch {
            alert("Don't post")
        }
    }


    return (
        <div className="crud-form-container">
            <h3>Add user</h3>
            <form onSubmit={handleSubmit} action="" className="crud-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleInputs}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleInputs}/>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddUser;