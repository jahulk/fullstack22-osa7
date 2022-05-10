import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    },
    removeBlog(state, action) {
      const blog = action.payload
      return state.filter((b) => b.id !== blog.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogs, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          'message',
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          3
        )
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogObject = {
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : null,
      }
      const updatedBlog = await blogService.update(blog.id, blogObject)
      dispatch(updateBlogs(updatedBlog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog))
      dispatch(setNotification('message', 'blog removed', 3))
    } catch (error) {
      console.log(error)
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/blogs/${blog.id}/comments`, {
        comment,
      })
      dispatch(updateBlogs(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default blogSlice.reducer
