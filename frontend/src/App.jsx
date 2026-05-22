import { useEffect } from 'react'
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
import './index.css'
import useUserStore from './stores/userStore'

const App = () => {
  
  const blogs = useBlogStore(state => state.blogs)
  const initBlogs = useBlogStore(state => state.initBlogs)

  const user = useUserStore(state => state.user)
  const login = useUserStore(state => state.login)
  const logout = useUserStore(state => state.logout)
  const initUser = useUserStore(state => state.initUser)

  const setNotification = useNotificationStore(state => state.setNotification)

  const navigate = useNavigate()

  useEffect(() => {
    initBlogs()
  }, [])

  useEffect(() => {
    initUser()
  }, [])


  const handleLogin = async ({ username, password }) => {
    try {
      await login({ username, password })
      navigate('/')
    } catch (error) {
      setNotification(
        error.response?.data?.error || 'wrong credentials',
        'error'
      )
    }
  }

  const handleLogout = () => {
    logout()
    setNotification('Logged out', 'success')
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