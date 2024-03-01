const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')


// HTTP GET request for all blogs
blogRouter.get('/', async (request, response) =>  {
logger.info(`Getting blogs via HTTP GET request`)
const blogs = await Blog.find({})
response.status(201).json(blogs)
})

// HTTP GET request for one blog
blogRouter.get('/:id', async (request, response) =>  {
logger.info(`Getting specific blog via HTTP GET request`)
const blog = await Blog.findById(request.params.id)
response.status(201).json(blog)
})

// HTTP POST request for a new blog entry
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
 
// HTTP PUT request to update blog in mongodb
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

// HTTP DELETE request to delete blog post
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete((request.params.id).toString())
  response.status(204).end()
})

module.exports = blogRouter