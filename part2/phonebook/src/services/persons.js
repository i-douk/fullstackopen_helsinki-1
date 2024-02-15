import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const createPerson = newObject => {
  return axios.post(baseUrl, newObject)
}

const updatePerson= (id, newObj) =>{
  return axios.put(`${baseUrl}/${id}`, newObj)
}

const deletePerson = (id, setError, person)=> {
  return axios.delete(`${baseUrl}/${id}`)
  .catch(error => {
    setError(`Informations of '${person.name}' has already been removed`)
    setTimeout(() => {
      setError(null)
    }, 5000)
    ;
  })
}

export default { 
  getAll: getAll, 
  createPerson: createPerson, 
  deletePerson: deletePerson,
  updatePerson : updatePerson
}