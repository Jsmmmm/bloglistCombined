import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm'

const NewBlogPage = ({ onCreate }) => {
  const navigate = useNavigate()

  const handleCreate = async (blogData) => {
    await onCreate(blogData)
    navigate('/blogs')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <BlogForm onCreate={handleCreate} />
    </div>
  )
}

export default NewBlogPage