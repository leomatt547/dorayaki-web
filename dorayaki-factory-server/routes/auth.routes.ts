import { Router } from 'express'

import { auth } from '../controller'
import { verifyToken } from '../middlewares'

const authRoute = Router()

authRoute.get('/me', verifyToken, auth.me)
authRoute.post('/login', auth.login)
authRoute.post('/logout', auth.logout)
authRoute.post('/register', auth.register)
authRoute.get('/token', auth.refreshToken)

export default authRoute
