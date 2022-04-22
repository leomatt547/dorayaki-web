import { Router } from 'express'
import multer from 'multer'

import { resep } from '../controller'
import { storage } from '../utils/storage'
const resepRoute = Router()

resepRoute.get('', resep.getDorayaki)
resepRoute.get('/:id', resep.getResep)
resepRoute.post(
  '',
  multer({ storage: storage }).single('image'),
  resep.createDorayaki
)
resepRoute.post('/:id', resep.addToResep)

export default resepRoute
