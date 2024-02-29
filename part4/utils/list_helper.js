const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  likesArray = blogs.map(blog => Number(blog.likes))
  return likesArray.reduce((acc,curr) => acc + curr, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  likesArray = blogs.map(blog => Number(blog.likes))
  const findMaxIndex = likesArray.indexOf(maxLikes)
  return {
    title:blogs[findMaxIndex].title,
    author:blogs[findMaxIndex].author,
    likes:blogs[findMaxIndex].likes
  }
}

const mostBlogs = (blogs) => {
  const totalBlogs = _.groupBy(blogs, 'author');
  const maxBlogsAuthor = _.maxBy(Object.keys(totalBlogs), author => totalBlogs[author].length);
  const maxBlogsCount = totalBlogs[maxBlogsAuthor].length;
  return { author: maxBlogsAuthor, blogs: maxBlogsCount };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}