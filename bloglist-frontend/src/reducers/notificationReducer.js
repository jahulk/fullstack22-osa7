import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  type: '',
  message: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.content,
      }
    },
    removeMessage(state) {
      return { ...state, message: '', type: '' }
    },
    setTimeId(state, action) {
      return { ...state, id: action.payload }
    },
    resetPreviousTimeout(state) {
      clearTimeout(state.id)
      return state
    },
  },
})

export const { setMessage, removeMessage, setTimeId, resetPreviousTimeout } =
  notificationSlice.actions

export const setNotification = (type, content, time) => {
  return async (dispatch) => {
    dispatch(resetPreviousTimeout())
    dispatch(setMessage({ content, type }))
    const id = setTimeout(() => {
      dispatch(removeMessage())
    }, 1000 * time)
    dispatch(setTimeId(id))
  }
}

export default notificationSlice.reducer
