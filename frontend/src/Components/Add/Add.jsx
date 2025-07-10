import { useState } from 'react';
import { postUser } from '../../api/users';

const baseUrlUsers = "http://127.0.0.1:8000/users/"

function Add () {

    const [formData, SetFormData] = useState({
        name: "",
        email: ""
    })

    function handleValue(e) {
        SetFormData({...formData, [e.target.name]: e.target.value})
    }

    console.log(formData)

    async function addUser (e) {
        e.preventDefault()
        try {
            const response = await postUser(baseUrlUsers, formData)
            SetFormData({
                name: "",
                email: ""
            })            
        } catch (error) {
            console.log("Catched error adding user")
        }
    }
    

    return (
        <div>
            <h2>Add Page</h2>
            <form onSubmit={addUser}>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleValue}/>
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleValue} />
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Add;