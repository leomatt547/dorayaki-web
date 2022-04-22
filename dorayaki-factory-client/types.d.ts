/**
 * Model User
 *
 */
type User = {
  email: string
  nama: string
}

/**
 * Model BahanBaku
 *
 */
type BahanBaku = {
  id: number
  nama: string
  stok: number
}

/**
 * Model Dorayaki
 *
 */
type Dorayaki = {
  id: number
  nama: string
  photo: string
}

/**
 * Model Bahan
 *
 */
type Bahan = {
  jumlah: number
  dorayakiId: number
  bahanBakuId: number
}

/**
 * Model Request
 *
 */
type RequestDorayaki = {
  id: number
  ip: string
  endpoint: string
  id_dorayaki: number
  stok: number
  username: string
  timestamp: Date
  status: Status
}

/**
 * Model LogRequest
 *
 */
type LogRequest = {
  id: number
  ip: string
  endpoint: string
  timestamp: Date
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

const Status: {
  ACCEPTED: 'ACCEPTED'
  WAITING: 'WAITING'
  REJECTED: 'REJECTED'
}

type Status = typeof Status[keyof typeof Status]
