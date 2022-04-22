import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const getDorayaki = async (): Promise<Dorayaki[]> => {
  try {
    const dorayaki = await axios.get<Dorayaki[]>(`${API_URL}/resep`, {
      headers: {
        Authorization: GetToken(),
        'Content-Type': 'application/json',
      },
    })

    return dorayaki.data
  } catch (e) {
    return []
  }
}
