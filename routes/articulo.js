import routerx from 'express-promise-router'
import articulosController from '../controllers/articuloController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyStock, articulosController.add )
router.get('/query',auth.verifyStock,articulosController.query )
router.get('/list',auth.verifyStock,articulosController.list )
router.put('/update',auth.verifyStock,articulosController.update )
router.delete('/remove',auth.verifyStock,articulosController.remove)
router.put('/activate',auth.verifyStock,articulosController.activate)
router.put('/deactivate',auth.verifyStock,articulosController.desactivate)

export default router