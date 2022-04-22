import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const logout = async (): Promise<void> => {
  try {
    document.cookie = `webadutToken='';path='/'`
    document.cookie = `webadutRToken='';path='/'`
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: GetToken(),
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (e) {
    //
  }
}
