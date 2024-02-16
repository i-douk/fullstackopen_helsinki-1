const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ihssan:${password}@cluster-fso.e5hniy1.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number:  process.argv[4],
})

// eslint-disable-next-line no-unused-vars
person.save().then(result => {
  console.log(`added ${person.name} ${person.number} to phonebook!`)
  // mongoose.connection.close()
})

//RETRIEVE ALL Person objects

Person.find({}).then(result => {
  console.log( 'Phonebook:')
  result.forEach(person => {
    console.log( person.name, person.number)

  })
  mongoose.connection.close()
})