import routerx from 'express-promise-router'
import articulosController from '../controllers/articuloController'

const router = routerx()

router.post('/add',articulosController.add )
router.get('/query',articulosController.query )
router.get('/list',articulosController.list )
router.put('/update',articulosController.update )
router.delete('/remove',articulosController.remove)
router.put('/activate',articulosController.activate)
router.put('/deactivate',articulosController.desactivate)

export default router