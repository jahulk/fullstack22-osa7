import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Menu = ({ currentUser }) => {
  const dispatch = useDispatch()

  if (!currentUser) {
    return null
  }

  const divStyle = {
    backgroundColor: '#d3d2d2',
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    marginBottom: 10,
  }

  const padding = {
    paddingRight: 5,
  }

  return (
    <div>
      <div style={divStyle}>
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        <span>{currentUser.username} logged in </span>
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </div>
      <div>
        <h1>blog app</h1>
      </div>
    </div>
  )
}

export default Menu
