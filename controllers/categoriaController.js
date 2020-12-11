//import models from '../models' -- se puede utilizar models.categorias 
import categorias from '../models/categorias'

export default{
    add:async (req,res,next) =>{
        try{
            const cat = await categorias.create(req.body)

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
            const cat = await categorias.findOne({ _id: req.query._id })
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
            const cat = await categorias.find($or[{nombre : new RegExp(valor, 'i')},{descripcion : new RegExp(valor, 'i')}],{createdAt:0,updatedAt:0}).sort({nombre: 1 })

            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    update:async (req,res,next) =>{
        try{
            //findByIdAndUpdate 1er parametro, el filtro, 2do lo que se actualiza
            const cat = await categorias.findByIdAndUpdate({_id: req.body._id},{nombre: req.body.nombre,descripcion:req.body.descripcion }) 
            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    remove:async (req,res,next) =>{
        try{
            const cat = await categorias.findByIdAndDelete({_id: req.body._id})
            
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
            const cat = await categorias.findByIdAndUpdate({_id: req.body._id},{estado: 1}) 
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
            const cat = await categorias.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
}