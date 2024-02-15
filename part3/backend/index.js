const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
  ]
  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/info', (request, response) => {
  const whataDay = new Date ()
    response.send(`Phonebook has infor for ${persons.length} people <br/> ${whataDay}`)
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  response.json(person)
})

const generateId = () =>{
  return Math.floor(Math.random()*1000)
}

app.post('/api/persons', (request, response) => {
  
  const body = request.body
  const foundItem = persons.find(person => person.name === body.name )
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (foundItem) {
    return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    const newPerson ={
      name : body.name,
      number : body.number,
      id: Number(generateId())
    }
    morgan.token('body', request => JSON.stringify(request.body))
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)