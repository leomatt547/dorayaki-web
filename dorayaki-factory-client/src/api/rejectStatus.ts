import axios from 'axios'

import { API_URL } from 'constant'

export const rejectStatus = async (id: number): Promise<string> => {
  try {
    const formData = new FormData()

    const rejectRequest = await axios.post(
      `${API_URL}/request/reject/${id}`,
      formData,
      {}
    )

    return rejectRequest.data
  } catch (e) {
    return 'Gagal'
  }
}
