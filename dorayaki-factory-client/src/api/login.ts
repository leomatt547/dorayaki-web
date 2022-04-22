import axios from 'axios'

import { API_URL } from 'constant'

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const token = (
      await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      })
    ).data

    document.cookie = `webadutToken=${token.data.token};path='/'`
    document.cookie = `webadutRToken=${token.data.refreshToken};path='/'`
    return { nama: token.data.name, email: token.data.email }
  } catch (e) {
    return { nama: '', email: '' }
  }
}
