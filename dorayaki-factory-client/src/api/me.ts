import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const me = async (): Promise<User> => {
  try {
    const result = await axios.get<User>(`${API_URL}/auth/me`, {
      headers: {
        Authorization: GetToken(),
        'Content-Type': 'application/json',
      },
    })
    return result.data
  } catch (e) {
    return { nama: '', email: '' }
  }
}
