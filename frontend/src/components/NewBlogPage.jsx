import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'

import useBlogStore from '../stores/blogStore'
import useNotificationStore from '../stores/notificationStore'

const NewBlogPage = () => {
  const navigate = useNavigate()

  const createBlog = useBlogStore(
    state => state.createBlog
  )

  const setNotification = useNotificationStore(
    state => state.setNotification
  )

  const handleCreate = async (blogData) => {
    try {
      await createBlog(blogData)

      setNotification('Added new blog', 'success')

      navigate('/blogs')

    } catch {
      setNotification('error creating blog', 'error')
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <BlogForm onCreate={handleCreate} />
    </div>
  )
}

export default NewBlogPage