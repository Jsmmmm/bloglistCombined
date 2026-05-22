const STORAGE_KEY = 'loggedBlogAppUser'

export const getUser = () => {
  const loggedUserJSON =
    window.localStorage.getItem(STORAGE_KEY)

  if (!loggedUserJSON) {
    return null
  }

  return JSON.parse(loggedUserJSON)
}

export const saveUser = (user) => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  )
}

export const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}