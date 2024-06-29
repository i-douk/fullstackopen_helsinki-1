const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root',
                              name: 'Superuser',
                              passwordHash
                          })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'ihssandk',
        name: 'Ihssan D',
        password: 'dookan',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })
  })

// 4.8: Blog List Tests, step 1
describe('blogs are returned as json', () => {
    test('checks content type is returned as application/json with regex', async () => {
        await api
        .get('/api/blog')
        .expect(201)
        .expect('Content-Type', /application\/json/)
      })
  })

// 4.9: Blog List Tests, step 2
describe('the unique identifier property of the blog is named id', () => {
    test('creates new and checks that new return id as id', () =>{
      const blog =  new Blog({
        "title": "Is quantum computing merely a passing hype",
        "author": "Kali",
        "url": "http://yeahsure",
        "likes":8
      });
      assert.ok(blog.id);
    })
})


// 4.10: Blog List Tests, step 3
describe('a valid blog can be added', () => {
    test('creates new obj and checks content of last added and length of db ', async () => {
      const newBlog = {
        "title": "Is quantum computing merely a passing hype",
        "author": "Kali",
        "url": "http://yeahsure",
        "likes":8,
        "user": "660251eb24c24e576b6c764b"
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
  })
  
//4.11*: Blog List Tests, step 4
describe('if the likes property is not attributed, assign 0', () => {
  test('creates obj with missing likes and checks returned obj has 0 likes', async () => {
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
})

// 4.12*: Blog List tests, step 5
describe('if url or title are missing retur 400 Bad request', () => {
    test('creates two obj with missing title and url and checks reponse status', async () => {
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
  })
})

// 4.13 Blog List Expansions, step 1
describe('a blog is deleted successfully', () => {
  test('creates new obj and deletes it and checks status 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blog/${blogToDelete.id}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
  })
})

// 4.14 Blog List Expansions, step 2
describe('a blog is updated successfully', () => {
  test('creates new obj and deletes it and checks status 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogUpdate = blogsAtStart[0]
      await api
        .put(`/api/blog/${blogUpdate.id}`)
        .send({
          "title": "Is quantum computing merely a passing hype",
          "author": "Kali",
          "url": "http://yeahsure",
          "likes":8
        })
        .expect(200)
        const updatedBlog = await helper.blogInDb(blogUpdate.id);
        assert.strictEqual(updatedBlog.title, "Is quantum computing merely a passing hype");
        assert.strictEqual(updatedBlog.author, "Kali");
        assert.strictEqual(updatedBlog.url, "http://yeahsure");
        assert.strictEqual(updatedBlog.likes, 8);
      })
    })
    
    after(async () => {
        await mongoose.connection.close()
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