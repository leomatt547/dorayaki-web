import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { INTERNAL_SERVER_ERROR } from '../constant'

const jwtSecret: string = process.env.SECRET || ''
const jwtRefreshSecret: string = process.env.REFRESH_TOKEN_SECRET || ''
const jwtExpiry = 86400
const jwtRefreshExpiry = 86400 * 2

const me: RequestHandler = (req, res) => {
  const prisma = req.prisma
  const email = res.locals.auth.email

  prisma.user
    .findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        nama: true,
      },
    })
    .then((user) => res.status(StatusCodes.OK).send(user))
    .catch(() =>
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_ERROR)
    )
}

const register: RequestHandler = (req, res) => {
  const prisma = req.prisma
  const user = req.body
  prisma.user
    .findUnique({
      where: {
        email: user.email,
      },
    })
    .then(function (response) {
      if (response) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'User already exist!' })
      } else {
        const pass = bcrypt.hashSync(user.password, 14)
        user.password = pass
        return prisma.user
          .create({ data: user })
          .then(function (response) {
            const email = response.email
            const nama = response.nama
            if (jwtSecret) {
              const token = jwt.sign({ email, nama }, jwtSecret, {
                expiresIn: jwtExpiry,
                algorithm: 'HS256',
              })
              return res
                .status(StatusCodes.OK)
                .cookie('token', token, {
                  expires: new Date(Date.now() + jwtExpiry),
                  secure: false,
                  httpOnly: true,
                })
                .json({
                  message: 'Successfully added user',
                  data: { email: email, nama: nama },
                  token: token,
                })
            } else {
              return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: 'JWT Secret not found' })
            }
          })
          .catch((error) =>
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'Failed to add user', error: error })
          )
      }
    })
    .catch((error) =>
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to lookup user on register', error: error })
    )
}

const login: RequestHandler = (req, res) => {
  const prisma = req.prisma
  const user = req.body
  prisma.user
    .findUnique({
      where: {
        email: user.email,
      },
    })
    .then(function (response) {
      if (response) {
        if (bcrypt.compareSync(user.password, response.password)) {
          const email = response.email
          const nama = response.nama
          if (jwtSecret && jwtRefreshExpiry) {
            const token = jwt.sign({ email, nama }, jwtSecret, {
              expiresIn: jwtExpiry,
              algorithm: 'HS256',
            })
            const refreshToken = jwt.sign({ email, nama }, jwtRefreshSecret, {
              expiresIn: jwtRefreshExpiry,
              algorithm: 'HS256',
            })
            res
              .status(StatusCodes.CREATED)
              .cookie('token', token, {
                expires: new Date(Date.now() + jwtRefreshExpiry),
              })
              .cookie('refreshToken', refreshToken, {
                expires: new Date(Date.now() + jwtRefreshExpiry),
              })
              .json({
                message: 'Successfully logged in',
                data: {
                  email: email,
                  nama: nama,
                  token: token,
                  refreshToken: refreshToken,
                },
              })
          } else {
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .json({ message: 'JWT Secret not found' })
          }
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Invalid password' })
        }
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' })
      }
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to lookup user on login', error: error })
    })
}

const logout: RequestHandler = (req, res) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ', 2)[0]
    : ''

  if (token) {
    res
      .status(StatusCodes.NO_CONTENT)
      .cookie('token', '', {
        expires: new Date(Date.now() + 1),
        secure: false,
        httpOnly: true,
      })
      .end()
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not yet logged in' })
  }
}

const refreshToken: RequestHandler = (req, res) => {
  const [token, refreshToken] = req.headers.authorization
    ? req.headers.authorization.split(' ', 2)
    : ['', '']

  if (refreshToken && jwtRefreshSecret != '') {
    jwt.verify(
      refreshToken,
      jwtRefreshSecret,
      { complete: true },
      (err, decoded) => {
        if (err) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: 'Invalid refresh token', error: err })
        } else if (decoded) {
          const email = decoded.payload.email
          const nama = decoded.payload.nama
          const newToken = jwt.sign({ email, nama }, jwtSecret)
          res.status(StatusCodes.OK).cookie('token', newToken, {
            expires: new Date(Date.now() + jwtExpiry),
            secure: false,
            httpOnly: true,
          })
        } else {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Failed to decode refresh token' })
        }
      }
    )
  } else {
    res
      .send(StatusCodes.BAD_REQUEST)
      .json({ message: 'Token not found in cookies' })
  }
}

export const auth = { me, register, login, logout, refreshToken }
