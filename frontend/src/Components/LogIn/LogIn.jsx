import { NavLink } from "react-router-dom";

function LogIn () {
    return (
        <div id="login">
            <h2>Log in</h2>
            <div>
                <form action="">
                    <div>
                        <label htmlFor="user">User</label>
                        <input type="text" name="user" id="user" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button>Login</button>
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