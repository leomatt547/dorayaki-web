import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const createDorayaki = async (
  nama: string,
  image: File
): Promise<Dorayaki | null> => {
  try {
    const formData = new FormData()
    formData.append('nama', nama)
    formData.append('image', image)

    const dorayaki = await axios.post<Dorayaki>(`${API_URL}/resep`, formData, {
      headers: {
        Authorization: GetToken(),
        'Content-Type': 'application/json',
      },
    })

    return dorayaki.data
  } catch (e) {
    return null
  }
}
