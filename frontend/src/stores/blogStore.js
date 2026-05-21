import { create } from 'zustand'
import blogService from '../services/blogs'

const useBlogStore = create((set) => ({

  blogs: [],

  fetchBlogs: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject)

    set((state) => ({
      blogs: state.blogs.concat(newBlog)
    }))
  },

  likeBlog: async (id) => {
    const updatedBlog = await blogService.like(id)

    set((state) => ({
      blogs: state.blogs.map(blog =>
        blog.id === id ? updatedBlog : blog
      )
    }))

    return updatedBlog
  },

  deleteBlog: async (id) => {
    await blogService.remove(id)

    set((state) => ({
      blogs: state.blogs.filter(blog =>
        blog.id !== id
      )
    }))
  }

}))

export default useBlogStore