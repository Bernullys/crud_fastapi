import "./Header.css";

function Header ( { selectedTable, onAction }) {

    function handleAction(action) {
        onAction(action);

    }

    return (
        <div className="header-nav-container">
            <nav className="header-nav">
                <ul>
                    <li>
                        <button className="search-botton" onClick={() => handleAction("search")}>Search</button>
                    </li>
                    <li>
                        <button className="add-botton" onClick={() => handleAction("add")}>Add</button>
                    </li>
                    <li>
                        <button className="update-botton" onClick={() => handleAction("update")}>Update</button>
                    </li>
                    <li>
                        <button className="delete-botton" onClick={() => handleAction("delete")}>Delete</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;