import routerx from 'express-promise-router'
import articulosController from '../controllers/articuloController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyStock, articulosController.add )
router.get('/query',auth.verifyVendedor,articulosController.query )
router.get('/query/codigo',auth.verifyUser,articulosController.queryBarCode )
router.get('/list',auth.verifyVendedor,articulosController.list )
router.put('/update',auth.verifyVendedor,articulosController.update )
router.delete('/remove',auth.verifyStock,articulosController.remove)
router.put('/activate',auth.verifyStock,articulosController.activate)
router.put('/deactivate',auth.verifyStock,articulosController.desactivate)

export default router