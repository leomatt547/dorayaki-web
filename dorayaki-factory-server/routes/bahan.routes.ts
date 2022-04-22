import { Router } from 'express'

import { bahan } from '../controller'

const bahanRoute = Router()

bahanRoute.get('/', bahan.getAllBahanBaku)
bahanRoute.post('/', bahan.createBahanBaku)
bahanRoute.post('/update', bahan.updateStokBahanBaku)

export default bahanRoute
