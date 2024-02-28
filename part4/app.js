require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')

app.use('/api/blog', blogRouter)
app.use(express.json())
app.use(cors())

module.exports = app