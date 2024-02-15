import React from 'react'
import {useState, useMemo, useEffect} from 'react'
import countryService from './services/countries'


const App = () => {

  //States
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showInfo, setShowInfo] = useState(false)

  //Handlers
  const handleSearch = (e)=> setSearchQuery(e.target.value)
  const handleShow= (e)=> {
    e.preventDefault()
    setShowInfo(!showInfo)
  }
  
  // First render
  useEffect(() => {
    countryService.getCountries()
    .then(response => {
      setCountries(response.data)
    })
    .catch(error => {
      console.log('fail')
    })
  },[])


  

      // Filtered countries
  const filteredCountries = useMemo(() => 
    countries.filter(country => 
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())), [countries, searchQuery])
  
  const countryCard = (name)=> {
                <div>
                    <h2>{country.name.common}</h2> <button onClick={handleShow}>show</button>
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
  
  return(
    <div>
        <div>
            find countries: <input value={searchQuery} onChange={handleSearch} />
        </div>
        <div> 
          Found: {
         filteredCountries.length < 11?

         // one single match found, show country card
           
         (filteredCountries.length === 1  ?
                (filteredCountries.map(country=>
                  <div>
                    <h2>{country.name.common}</h2> <button onClick={handleShow}>show</button>
                    <p>Capital: {country.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                      {
                      Object.values(country.languages).map(language=>
                      <li key={Math.random()}>{language}</li>)
                      }
                    </ul>
                    <img src={country.flags.png} alt=""></img>
                  </div>)) 
              :
         // multiple matches
              (filteredCountries.map(country=>

              !showInfo?
                 <li key={country.cca2}>{country.name.common}<button onClick={handleShow}>show</button></li>
              :(<div>
                    <h2>{country.name.common}</h2>
                    <button onClick={handleShow}>show</button>
                    <p>Capital: {country.capital}</p>
                    <h3>Languages</h3>
                    <ul>
                      {
                      Object.values(country.languages).map(language=>
                      <li key={Math.random()}>{language}</li>)
                      }
                    </ul>
                    <img src={country.flags.png} alt=""></img>
                  </div>))
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