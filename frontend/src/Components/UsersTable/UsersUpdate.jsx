import { useState } from 'react';


function UsersUpdate () {

    const [selectedOption, setSelectedOption] = useState("")
    const [updateParam, setUpdateParam] = useState("")
    const [newParam, setNewParam] = useState("")

    const handleSelection = (e) => {
        setSelectedOption(e.target.value)
    } 

    const handleUpdateParam = (e) => {
        setUpdateParam(e.target.value)
    }

    const handleNewParam = (e) => {
        setNewParam(e.target.value)
    } 


    return (
        <div className="crud-form-container">
            <h3>Update User</h3>
            <form action="" className="crud-form">
                <label htmlFor="">Update by</label>
                <select name="" id="" onChange={handleSelection}>
                    <option name="id" value="id">Id</option>
                    <option name="name" value="name">Name</option>
                    <option name="email" value="email">Email</option>
                    <option name="all-param" value="all-param">Id, name and email</option>
                </select>
                {
                    selectedOption == "id" || selectedOption == "name" || selectedOption == "email" ?

                    <div>
                        <div>
                            <label htmlFor="">Type {selectedOption}</label>
                            <input type="text" name="update-param" id="" value={updateParam} onChange={handleUpdateParam}/>
                        </div>
                        <div>
                            <label htmlFor="">Type new {selectedOption}</label>
                            <input type="text" name="new-param" id="" value={newParam} onChange={handleNewParam}/>
                        </div>
                    </div>

                    :
                    <div>
                        <div>
                            <label>Id</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <label>Name</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="text" name="" id="" />
                        </div>
                    </div>

                }
                <button>Update</button>
            </form>
        </div>
    )
}

export default UsersUpdate