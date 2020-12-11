import mongoose from 'mongoose'

const categoriasSchema = new mongoose.Schema({
    nombre:{
        type: String,
        maxlength: 50,
        unique: true,
        required: true
    },
    descripcion:{
        type: String,
        maxlength: 200,
        required: true
    },
    estado:{
        type: Number,
        default: 1
    }
},{
    timestamps: true
})

const Categorias = mongoose.model('categoria',categoriasSchema);

export default Categorias;