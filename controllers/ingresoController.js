//import models from '../models' -- se puede utilizar models.categorias 
import ingresos from '../models/ingreso'

export default{
    add:async (req,res,next) =>{
        try{
            const cat = await ingresos.create(req.body)

            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    query:async (req,res,next) =>{
        try{
            const cat = await (await ingresos.findOne({ _id: req.query._id })).populate('usuario',{nombre:1}).populate('persona',{nombre:1})
            if(!cat){
                res.status(404).send({
                    message:'El registro no existe'
                })
            }else{
                res.status(200).json(cat)
            }

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    list:async (req,res,next) =>{
        try{
            let valor = req.query.valor
            // "i" establece que la busqueda tome coincidencias entre mayusculas y minusculas
            const cat = await ingresos.find($or[{numero_comprobante : new RegExp(valor, 'i')},{serie_comprobante : new RegExp(valor, 'i')}],{createdAt:0,updatedAt:0})
            .sort({nombre: 1 })
            .populate('usuario',{nombre:1})
            .populate('persona',{nombre:1})

            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    activate:async (req,res,next) =>{
        try{
            const cat = await ingresos.findByIdAndUpdate({_id: req.body._id},{estado: 1}) 
            res.status(200).json(cat)
        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    desactivate:async (req,res,next) =>{
        try{
            const cat = await ingresos.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
}