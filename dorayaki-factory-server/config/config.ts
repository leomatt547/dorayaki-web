import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export const MYSQL = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
}

export const SERVER_HOSTNAME = process.env.HOST
export const SERVER_PORT = process.env.PORT

export const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET
