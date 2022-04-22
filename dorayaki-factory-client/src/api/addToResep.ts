import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const addToResep = async (
  dorayakiId: number,
  bahanId: number,
  jumlah: number
): Promise<Bahan | null> => {
  try {
    const bahan = await axios.post<Bahan>(
      `${API_URL}/resep/${dorayakiId}`,
      {
        bahan: bahanId,
        jumlah: jumlah,
      },
      {
        headers: {
          Authorization: GetToken(),
          'Content-Type': 'application/json',
        },
      }
    )
    return bahan.data
  } catch (e) {
    return null
  }
}
