import tokenService from '../services/token'

export default{
    verifyUser: async (req,res,next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            })
        }

        const response = await tokenService.decode(req.headers.token)

        if(response.rol == 'Administrador' ||
           response.rol == 'Stock' ||
           response.rol == 'Vendedor'){

            next()
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyAdministrador: async (req,res,next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            })
        }

        const response = await tokenService.decode(req.headers.token)

        if(response.rol == 'Administrador'){

            next()
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyStock: async (req,res,next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            })
        }

        const response = await tokenService.decode(req.headers.token)

        if(response.rol == 'Administrador' ||
           response.rol == 'Stock'){

            next()
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    },
    verifyVendedor: async (req,res,next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'No Token'
            })
        }

        const response = await tokenService.decode(req.headers.token)

        if(response.rol == 'Administrador' ||
           response.rol == 'Vendedor'){

            next()
        }else{
            return res.status(403).send({
                message: 'No autorizado'
            })
        }
    }


}