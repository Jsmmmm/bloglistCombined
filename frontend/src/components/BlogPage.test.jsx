import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BlogPage from './BlogPage'

// mock react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' })
}))

// mock Zustand stores
const mockLikeBlog = vi.fn()
const mockDeleteBlog = vi.fn()
const mockAddComment = vi.fn()
const mockSetNotification = vi.fn()

vi.mock('../stores/blogStore', () => ({
  default: (selector) =>
    selector({
      blogs: [
        {
          id: '123',
          title: 'Test Blog',
          author: 'John Doe',
          url: 'http://example.com',
          likes: 5,
          comments: [],
          user: { id: 'john-id', username: 'john' }
        }
      ],
      likeBlog: mockLikeBlog,
      deleteBlog: mockDeleteBlog,
      addComment: mockAddComment
    })
}))

vi.mock('../stores/notificationStore', () => ({
  default: (selector) =>
    selector({
      setNotification: mockSetNotification
    })
}))

describe('BlogPage', () => {
  test('1. shows blog info but no buttons when user not logged in', () => {
    render(<BlogPage user={null} />)

    expect(screen.getByText('Test Blog')).toBeInTheDocument()
    expect(screen.getByText('by John Doe')).toBeInTheDocument()
    expect(screen.getByText('http://example.com')).toBeInTheDocument()
    expect(screen.getByText('Likes: 5')).toBeInTheDocument()

    expect(screen.queryByText('Like')).toBeNull()
    expect(screen.queryByText('Remove')).toBeNull()
  })

  test('2. logged in user sees like button', () => {
    const user = { id: 'someone' }

    render(<BlogPage user={user} />)

    expect(screen.getByText('Like')).toBeInTheDocument()
    expect(screen.queryByText('Remove')).toBeNull()
  })

  test('3. blog creator sees remove button', () => {
    const user = { id: 'john-id' }

    render(<BlogPage user={user} />)

    expect(screen.getByText('Like')).toBeInTheDocument()
    expect(screen.getByText('Remove')).toBeInTheDocument()
  })
})