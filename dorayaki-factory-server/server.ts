/* eslint-disable no-console */
const DEV = process.env.NODE_ENV === 'development'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
dotenvExpand(dotenv.config({ path: '.env' }))

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import apicache from 'apicache'
import morgan from 'morgan'
import logger from './config/logger'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// Routes
import authRoute from './routes/auth.routes'
import bahanRoute from './routes/bahan.routes'
import resepRoute from './routes/resep.routes'
import requestRoute from './routes/request.routes'

const cache = apicache.options({
  statusCodes: {
    include: [200],
  },
}).middleware

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use('/static', cache('24 days'), express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use((_req, res, next) => {
  res
    .header('Access-Control-Allow-Headers', 'Origin, Content-type, Accept')
    .header('Content-type', 'application/json')
  next()
})
app.use((req, _res, next) => {
  req.prisma = prisma
  next()
})
app.set('json spaces', 2)

app.use('/auth', authRoute)
app.use('/bahan', cache('24 days'), bahanRoute)
app.use('/resep', cache('24 days'), resepRoute)
app.use('/request', cache('24 days'), requestRoute)

// Must be final route
app.use('*', (_req, res) =>
  res.status(404).send({ error: 'Endpoint not found or method unavailable!' })
)

const PORT = parseInt(process.env.PORT || '0') || 8008

app.listen(PORT, () => {
  if (DEV) {
    console.log(
      `Server started on port ${PORT}! Visit http://localhost:${PORT}`
    )
  } else {
    console.log(`Server started on port ${PORT}!`)
  }
})

export default app
