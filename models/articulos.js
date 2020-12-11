import mongoose from 'mongoose'

const articuloSchema = new mongoose.Schema({
    codigo:{
        type: String,
        maxlength: 65
    },
    nombre:{
        type: String,
        maxlength: 50,
        unique: true,
        required: true,
    },
    descripcion:{
        type: String,
        maxlength: 255,
    },
    precio_venta:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    estado:{
        type: Number,
        default: 1
    },
    categoria:{
        type: mongoose.Types.ObjectId,
        ref: 'categorias'
    }
},{
    timestamps: true
})

const Articulos = mongoose.model('articulos',articuloSchema)

export default Articulos