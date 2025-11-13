import { useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchAppUsers } from "../../api/accesControl";

function Register () {

    const [appUserData, setAppUserData] = useState({
        name: "",
        email: "",
        user_name: "",
        password: ""
    })

    const handleInputs = (event) => {
        setAppUserData({ ...appUserData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetchAppUsers(appUserData, "register")
            setAppUserData({
                name: "",
                email: "",
                user_name: "",
                password: ""
            })
        } catch (error) {
            alert("Catched error registiring app user")
        }
    }


    return (
        <div>
            <h2>Register an Account</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" id="name" value={appUserData.name} onChange={handleInputs}/>
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" id="email" value={appUserData.email} onChange={handleInputs}/>
                    </div>
                    <div>
                        <label htmlFor="">User name</label>
                        <input type="text" name="user_name" id="user_name" value={appUserData.user_name} onChange={handleInputs}/>
                    </div>
                    <div>
                        <label htmlFor="">Password</label>
                        <input type="password" name="password" id="password" value={appUserData.password} onChange={handleInputs}/>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <button>
                    <NavLink to="/">Go Back</NavLink>
                </button>
            </div>
        </div>
    )
}

export default Register;