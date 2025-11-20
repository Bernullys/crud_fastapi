import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logUsers } from "../../api/accesControl";

function LogIn () {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleInputs = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await( logUsers(formData))

            setFormData({
                username: "",
                password: ""
            })

            navigate("/body")
        
        } catch (error) {
            console.log("Catch error login user")
        }
    }

    return (
        <div id="login">
            <h2>Log in</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">User</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleInputs} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleInputs}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <button>
                    <NavLink to="/">Go back</NavLink>
                </button>
            </div>
        </div>
    )
}

export default LogIn;