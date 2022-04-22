import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

import { UNAUTHORIZED_MESSAGE } from '../constant'

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ', 2)[0]
    : ''
  if (token) {
    if (process.env.SECRET) {
      jwt.verify(
        token,
        process.env.SECRET,
        {
          algorithms: ['HS256'],
        },
        (err, decoded) => {
          if (err) {
            if (err?.name == jwt.TokenExpiredError.name) {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .send(UNAUTHORIZED_MESSAGE)
            } else {
              return res
                .status(StatusCodes.UNAUTHORIZED)
                .send(UNAUTHORIZED_MESSAGE)
            }
          }
          res.locals.auth = { ...decoded }
          next()
        }
      )
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).send(UNAUTHORIZED_MESSAGE)
  }
}
