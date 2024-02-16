import { useState, useMemo, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  
// LIST OF STATES
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

// // RETRIEVE DATA FROM JSONSERVER db.json VIA AXIOS
//   useEffect(() => {
//     console.log('effect')
//     axios.get('http://localhost:3001/persons')
//     .then(response => {
//       console.log('promise fulfilled')
//       setPersons(response.data)
//     })}, [])
//     console.log('render', persons.length, 'persons')
    useEffect(() => {
      personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
    }
      ,[])

// EVENT HANDLERS
const handleChangeName = (e)=>{setNewName(e.target.value)}
const handleChangeNum = (e)=>{setNewNum(e.target.value)}
const handleChangeSearch = (e)=>{setSearchQuery(e.target.value)}

//ADD PERSON TO PHONEBOOK AND ALERT WHEN NAME ALREADY EXISTS
  const addPerson = (e) =>{
    e.preventDefault()
    const personObject = {
      name: newName,
      number:  newNum,
    }
    const foundItem = persons.find(person=> person.name.toLowerCase() === personObject.name.toLowerCase())
    const indexFound = persons.findIndex(person=> person.name.toLowerCase() === personObject.name.toLowerCase())
    console.log(foundItem)
    console.log(indexFound)
    if (indexFound > -1)
    {window.confirm(`${foundItem.name} is already added to phonebook, replace the old number with a new one?`
    ) && personService.updatePerson(foundItem.id, {...foundItem, number : personObject.number})
        .then(response => {
          personService.getAll()
          .then(response => {
            setPersons(response.data)
            setNotification(
              `'${personObject.name}' was replaced`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            setNewName('')
            setNewNum('')
           
          })})
    }else{
      personService
      .createPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification(
          `'${personObject.name}' was added`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        setNewName('')
        setNewNum('')
      })
      .catch(error => {
        setError(
          `'${personObject.name}' is too short, make sure the name is at least 3 letters long`)
          setTimeout(() => {
            setError(null)
            }, 5000)
                    
      })
  }
  }


//SEARCHING FOR NAMES AND NUMBERS IN PHONEBOOK
    const filteredPersons = useMemo(() => 
    persons.filter(person => 
      person.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [persons, searchQuery])

// JSX
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
       <Filter searchQuery={searchQuery} handleChangeSearch={handleChangeSearch} />

      <h2>add a new</h2>
       <PersonForm addPerson={addPerson} newName={newName} handleChangeName={handleChangeName} newNum={newNum} handleChangeNum={handleChangeNum} />

      <h2>Numbers</h2>
       <Persons setError={setError} searchQuery={searchQuery} filteredPersons={filteredPersons} persons={persons} setPersons={setPersons} />

    </div>
  )
}

export default App
