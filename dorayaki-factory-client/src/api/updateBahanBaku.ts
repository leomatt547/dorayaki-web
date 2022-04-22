import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const updateBahanBaku = async (
  bahanBakuId: number,
  stok: number
): Promise<BahanBaku | null> => {
  try {
    const bahanBaku = await axios.post<BahanBaku>(
      `${API_URL}/bahan/update`,

      {
        id: bahanBakuId,
        stok: stok,
      },
      {
        headers: {
          Authorization: GetToken(),
          'Content-Type': 'application/json',
        },
      }
    )
    return bahanBaku.data
  } catch (e) {
    return null
  }
}
