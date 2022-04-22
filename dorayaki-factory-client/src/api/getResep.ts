import axios from 'axios'

import { API_URL } from 'constant'
import { GetToken } from 'utils'

export const getResep = async (
  dorayakiId: number
): Promise<
  (Dorayaki & { bahan: { bahanBaku: BahanBaku; jumlah: number }[] }) | null
> => {
  try {
    const resep = await axios.get<
      Dorayaki & { bahan: { bahanBaku: BahanBaku; jumlah: number }[] }
    >(`${API_URL}/resep/${dorayakiId}`, {
      headers: {
        Authorization: GetToken(),
        'Content-Type': 'application/json',
      },
    })

    console.log(resep.data)

    return resep.data
  } catch (e) {
    return null
  }
}
