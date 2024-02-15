import React from 'react'

const PersonForm = (props) => {
  return (
    <div>
        <form onSubmit={props.addPerson}>
            <div>
            name: <input value={props.newName} onChange={props.handleChangeName}/> 
            </div>
            <div>
            number: <input type="number"  value={props.newNum} onChange={props.handleChangeNum}/>          
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm
