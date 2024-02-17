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
  const [toggle, setToggle] = useState(true)
  const [toggledCountry, setToggledCountry] = useState(null)

//HANDLERS
  const handleSearch = (e)=> setSearchQuery(e.target.value)
  const handleToggle = (country) => {
    setToggledCountry(country === toggledCountry ? null : country);
  };
  
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
                        < WeatherComponent key={country.cca2} country = {country} />
                      </div>
                    </div>)) 
                :
          // MULTIPLE MATCHES
          (
            <div>
              {filter.map((country) => (
                <ul key={country.cca2}>
                  <li>
                    {country.name.common}{' '}
                    <button onClick={() => handleToggle(country)}>
                      {toggledCountry === country ? 'hide' : 'show'}
                    </button>
                  </li>
                  {toggledCountry === country && (
                    <div>
                      <h2>{country.name.common}</h2>
                      <button onClick={() => handleToggle(country)}>hide</button>
                      <p>Capital: {country.capital}</p>
                      <h3>Languages</h3>
                      <ul>
                        {Object.values(country.languages).map((language, index) => (
                          <li key={index}>{language}</li>
                        ))}
                      </ul>
                      <img src={country.flags.png} alt="" />
                    </div>
                  )}
                </ul>
              ))}
            </div>
          )
            )
            :
            ( searchQuery.length ===0 ? null : `Too may matches, please specify another filter`)
          }</div> 
          </div>
  )
}

export default App