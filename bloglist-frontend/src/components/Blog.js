import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'
import useField from '../hooks'

const Blog = ({ blogs, currentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  const { reset: resetComment, ...comment } = useField('text')

  const handleDelete = (blog) => {
    if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleSubmit = (event, blog) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    resetComment()
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}{' '}
      </h2>
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
      <br />
      <h2>comments</h2>
      <form onSubmit={(event) => handleSubmit(event, blog)}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Blog
