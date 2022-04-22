import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const createBahanBaku = async (
  nama: string,
  stok: number
): Promise<BahanBaku | null> => {
  try {
    const bahanbaku = await axios.post<BahanBaku>(
      `${API_URL}/bahan`,
      {
        nama: nama,
        stok: stok,
      },
      {
        headers: {
          Authorization: GetToken(),
          'Content-Type': 'application/json',
        },
      }
    )

    return bahanbaku.data
  } catch (_) {
    return null
  }
}
