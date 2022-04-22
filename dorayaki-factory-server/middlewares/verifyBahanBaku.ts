import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import apicache from 'apicache'

export const verifyBahanBaku: RequestHandler = async (req, res, next) => {
  apicache.clear('bahanbaku')
  apicache.clear('request')

  const bahan = res.locals.request.bahan
  const jml = res.locals.request2.jml
  const prisma = req.prisma
  let isEnough = true
  // Check if jumlah <= stock
  let tmp = 0
  bahan.forEach((el: { bahanBaku: { stok: number }; jumlah: number }) => {
    tmp = el.bahanBaku.stok * jml
    if (el.jumlah > tmp) {
      isEnough = false
    }
  })
  if (!isEnough) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Not enough ingredients in stock!' })
  } else {
    let id = 0
    let stok = 0
    const list: any[] = []
    bahan.forEach(
      (el: { bahanBaku: { stok: any; id: number }; jumlah: any }) => {
        id = el.bahanBaku.id
        stok = el.bahanBaku.stok - el.jumlah * jml
        list.push(
          prisma.bahanBaku.update({
            where: {
              id: id,
            },
            data: {
              stok: stok,
            },
          })
        )
      }
    )
    try {
      await prisma.$transaction(list)
      next()
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'ERROR ON TRANSACTION' })
    }
  }
}
