import axios from 'axios'

import { API_URL } from 'constant'

export const acceptStatus = async (id: number): Promise<string> => {
  try {
    const formData = new FormData()

    const acceptRequest = await axios.post(
      `${API_URL}/request/accept/${id}`,
      formData,
      {}
    )

    return acceptRequest.data
  } catch (e) {
    return 'Gagal'
  }
}
