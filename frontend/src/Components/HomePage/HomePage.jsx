import { NavLink } from "react-router-dom";
function HomePage () {
    return (
        <div>
            <h1>Crud App</h1>
            <h2>This is my Home Page</h2>
            <p>You can <NavLink to='/login'>login</NavLink> or <NavLink to='/register'>register</NavLink> an account.</p>
        </div>
    )
}

export default HomePage;