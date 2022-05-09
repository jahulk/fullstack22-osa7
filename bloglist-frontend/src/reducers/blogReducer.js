import { createSlice } from '@reduxjs/toolkit'
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
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

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
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export default blogSlice.reducer
