import { useState } from "react"
import { usersBaseUrl } from "../../config"
import { deleteUser } from "../../api/users"

function DeleteUser ({ onUserDeleted }) {

    const [selectedOption, setSelectedOption] = useState("name")
    const [deleteParam, setDeleteParam] = useState("")

    const handleSelectedOption = (e) => {
        setSelectedOption(e.target.value)
    }

    const handleDeleteParam = (e) => {
        setDeleteParam(e.target.value)
    }

    async function handleSubmit (e) {
        e.preventDefault()
        try {
            const response = await deleteUser(`${usersBaseUrl}delete/${selectedOption}/${deleteParam}`)
            setDeleteParam("")
            onUserDeleted()
        } catch (error) {
            alert("Catched error while consuming deleUser")
        }
    }

    return (
        <div className="crud-form-container">
            <h3>Delete User</h3>
            <form onSubmit={handleSubmit} action="" className="crud-form">
                <label htmlFor="">Delete by</label>
                <select name="" id="" value={selectedOption} onChange={handleSelectedOption}>
                    <option value="name" name="name" selected>Name</option>
                    <option value="email" name="email">Email</option>
                </select>
                <div>
                    <label htmlFor="delete-param">Type user {selectedOption} to delete</label>
                    <input type="text" name="delete-param" value={deleteParam} onChange={handleDeleteParam} id="delete-param" />
                </div>
                <button type="submit">Delete</button>
            </form>
        </div>
    )
}

export default DeleteUser