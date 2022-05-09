import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = ({ blogs, currentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const handleDelete = (blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}{' '}
      </h1>
      <p>{blog.url}</p>
      <p className="bloglikes">
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </p>
      {blog.user && blog.user.username === currentUser.username && (
        <p>
          added by {blog.user.username}
          <button onClick={() => handleDelete(blog)}>remove</button>
        </p>
      )}
    </div>
  )
}

export default Blog
