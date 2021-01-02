import mongoose from 'mongoose'

const ingresoSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    persona: {
        type: mongoose.Types.ObjectId,
        ref: 'persona',
        required: true
    },
    tipo_comprobante:{
        type: String,
        maxlength: 20,
        required: true
    },
    serie_comprobante:{
        type: String,
        maxlength: 10,
        required: true
    },
    numero_comprobante:{
        type: String,
        maxlength: 10,
        required: true
    },
    impuesto:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    estado:{
        type: Number,
        default: 1
    },
    detalles:[{ // relacion embebida
        _id:{
            type: String,
            required: true
        },
        articulo:{
            type: String,
            required: true
        },
        cantidad:{
            type: Number,
            required: true
        },
        precio:{
            type: Number,
            required: true
        }
    }]
},{
    timestamps: true
})

const Ingresos = mongoose.model('ingresos',ingresoSchema)

export default Ingresos