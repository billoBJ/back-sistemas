import routerx from 'express-promise-router'
import ingresoController from '../controllers/ingresoController'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add',auth.verifyVendedor , ingresoController.add )
router.get('/query',auth.verifyVendedor, ingresoController.query )
router.get('/list',auth.verifyVendedor, ingresoController.list )
router.put('/activate',auth.verifyVendedor, ingresoController.activate)
router.put('/deactivate',auth.verifyVendedor, ingresoController.desactivate)
router.get('/estadisticas',auth.verifyUser, ingresoController.graficos12meses )

export default router