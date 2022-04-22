import { Status } from '@prisma/client'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import apicache from 'apicache'

/// Validate request
export const verifyRequest: RequestHandler = (req, res, next) => {
  apicache.clear('bahanbaku')
  apicache.clear('request')

  const idreq = parseInt(req.params.id)
  const prisma = req.prisma
  prisma.request
    .findUnique({
      where: {
        id: idreq,
      },
    })
    .then((response) => {
      if (response) {
        const jml = response.stok
        const iddora = response.id_dorayaki
        prisma.dorayaki
          .findUnique({
            where: {
              id: iddora,
            },
            include: {
              bahan: {
                include: {
                  bahanBaku: true,
                },
              },
            },
          })
          .then((response) => {
            if (response) {
              res.locals.request = { ...response }
              res.locals.request2 = { jml }
              next()
            } else {
              res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: 'Dorayaki id invalid or status is invalid' })
            }
          })
          .catch((err) =>
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
          )
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid request ID' })
      }
    })
    .catch((err) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error looking up requests', error: err })
    })
}
