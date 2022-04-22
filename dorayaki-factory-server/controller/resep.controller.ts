import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import apicache from 'apicache'

const getDorayaki: RequestHandler = (req, res) => {
  req.apicacheGroup = 'dorayaki'
  const prisma = req.prisma

  prisma.dorayaki
    .findMany({})
    .then((dorayaki) =>
      res.status(StatusCodes.OK).send(
        dorayaki.map((dorayaki) => ({
          ...dorayaki,
          photo: `${req.protocol}://${req.headers.host}/static/${dorayaki.photo}`,
        }))
      )
    )
    .catch(() =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'error',
      })
    )
}

const getResep: RequestHandler = (req, res) => {
  req.apicacheGroup = `resep-${req.params.id}`
  const prisma = req.prisma
  const id = parseInt(req.params.id) || 0

  prisma.dorayaki
    .findFirst({
      where: {
        id: id,
      },
      include: {
        bahan: {
          select: {
            bahanBaku: true,
            jumlah: true,
          },
        },
      },
    })
    .then((result) => {
      if (result)
        return res.status(StatusCodes.OK).send({
          ...result,
          photo: `${req.protocol}://${req.headers.host}/static/${result.photo}`,
        })
      return res.status(StatusCodes.NOT_FOUND).send({
        message: 'Not Found',
      })
    })
    .catch(() =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'error',
      })
    )
}

const createDorayaki: RequestHandler = (req, res) => {
  apicache.clear('dorayaki')
  const prisma = req.prisma
  const nama = req.body.nama
  const image = req.file ? req.file : null

  prisma.dorayaki
    .findFirst({
      where: {
        nama: nama,
      },
    })
    .then((exist) => {
      if (exist) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Dorayaki exists',
        })
      }

      return prisma.dorayaki
        .create({
          data: {
            nama: nama,
            photo: image ? image.filename : 'default.jpg',
          },
        })
        .then((dorayaki) =>
          res.status(StatusCodes.CREATED).send({
            ...dorayaki,
            photo: `${req.protocol}://${req.headers.host}/static/${dorayaki.photo}`,
          })
        )
        .catch(() =>
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            message: 'error',
          })
        )
    })
    .catch(() =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'error',
      })
    )
}

const addToResep: RequestHandler = (req, res) => {
  apicache.clear(`resep-${req.params.id}`)

  const prisma = req.prisma
  const resepId = parseInt(req.params.id) || 0
  const bahanId = parseInt(req.body.bahan) || 0
  const jumlah = parseInt(req.body.jumlah) || 0

  prisma.dorayaki
    .findFirst({
      where: {
        id: resepId,
      },
    })
    .then((exists) => {
      if (exists) {
        return prisma.bahanBaku
          .findFirst({
            where: {
              id: bahanId,
            },
          })
          .then((bahanExists) => {
            return bahanExists
              ? prisma.bahan
                  .create({
                    data: {
                      dorayakiId: resepId,
                      bahanBakuId: bahanId,
                      jumlah: jumlah,
                    },
                  })
                  .then((resep) => res.status(StatusCodes.CREATED).send(resep))
              : res.status(StatusCodes.NOT_FOUND).json({
                  message: 'Bahan not found',
                })
          })
          .catch(() =>
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: 'Internal Server Error',
            })
          )
      } else {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'Dorayaki not found',
        })
      }
    })
}

export const resep = {
  getDorayaki,
  getResep,
  createDorayaki,
  addToResep,
}
