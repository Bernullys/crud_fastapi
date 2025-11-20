import { useNavigate } from "react-router-dom"

function BackButton () {

    const navigate = useNavigate()

    const goBackHome = (event) => {
        event.preventDefault()
        navigate("/")
    }

    return (
        <div>
            <button onClick={goBackHome}>Log Out</button>
        </div>
    )
}

export default BackButton