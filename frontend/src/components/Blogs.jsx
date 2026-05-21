import Blog from './Blog'
import ErrorBoundary from '../ErrorBoundary'

const Blogs = ({ blogs, user, onLike, onDelete }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <ErrorBoundary>
      <div>
        <h2>blogs</h2>
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            onLike={onLike}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
}

export default Blogs