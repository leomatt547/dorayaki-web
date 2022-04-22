import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const getBahanBaku = async (): Promise<BahanBaku[]> => {
  try {
    const bahanbaku = await axios.get<BahanBaku[]>(`${API_URL}/bahan`, {
      headers: {
        Authorization: GetToken(),
        'Content-Type': 'application/json',
      },
    })

    return bahanbaku.data
  } catch (e) {
    return []
  }
}
