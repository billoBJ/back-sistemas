import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
// instalar dotoenv 

import router from './routes'

// conexion a la DB 
//mejorar 
const dbUrl = 'mongodb://localhost:27017/appSistema'
mongoose.connect(dbUrl, {useCreateIndex:true ,useNewUrlParser: true,useUnifiedTopology: true}).then(moongose => {
    console.log('Conexion a la DB exitosa')
}).catch(error => {
    console.log('Error: '+ error)
})


const app = express()

app.use(morgan('dev') )
app.use(cors())
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }) )
app.use(express.static(path.join(__dirname,'public'))) // especificamos el directorio estatico

app.use('/api',router)
app.set('port',process.env.PORT || 3000)

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

app.listen( app.get('port') , ()=>{
    console.log(`server listening en port: `+ app.get('port'))
})