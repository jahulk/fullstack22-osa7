import { useDispatch } from 'react-redux'
import useField from '../hooks'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username: username.value, password: password.value }))
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id="username" name="username" {...username} />
        </div>
        <div>
          password
          <input id="password" name="password" {...password} />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
