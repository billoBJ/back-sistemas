import routerx from 'express-promise-router'
import ventaController from '../controllers/ventaController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyVendedor , ventaController.add )
router.get('/query',auth.verifyVendedor, ventaController.query )
router.get('/list',auth.verifyVendedor, ventaController.list )
router.put('/deactivate',auth.verifyVendedor, ventaController.desactivate)

export default router