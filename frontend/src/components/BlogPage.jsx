import { useParams } from 'react-router-dom'
import useBlogStore from '../stores/blogStore'
import useNotificationStore from '../stores/notificationStore'

import {
  Container,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Link,
  Box
} from '@mui/material'

const BlogPage = ({ user }) => {
  const { id } = useParams()

  const blog = useBlogStore(state =>
    state.blogs.find(b => b.id === id)
  )

  const likeBlog = useBlogStore(state => state.likeBlog)
  const deleteBlog = useBlogStore(state => state.deleteBlog)
  const setNotification = useNotificationStore(state => state.setNotification)

  if (!blog) return <Container>Blog not found</Container>

  const isOwner =
    user &&
    blog.user &&
    (user.id === blog.user.toString?.() || user.id === blog.user.id)

  const handleLike = async () => {
    try {
      await likeBlog(blog.id)
    } catch {
      setNotification('error liking blog', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteBlog(blog.id)
      setNotification('Blog removed', 'success')
    } catch {
      setNotification('error deleting blog', 'error')
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4">{blog.title}</Typography>

          <Typography variant="subtitle1" color="text.secondary">
            by {blog.author}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Link href={blog.url} target="_blank" rel="noopener">
              {blog.url}
            </Link>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography>Likes: {blog.likes}</Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          {user && (
            <Button variant="contained" size="small" onClick={handleLike}>
              Like
            </Button>
          )}

          {isOwner && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Remove
            </Button>
          )}
        </CardActions>
      </Card>
    </Container>
  )
}

export default BlogPage