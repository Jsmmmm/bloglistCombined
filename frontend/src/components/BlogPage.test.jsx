import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import BlogPage from './BlogPage'
import blogService from '../services/blogs'

// mock useParams
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' })
}))

// mock blogService
vi.mock('../services/blogs')

const mockBlog = {
  id: '123',
  title: 'Test Blog',
  author: 'John Doe',
  url: 'http://example.com',
  likes: 5,
  user: {
    username: 'john'
  }
}

describe('BlogPage', () => {
  beforeEach(() => {
    blogService.getById.mockResolvedValue(mockBlog)
  })

  test('1. shows blog info but no buttons when user not logged in', async () => {
    render(<BlogPage user={null} onLike={vi.fn()} onDelete={vi.fn()} />)

    await waitFor(() => {
      expect(screen.getByText('Test Blog')).toBeInTheDocument()
    })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('http://example.com')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()

    // buttons should NOT exist
    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('2. logged in user sees like button', async () => {
    const user = { username: 'someone' }

    render(<BlogPage user={user} onLike={vi.fn()} onDelete={vi.fn()} />)

    await screen.findByText('Test Blog')

    expect(screen.getByText('like')).toBeInTheDocument()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('3. blog creator sees remove button', async () => {
    const user = { username: 'john' } // same as blog.user.username

    render(<BlogPage user={user} onLike={vi.fn()} onDelete={vi.fn()} />)

    await screen.findByText('Test Blog')

    expect(screen.getByText('like')).toBeInTheDocument()
    expect(screen.getByText('remove')).toBeInTheDocument()
  })
})