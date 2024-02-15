import React  from 'react'
import personService from '../services/persons'

export default function Persons(props) {
  return(
    <div>
   <li >
          { props.searchQuery.length> 0 ?
          props.filteredPersons.map(person=> <p>{person.name} {person.number}</p>)
          :
          props.persons.map((person =><ul key={person.id}>{person.name} {person.number} <button onClick={()=> {
            window.confirm(`do you want to delete ${person.name} from phonebook`);
            personService.deletePerson(person.id, props.setError, person).then(props.setPersons(props.persons.filter(item=> item.id!== person.id)));
      
        }}>delete</button></ul>))}
        </li>    </div>
  )
}
