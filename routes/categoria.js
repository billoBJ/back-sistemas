import routerx from 'express-promise-router'
import categoriasController from '../controllers/categoriaController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyStock, categoriasController.add )
router.get('/query',auth.verifyStock,categoriasController.query )
router.get('/list',auth.verifyStock,categoriasController.list )
router.put('/update',auth.verifyStock,categoriasController.update )
router.delete('/remove',auth.verifyStock,categoriasController.remove)
router.put('/activate',auth.verifyStock,categoriasController.activate)
router.put('/deactivate',auth.verifyStock,categoriasController.desactivate)

export default router