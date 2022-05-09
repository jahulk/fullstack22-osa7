import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers, setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const blogFormRef = useRef()

  if (!users.currentUser) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Notification />
        <Menu currentUser={users.currentUser} />
        <Routes>
          <Route path="/users/:id" element={<User users={users.users} />} />
          <Route path="/users" element={<UserList users={users.users} />} />
          <Route
            path="/blogs/:id"
            element={<Blog blogs={blogs} currentUser={users.currentUser} />}
          />
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <BlogList blogs={blogs} />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm />
                </Togglable>
                <BlogList blogs={blogs} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
