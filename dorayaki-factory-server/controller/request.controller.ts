import { Status } from '@prisma/client'
import { RequestHandler } from 'express'
import apicache from 'apicache'

import { StatusCodes } from 'http-status-codes'
import { INTERNAL_SERVER_ERROR } from '../constant'
import { sendMail } from '../utils/mail'

const addRequest: RequestHandler = (req, res) => {
  apicache.clear('request')
  const data = req.body
  const prisma = req.prisma

  prisma.request
    .create({
      data: { ...data, timestamp: new Date(data.timestamp) },
    })
    .then((response) => res.status(StatusCodes.ACCEPTED).send(response))
    .catch(function (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: data,
        error: error,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
    })
}

const getAllRequest: RequestHandler = (req, res) => {
  req.apicacheGroup = 'request'

  const prisma = req.prisma
  return prisma.request
    .findMany({})
    .then((result) => res.status(StatusCodes.OK).send(result))
    .catch(() =>
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'error',
      })
    )
}

const acceptRequest: RequestHandler = (req, res) => {
  apicache.clear('request')
  apicache.clear('bahanbaku')

  const id = parseInt(req.params.id)
  const prisma = req.prisma
  prisma.request
    .update({
      where: { id: id },
      data: { status: Status.ACCEPTED },
    })
    .then((response) => res.status(StatusCodes.ACCEPTED).send(response))
    .catch((err) =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'error',
        error: err,
      })
    )
}

const rejectRequest: RequestHandler = (req, res) => {
  apicache.clear('request')

  const id = parseInt(req.params.id)

  const prisma = req.prisma
  prisma.request
    .update({
      where: { id: id },
      data: { status: Status.REJECTED },
    })
    .then((response) => res.status(StatusCodes.ACCEPTED).send(response))
    .catch(() =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'error',
      })
    )
}

const testMailer: RequestHandler = (req, res) => {
  sendMail('hokkyss2@gmail.com', 'test', 'HALO')
    .then((mail) => res.status(201).send({ message: 'OK' }))
    .catch((e) => res.status(500).send(INTERNAL_SERVER_ERROR))
}

const test: RequestHandler = (req, res) => {
  const prisma = req.prisma
  const id = 5
  prisma.dorayaki
    .findUnique({
      where: {
        id: id,
      },
      include: {
        bahan: true,
      },
    })
    .then((response) => {
      if (response) {
        res.status(StatusCodes.OK).send(response)
      } else {
        res.status(StatusCodes.OK).json({ message: 'not found' })
      }
    })
    .catch((err) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
    })
}

export const request = {
  addRequest,
  acceptRequest,
  rejectRequest,
  getAllRequest,
  test,
  testMailer,
}
