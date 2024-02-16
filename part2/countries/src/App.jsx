/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React from 'react'
import {useState, useMemo, useEffect} from 'react'
import countryService from './services/countries'
import WeatherComponent from './components/WeatherComponent'

const App = () => {

//STATES
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [toggle, setToggle] = useState(false)

//HANDLERS
  const handleSearch = (e)=> setSearchQuery(e.target.value)
  const handleToggle= (e)=> {
    e.preventDefault()
    setToggle(!toggle)
  }
  
//FIRST RENDER
  useEffect(() => {
    countryService.getCountries()
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log('fail')
    })
  },[])


//FILTER
  const filter = useMemo(() => 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())), [countries, searchQuery])
  

  return(    
    <div>
        <div>
            find countries: <input value={searchQuery} onChange={handleSearch} />
        </div>
  <div> 
          Found: {
         filter.length < 11?

         // ONE MATCH 
         (filter.length === 1  ?
                (filter.map(country=>
                  <div>
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                      {
                      Object.values(country.languages).map(language=>
                      <li key={Math.random()}>{language}</li>)
                      }
                    </ul>
                    <img src={country.flags.png} alt=""></img>
                    <div>
                      <h2>Weather in {country.name.common}</h2>
                      < WeatherComponent key={country.cca2} country = {country} />
                    </div>
                  </div>)) 
              :
         // MULTIPLE MATCHES
              (filter.map(country=>

                 <li>{country.name.common}<button onClick={handleToggle}>show</button>
                    {toggle && 
                    <div>
                          <h2>{country.name.common}</h2>
                          <button onClick={handleToggle}>hide</button>
                          <p>Capital: {country.capital}</p>
                          <h3>Languages</h3>
                          <ul>
                            {
                            Object.values(country.languages).map(language=>
                            <li key={Math.random()}>{language}</li>)
                            }
                          </ul>
                          <img src={country.flags.png} alt=""></img>
                    </div>
                    }
                  </li>)
              )
          )
          :
          ( searchQuery.length ===0 ? null :
            `Too may matches, please specify another filter`
          )
        }</div> 
  </div>
  )
}

export default App