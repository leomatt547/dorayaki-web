import axios from 'axios'

import { API_URL } from 'constant'

export const getRequest = async (): Promise<RequestDorayaki[]> => {
  try {
    const request = await axios.get<RequestDorayaki[]>(`${API_URL}/request`, {})

    return request.data
  } catch (e) {
    return []
  }
}
