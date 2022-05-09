import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import axios from 'axios'

const initialState = {
  currentUser: null,
  users: [],
}

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
    setCurrentUser(state, action) {
      return { ...state, currentUser: action.payload }
    },
    removeCurrentUser(state) {
      return { ...state, currentUser: null }
    },
  },
})

export const { setUsers, setCurrentUser, removeCurrentUser } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users')
      dispatch(setUsers(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(setCurrentUser(user))
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        ...credentials,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    } catch (error) {
      dispatch(setNotification('error', 'wrong username or password', 3))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeCurrentUser())
  }
}

export default userSlice.reducer
