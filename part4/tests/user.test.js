// const bcrypt = require('bcrypt')
// const { test, beforeEach, after, describe } = require('node:test')
// const assert = require('node:assert')
// const mongoose = require('mongoose')
// const User = require('../models/user')
// const supertest = require('supertest')
// const app = require('../app')
// const helper = require('./test_helper')
// const api = supertest(app)

// describe('when there is initially one user in db', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root',
//                             name: 'Superuser',
//                             passwordHash
//                         })

//     await user.save()
//   })

//   test('creation succeeds with a fresh username', async () => {
//     const usersAtStart = await helper.usersInDb()

//     const newUser = {
//       username: 'ihssandk',
//       name: 'Ihssan D',
//       password: 'dookan',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

//     const usernames = usersAtEnd.map(u => u.username)
//     assert(usernames.includes(newUser.username))
//   })
// })

// after(async () => {
//     await mongoose.connection.close()
// })