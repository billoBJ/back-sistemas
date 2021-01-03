import ventas from '../models/venta'
import articulos from '../models/articulos'

async function aumentarStock(articuloID, cantidad){
    let { stock } = await ventas.findOne({_id: articuloID })
    let newStock = parseInt( stock) + parseInt( cantidad)

    const registro = await ventas.findByIdAndUpdate({_id: articuloID}, {stock: newStock })
}

async function restarStock(articuloID, cantidad){
    //a Mejorar: revisar que al disminuir el stock no quede negativo.
    let { stock } = await ventas.findOne({_id: articuloID })
    let newStock = parseInt( stock) - parseInt( cantidad)

    const registro = await ventas.findByIdAndUpdate({_id: articuloID}, {stock: newStock })
}

export default{
    add:async (req,res,next) =>{
        try{
            const venta = await ventas.create(req.body)
            //actualizo el stock
            let detalles = req.body.detalles

            detalles.map(function(det){
                restarStock(det._id, det.cantidad )
            })

            res.status(200).json(venta)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    query:async (req,res,next) =>{
        try{
            const venta = await (await ventas.findOne({ _id: req.query._id })).populate('usuario',{nombre:1}).populate('persona',{nombre:1})
            if(!venta){
                res.status(404).send({
                    message:'El registro no existe'
                })
            }else{
                res.status(200).json(venta)
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
            const venta = await ventas.find($or[{numero_comprobante : new RegExp(valor, 'i')},{serie_comprobante : new RegExp(valor, 'i')}],{updatedAt:0})
            .sort({nombre: 1 })
            .populate('usuario',{nombre:1})
            .populate('persona',{nombre:1})

            res.status(200).json(venta)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    desactivate:async (req,res,next) =>{
        try{
            const venta = await ventas.findByIdAndUpdate({_id: req.body._id},{estado: 0}) 
            //Restamos el error
            let detalle = venta.detalles
            detalle.map(function(det){
                aumentarStock(det._id, det.cantidad )
            })




            res.status(200).json(venta)

        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    },
    graficos12meses:async(req,res,next) => {
        try{
            const venta = await ventas.aggregate(
                [
                    {
                        $group:{
                            _id: {
                                mes:{$month: 'ceatedAt' },
                                year:{$year: 'ceatedAt' }
                            },
                            total:{
                                $sum:'$total',
                            },
                            numero:{
                                $sum:1
                            }
                        }
                    },
                    {
                        sort:{
                            "_id.year":-1,
                            "_id.mes":-1
                        }
                    }
                ]
            ).limit(12)

            res.status(200).json(venta);
        }catch(error){
            res.status(500).send({
                message:'Ocurrio un error'
            })
            next(error)
        }
    }
}