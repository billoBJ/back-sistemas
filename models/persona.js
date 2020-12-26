import mongoose from 'mongoose'

const personaSchema = new mongoose.Schema({
    tipo: { 
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
        required:true
    },
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
    },
    estado: { 
        type:Number, 
        default:1
    }
},{
    timestamps: true
})

const Persona = mongoose.model('persona',personaSchema);
export default Persona;