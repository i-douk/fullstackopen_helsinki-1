const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) =>  {
  logger.info(`Getting blogs via HTTP GET request`)
  const blogs = await Blog.find({})
  response.status(201).json(blogs)
  })

  blogRouter.get('/:id', async (request, response) =>  {
  logger.info(`Getting specific blog via HTTP GET request`)
  const blog = await Blog.findById(request.params.id)
  response.status(201).json(blog)
  })

  
blogRouter.post('/', async (request, response) => {
  const body = request.body

  // Check if required properties are present in the request body
  if (!body || !body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'Missing required fields' });
  }
  let newBlog = []
  if(!body.likes){
  newBlog = new Blog({
    title: body.title,
    author: body.author,
    likes: 0,
    url: body.url
  })} else {

  newBlog = new Blog({
  title: body.title,
  author: body.author,
  likes: 0,
  url: body.url
})}

  await newBlog.save()
  response.status(201).json(newBlog)
  
})

module.exports = blogRouter