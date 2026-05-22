import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'

const useUserStore = create((set) => ({

  user: null,

  initUser: async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          set({user})
          blogService.setToken(user.token)
      }
  },

  login: async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    ) 
    blogService.setToken(user.token)
    set({user})
    return user
  },

  logout: () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    set({ user: null })
  }
  
}))

export default useUserStore