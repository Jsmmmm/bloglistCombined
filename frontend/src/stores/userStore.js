import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {
  getUser,
  saveUser,
  removeUser
} from '../services/persistentUser'

const useUserStore = create((set) => ({

  user: null,

  initUser: () => {
    const user = getUser()
    if (user) {
      blogService.setToken(user.token)
      set({ user })
    }
  },

  login: async ({ username, password }) => {
    const user = await loginService.login({
      username,
      password
    })
    saveUser(user)
    blogService.setToken(user.token)
    set({ user })
    return user
  },

  logout: () => {
    removeUser()
    blogService.setToken(null)
    set({ user: null })
  }
  
}))

export default useUserStore