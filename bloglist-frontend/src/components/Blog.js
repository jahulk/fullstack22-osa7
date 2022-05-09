import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!visible) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setVisible(true)}>view</button>
        </p>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setVisible(false)}>hide</button>
      </p>
      <p>{blog.url}</p>
      <p className="bloglikes">
        {blog.likes}{' '}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      {blog.user && blog.user.username === currentUser.username && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )
}

export default Blog
