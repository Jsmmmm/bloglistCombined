import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material'

const UsersPage = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getAll()
      setUsers(users)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>

              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs created</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersPage