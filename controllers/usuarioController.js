import usuario from '../models/usuarios'
import bcrypt from 'bcryptjs'

export default{
    add:async (req,res,next) =>{
        try{
            req.body.password = await bcrypt.hash(req.body.password,10)
            
            const user = await usuario.create(req.body)
            

            res.status(200).json(user)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    query:async (req,res,next) =>{
        try{
            const art = await usuario.findOne({ _id: req.query._id })
            .populate('categorias',{nombre:1})

            if(!art){
                res.status(404).send({
                    message:'El registro no existe'
                })
            }else{
                res.status(200).json(art)
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
            const user = await usuario.find({$or:[{'username':new RegExp(valor,'i')},
            {'nombre':new RegExp(valor,'i')},
            {'email':new RegExp(valor,'i')}]} ,{createdAt:0,updatedAt:0})
            .populate('categorias',{nombre:1})
            .sort({nombre: 1 })

            res.status(200).json(user)


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
            const user = await usuario.findByIdAndUpdate({_id: req.body._id},
                {   rol: req.body.rol,
                    nombre: req.body.nombre,
                    tipo_documento: req.body.tipo_documento,
                    num_documento: req.body.num_documento,
                    direccion: req.body.direccion,
                    telefono:req.body.telefono,
                    estado: req.body.estado
                }) 
            res.status(200).json(user)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    remove:async (req,res,next) =>{
        try{
            const cat = await usuario.findByIdAndDelete({_id: req.body._id})
            
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
            const cat = await usuario.findByIdAndUpdate({_id: req.body._id},{estado: 1}) 
            res.status(200).json(cat)
        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    deactivate:async (req,res,next) =>{
        try{
            const cat = await usuario.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            res.status(200).json(cat)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
}