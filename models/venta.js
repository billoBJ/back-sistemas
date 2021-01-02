import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
    usuario:{
        type: mongoose.Types.ObjectId, 
        ref: 'usuario',required:true
    },
    persona:{ 
        type: mongoose.Types.ObjectId, 
        ref: 'persona',
        required:true 
    },
    tipo_comprobante:{
        type:String,
        maxlength:20,
        required:true
    },
    serie_comprobante: { 
        type:String,
        maxlength:7
    },
    numero_comprobante: { 
        type:String,
        maxlength:10,
    },
    impuesto:{ 
        type:Number,
        required:true
    },
    total:{ 
        type:Number,
        required:true
    },
    detalles: [{
        _id:{
            type:String,
            required:true
        },
        articulo:{
            type:String,
            required:true
        },
        cantidad:{
            type:Number,
            required:true
        },
        precio:{
            type:Number,
            required:true
        },
        descuento:{
            type:Number,
            required:true
        }
    }],
    estado: { 
        type:Number,
        default:1
    },
},{
    timestamps: true
});
const Venta = mongoose.model('venta',ventaSchema);
export default Venta;