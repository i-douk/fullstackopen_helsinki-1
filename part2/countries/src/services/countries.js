import axios from 'axios'


const getCountries = () => {
  return  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')}

const getCountry = (name) => {
  return  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)}

export default { 
  getCountries : getCountries,
  getCountry:getCountry
}