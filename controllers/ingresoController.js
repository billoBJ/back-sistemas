import ingresos from '../models/ingreso'
import articulos from '../models/articulos'

async function aumentarStock(articuloID, cantidad){
    let { stock } = await articulos.findOne({_id: articuloID })
    let newStock = parseInt( stock) + parseInt( cantidad)

    const registro = await articulos.findByIdAndUpdate({_id: articuloID}, {stock: newStock })
}

async function restarStock(articuloID, cantidad){
    //a Mejorar: revisar que al disminuir el stock no quede negativo.
    let { stock } = await articulos.findOne({_id: articuloID })
    let newStock = parseInt( stock) - parseInt( cantidad)

    const registro = await articulos.findByIdAndUpdate({_id: articuloID}, {stock: newStock })
}

export default{
    add:async (req,res,next) =>{
        try{
            const ingreso = await ingresos.create(req.body)
            //actualizo el stock
            let detalles = req.body.detalles

            detalles.map(function(det){
                aumentarStock(det._id, det.cantidad )
            })

            res.status(200).json(ingreso)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    query:async (req,res,next) =>{
        try{
            const ingresos = await (await ingresos.findOne({ _id: req.query._id })).populate('usuario',{nombre:1}).populate('persona',{nombre:1})
            if(!ingresos){
                res.status(404).send({
                    message:'El registro no existe'
                })
            }else{
                res.status(200).json(ingresos)
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
            const ingreso = await ingresos.find($or[{numero_comprobante : new RegExp(valor, 'i')},{serie_comprobante : new RegExp(valor, 'i')}],{createdAt:0,updatedAt:0})
            .sort({nombre: 1 })
            .populate('usuario',{nombre:1})
            .populate('persona',{nombre:1})

            res.status(200).json(ingreso)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    activate:async (req,res,next) =>{
        try{
            const ingreso = await ingresos.findByIdAndUpdate({_id: req.body._id},{estado: 1}) 
            //actualizo el stock
            let detalles = ingreso.detalles
            detalles.map(function(det){
                aumentarStock(det._id, det.cantidad )
            })


            res.status(200).json(ingreso)
        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    desactivate:async (req,res,next) =>{
        try{
            const ingreso = await ingresos.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            //Restamos el error
            let detalle = ingreso.detalles
            detalle.map(function(det){
                restarStock(det._id, det.cantidad )
            })




            res.status(200).json(ingreso)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
}