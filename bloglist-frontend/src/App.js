import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogit = useSelector((state) => state.blogs)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotification = (type, content) => {
    dispatch(setNotification(content, type, 3))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      displayNotification('error', error.response.data.error)
      console.log(error)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        displayNotification('message', 'blog removed')
      }
    } catch (error) {
      displayNotification('error', error.response.data.error)
      console.log(error)
    }
  }

  const likeBlog = async (blog) => {
    try {
      const blogObject = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null,
      }

      const updatedBlog = await blogService.update(blog.id, blogObject)
      const updatedBlogs = [...blogs].map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {[...blogit]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default App
