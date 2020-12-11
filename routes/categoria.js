import routerx from 'express-promise-router'
import categoriasController from '../controllers/categoriaController'

const router = routerx()

router.post('/add',categoriasController.add )
router.get('/query',categoriasController.query )
router.get('/list',categoriasController.list )
router.put('/update',categoriasController.update )
router.delete('/remove',categoriasController.remove)
router.put('/activate',categoriasController.activate)
router.put('/deactivate',categoriasController.desactivate)

export default router