import personas from '../models/persona'

export default{
    add:async (req,res,next) =>{
        try{ 
            const persona = await personas.create(req.body)
            

            res.status(200).json(persona)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    query:async (req,res,next) =>{
        try{
            const per = await personas.findOne({ _id: req.query._id })

            if(!per){
                res.status(404).send({
                    message:'El registro no existe'
                })
            }else{
                res.status(200).json(per)
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
            const user = await usuario.find({$or:[{'nombre':new RegExp(valor,'i')},
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
    listClientes:async (req,res,next) =>{
        try{
            let valor = req.query.valor
            // "i" establece que la busqueda tome coincidencias entre mayusculas y minusculas
            const user = await usuario.find({$or:[{'nombre':new RegExp(valor,'i')},
            {'email':new RegExp(valor,'i')}],'tipo': 'Cliente' } ,{createdAt:0,updatedAt:0})
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
    listProveedores:async (req,res,next) =>{
        try{
            let valor = req.query.valor
            // "i" establece que la busqueda tome coincidencias entre mayusculas y minusculas
            const user = await usuario.find({$or:[{'nombre':new RegExp(valor,'i')},
            {'email':new RegExp(valor,'i')}],'tipo': 'Proveedor' } ,{createdAt:0,updatedAt:0})
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
            const per = await personas.findByIdAndUpdate({_id: req.body._id},
                {   tipo: req.body.tipo,
                    nombre: req.body.nombre,
                    tipo_documento: req.body.tipo_documento,
                    num_documento: req.body.num_documento,
                    direccion: req.body.direccion,
                    telefono:req.body.telefono,
                    estado: req.body.estado
                }) 
            res.status(200).json(per)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    remove:async (req,res,next) =>{
        try{
            const per = await personas.findByIdAndDelete({_id: req.body._id})
            
            res.status(200).json(per)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    activate:async (req,res,next) =>{
        try{
            const per = await personas.findByIdAndUpdate({_id: req.body._id},{estado: 1}) 
            res.status(200).json(per)
        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    deactivate:async (req,res,next) =>{
        try{
            const per = await personas.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            res.status(200).json(per)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
}