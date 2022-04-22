import { Router } from 'express'

import { request } from '../controller'
import { verifyBahanBaku, verifyRequest } from '../middlewares'

const requestRoute = Router()

requestRoute.get('', request.getAllRequest)
requestRoute.post('', request.addRequest)
requestRoute.post(
  '/accept/:id',
  verifyRequest,
  verifyBahanBaku,
  request.acceptRequest
)
requestRoute.post('/reject/:id', request.rejectRequest)

export default requestRoute
