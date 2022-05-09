import { Link } from 'react-router-dom'

const UserList = (props) => {
  const { users } = props
  return (
    <div>
      <h1>users</h1>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {[...users].map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length ? user.blogs.length : 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
