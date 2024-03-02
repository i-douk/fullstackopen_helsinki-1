require('dotenv').config()
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
app.use(cors())
app.use(bodyParser.json())
app.use('/api/users', usersRouter)
app.use('/api/blog', blogRouter)
app.use(express.json())
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app