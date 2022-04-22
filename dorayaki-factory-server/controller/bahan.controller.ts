import { RequestHandler } from 'express'
import apicache from 'apicache'
import { StatusCodes } from 'http-status-codes'
import logger from '../config/logger'
import P from 'pino'

const getAllBahanBaku: RequestHandler = (req, res) => {
  req.apicacheGroup = 'bahanbaku'

  const prisma = req.prisma
  return prisma.bahanBaku
    .findMany({})
    .then((result) => res.status(StatusCodes.OK).send(result))
    .catch((err) =>
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Error getting all bahan baku',
        error: err,
      })
    )
}

const createBahanBaku: RequestHandler = (req, res) => {
  apicache.clear('bahanbaku')
  const data = req.body
  const prisma = req.prisma

  prisma.bahanBaku
    .create({
      data: data,
    })
    .then((bahan) => res.status(StatusCodes.CREATED).send(bahan))
    .catch((err) =>
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'error creating bahan baku',
        error: err,
      })
    )
}

const updateStokBahanBaku: RequestHandler = (req, res) => {
  apicache.clear('bahanbaku')
  const data = req.body
  const id = data.id
  const stok = data.stok
  const prisma = req.prisma
  prisma.bahanBaku
    .findUnique({
      where: {
        id: id,
      },
    })
    .then((response) => {
      if (response) {
        prisma.bahanBaku
          .update({
            where: { id: id },
            data: {
              stok: stok,
            },
          })
          .then((response) => {
            res.status(StatusCodes.ACCEPTED).json({
              message: 'Successfully updated stock bahan baku',
              response: response,
            })
          })
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid bahan baku ID' })
      }
    })
    .catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to lookup bahan baku with that ID',
        error: err,
      })
    })
}

export const bahan = { getAllBahanBaku, createBahanBaku, updateStokBahanBaku }
