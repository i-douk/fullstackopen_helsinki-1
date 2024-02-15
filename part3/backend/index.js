// const mongoose = require('mongoose')
// const password = process.argv[2]
// const url = `mongodb+srv://ihssan:${password}@cluster-fso.e5hniy1.mongodb.net/?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const personSchema = new mongoose.Schema({
//   content: String,
//   number: Number,
// })
// personSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Person = mongoose.model('Person', personSchema)
require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))
app.use(express.json())
morgan.token('body', request => JSON.stringify(request.body))

app.get('/info', (request, response) => {
  const whataDay = new Date ()
  Person
  .estimatedDocumentCount()
  .then(docCount => {
    console.log(docCount)
    response.send(`Phonebook has info for ${docCount} people <br/> ${whataDay}`)
})
    .catch(err => { `Phonebook has info for so many people <br/> ${whataDay}`
    })
  })
  
  app.get('/api/persons', (request, response) => {
    Person.find({})
     .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })
})
})

app.post('/api/persons', (request, response) => {

  const body = request.body
  if (!body.name || !body.number ) {
    return response.status(400).json({ error: 'name or number missing' })
  } 

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  
  Person.findByIdAndRemove(id)
    .then((removedPerson) => {
      if (removedPerson) {
        console.log(`Item with ID ${id} removed`);
        response.status(204).end();
      } else {
        response.status(404).send({ error: 'Person not found' });
      }
    })
    .catch((error) => {
      console.error('Error removing person:', error);
      response.status(500).send({ error: 'Internal server error' });
    });
});



const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)