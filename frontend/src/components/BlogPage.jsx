import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

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

const BlogPage = ({ onLike, onDelete, user }) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    blogService.getById(id).then(setBlog)
  }, [id])

  if (!blog) return <Container>Blog not found</Container>

  const isOwner =
    user &&
    blog.user &&
    (user.id === blog.user.toString?.() || user.id === blog.user.id)

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            by {blog.author}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Link href={blog.url} target="_blank" rel="noopener">
              {blog.url}
            </Link>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body1">
              Likes: {blog.likes}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          {user && (
            <Button
              variant="contained"
              size="small"
              onClick={async () => {
                await onLike(blog)
                const refreshed = await blogService.getById(blog.id)
                setBlog(refreshed)
              }}
            >
              Like
            </Button>
          )}

          {isOwner && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onDelete(blog)}
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