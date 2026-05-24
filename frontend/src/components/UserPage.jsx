// UserPage.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const UserPage = () => {
  const { id } = useParams()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getById(id)
      setUser(user)
    }
    fetchUser()
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>Added blogs</h3>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage