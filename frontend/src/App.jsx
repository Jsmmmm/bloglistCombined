import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'
import useBlogStore from './stores/blogStore'
import Blogs from './components/Blogs'
import BlogPage from './components/BlogPage'
import LoginForm from './components/LoginForm'
import NewBlogPage from './components/NewBlogPage'
import Notification from './components/Notification'
import useNotificationStore from './stores/notificationStore'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {

  const [user, setUser] = useState(null)
  const blogs = useBlogStore(state => state.blogs)

  const fetchBlogs = useBlogStore(
    state => state.fetchBlogs
  )

  const setNotification = useNotificationStore(
    state => state.setNotification
  )

  const navigate = useNavigate()

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      setNotification( 'wrong credentials','error' )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setNotification('Logged out', 'success' )
  }

  const padding = {
    padding: 5
  }
  
  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <div>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit"  component={Link} to="/blogs" sx={style}>Blogs</Button>
              <Button color="inherit"  component={Link} to="/blogs/new" sx={style}>New Blog</Button>
              {!user && (
                <Button color="inherit" component={Link} to="/login" sx={style}>Login</Button>
              )}
              {user && (
                <button style={padding} onClick={handleLogout}>Logout</button>
              )}
            </Toolbar>
          </AppBar>
        </div>
        <Routes>
          <Route path="/blogs" element={
            <Blogs blogs={blogs}/>
          } />
          <Route path="/login" element={
            <LoginForm onLogin={handleLogin}/> 
          } />
          <Route path="/" element={<Blogs blogs={blogs} />} />

          <Route path="/blogs/:id" element={
            <BlogPage user={user}/>
          } />

          <Route
            path="/blogs/new" element={
              user
                ? <NewBlogPage />
                : <LoginForm onLogin={handleLogin} />
            }
          />

        </Routes>
        <div>
          <Notification />
          
          {user && (
            <div>
              <p>{user.name} logged in</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default App