const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  logger.info(`Getting blogs via HTTP get request`)
    Blog
      .find({})
      .then(result => response.status(201).json(result))
      .catch(error=>logger.error(error.message))  
  })
  
  blogRouter.post('/', (request, response) => {
    const body = request.body
    const newBlog = new Blog({
      title : body.title,
      author : body.author,
      url : body.url,
      likes : body.likes
    })
  
    newBlog
      .save()
      .then(result => response.status(201).json(result.body))
      .catch(error => logger.error(error.message))
  })

  module.exports = blogRouter