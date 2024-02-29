const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

// 4.8: Blog List Tests, step 1
test('blogs are returned as json', async () => {
    await api
    .get('/api/blog')
    .expect(201)
    .expect('Content-Type', /application\/json/)
  })

// 4.9: Blog List Tests, step 2
test('the unique identifier property of the blog is named id', () =>{
  const blog =  new Blog({
    "title": "Is quantum computing merely a passing hype",
    "author": "Kali",
    "url": "http://yeahsure",
    "likes":8
  });
  assert.ok(blog.id);
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

// 4.10: Blog List Tests, step 3

    test('a valid blog can be added ', async () => {
      const newBlog = {
        "title": "Is quantum computing merely a passing hype",
        "author": "Kali",
        "url": "http://yeahsure",
        "likes":8
      }
      await api
      .post('/api/blog')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)
      const titles = blogsAtEnd.map(n =>n.title)
      assert(titles[blogsAtEnd.length-1].includes('quantum computing merely'))
    })
  
//4.11*: Blog List Tests, step 4

  test('if the likes property is not attributed, assign 0', async () => {
    const uncompleteBlog = {
      "title": "Is quantum computing merely a passing hype",
        "author": "Kali",
        "url": "http://yeahsure",
    }
    const returnedObj = await api
    .post('/api/blog')
    .send(uncompleteBlog)
    .expect(201)
    assert.strictEqual(returnedObj.body.likes, 0)
  })

// 4.12*: Blog List tests, step 5

test('if url or title are missing retur 400 Bad request', async () => {
  const blogWoTitle = {
    "author": "Kali",
    "url": "http://yeahsure",
    "likes" : 10
  }

  await api
    .post('/api/blog')
    .send(blogWoTitle)
    .expect(400)

    
  const blogWoUrl = {
    "title": "Is quantum computing merely a passing hype",
    "author": "Kali",
    "likes" : 10
  }

  await api
  .post('/api/blog')
  .send(blogWoUrl)
  .expect(400)

})

//   test('there are six blogs', async () => {
//     const response = await api.get('/api/blog')
//     assert.strictEqual(response.body.length, blogs.length)
//   })
  
//   test('the first note is about React', async () => {
//   const response = await api.get('/api/blog')
//   const titles = response.body.map(e => e.title)
//   assert(titles[0].includes('React'))
// })

//   test('all blogs are returned', async () => {
//     const response = await api.get('/api/blog')
//     assert.strictEqual(response.body.length, helper.blogs.length)})
  
//   test('blog with missing params is not added', async () => {
//     const newBlog = {
//       "title" : "Is quantum computing merely a passing hype",
//       "likes" :8,
//       "url" : "http://yeahsure.com"
//     }
//     await api
//     .post('/api/blog')
//     .send(newBlog)
//     .expect(400)
//     const blogsAtEnd = await helper.blogsInDb()
    
//     assert.strictEqual(blogsAtEnd.length, helper.blogs.length)})
  
    
//     test('a specific blog can be viewed', async () => {
//       const blogsAtStart = await helper.blogsInDb()
      
//       const blogToView = blogsAtStart[0]
      
//       const resulBlog = await api
//       .get(`/api/blog/${blogToView.id}`)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//       assert.deepStrictEqual(resulBlog.body, blogToView)
//     })
    
    after(async () => {
        await mongoose.connection.close()
    })