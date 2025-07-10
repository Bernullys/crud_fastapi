import "./Header.css";

function Header ( { goTo }) {

    return (
        <div className="header-nav-container">
            <nav className="header-nav">
                <ul>
                    <li>
                        <button className="home-botton" onClick={() => goTo("home")}>Home</button>
                    </li>
                    <li>
                        <a href="" onClick={ (e) => { e.preventDefault() ; goTo("search") }}>Search</a>
                    </li>
                    <li>
                        <a href="" onClick={ (e) => { e.preventDefault(); goTo("add") }}>Add</a>
                    </li>
                    <li>
                        <a href="" onClick={ (e) => { e.preventDefault(); goTo("update") }}>Update</a>
                    </li>
                    <li>
                        <a href="" onClick={ (e) => { e.preventDefault(); goTo("delete") }}>Delete</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;