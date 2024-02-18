require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blog')
app.use(express.json())
app.use(cors())
app.use('/api/blog', blogRouter)

module.exports = app