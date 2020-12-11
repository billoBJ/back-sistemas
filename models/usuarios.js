import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    rol: { 
        type:String,
        maxlength:30, 
        required:true
    },
    username:{
        type:String,
        unique: true,
        maxlength: 20,
        required: true
    },
    nombre: { 
        type:String,
        maxlength:50, 
        required:true},
    tipo_documento: { 
        type:String,
        maxlength:20
    },
    num_documento: { 
        type:String,
        maxlength:20
    },
    direccion: { 
        type:String, 
        maxlength:70
    },
    telefono: { 
        type:String, 
        maxlength:20
    },
    email: { 
        type:String, 
        maxlength:50, 
        unique:true, 
        required:true
    },
    password: { 
        type:String, 
        maxlength:64, 
        required:true
    },
    estado: { 
        type:Number, 
        default:1
    }
},{
    timestamps: true
})

const Usuario = mongoose.model('usuario',usuarioSchema);
export default Usuario;