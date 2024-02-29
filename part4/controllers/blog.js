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
  
    // Check if required properties are present in the request body
    if (!body || !body.title || !body.author || !body.likes || !body.url) {
      return response.status(400).json({ error: 'Missing required fields' });
    }
  
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url
    })
  
    newBlog
      .save()
      .then(result => response.status(201).json(result))
      .catch(error => logger.error(error.message));
  })

module.exports = blogRouter