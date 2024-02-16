import axios from 'axios'
const api_key = import.meta.env.VITE_API_KEY

const getCountries = () => {
  return  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')}

const getWeather = (lat,lon) => {
  console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
}

export default { 
  getCountries : getCountries,
  getWeather : getWeather
}