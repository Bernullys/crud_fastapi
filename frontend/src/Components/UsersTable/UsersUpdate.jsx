import { useState } from 'react';
import { patchUser } from '../../api/users';
import { usersBaseUrl } from '../../config';


function UsersUpdate ({ onUserUpdated }) {

    const [selectedOption, setSelectedOption] = useState("name")
    const [updateParam, setParamToUpdate] = useState("")
    const [newParam, setNewParam] = useState("")

    console.log(selectedOption, updateParam, newParam, `${usersBaseUrl}update/${selectedOption}/${updateParam}/${newParam}`)

    const handleSelection = (e) => {
        setSelectedOption(e.target.value)
    } 

    const handleParamToUpdate = (e) => {
        setParamToUpdate(e.target.value)
    }

    const handleNewParam = (e) => {
        setNewParam(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await patchUser(`${usersBaseUrl}update/${selectedOption}/${updateParam}/${newParam}`)
            setParamToUpdate("")
            setNewParam("")
            onUserUpdated()
        } catch {
            alert("Don't patch")
        }
    }


    return (
        <div className="crud-form-container">
            <h3>Update User</h3>
            <form onSubmit={handleSubmit} action="" className="crud-form">
                <label htmlFor="">Update by</label>
                <select name="" id="" onChange={handleSelection}>
                    <option name="name" value="name">Name</option>
                    <option name="email" value="email">Email</option>
                </select>
                <div>
                    <div>
                        <label htmlFor="">Type {selectedOption}</label>
                        <input type="text" name="update-param" id="" value={updateParam} onChange={handleParamToUpdate}/>
                    </div>
                    <div>
                        <label htmlFor="">Type new {selectedOption}</label>
                        <input type="text" name="new-param" id="" value={newParam} onChange={handleNewParam}/>
                    </div>
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UsersUpdate