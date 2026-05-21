import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })

    setUsername('')
    setPassword('')
  }  

  return ( 
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          login
        </Button>

      </form>
    </div>
  )
}

export default LoginForm