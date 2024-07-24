import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_BASE_URL

export const logout = async () => {
  try {
    const token = localStorage.getItem('authToken')

    if (token) {
      await axios.post(
        `${apiBaseUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      localStorage.removeItem('authToken')
    }
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
