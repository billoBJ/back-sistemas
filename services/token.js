import jwt from 'jsonwebtoken'
import usuarios from '../models/usuarios'

async function checkToken(token){
    let __id = null
    try{
        const {_id} = await jwt.decode(token)

        __id = _id

    }catch(error){

        return false
    }

    const user = await usuarios.findOne({_id:__id, estado: 1})

    if(user){
        const secretKey = process.env.JWT_SECRET_KEY || 'secretKey123' 

        const  token = await jwt.sign({_id:__id }, secretKey,{expiresIn: '1d'})
    
        return {token, rol: user.rol}
    }else{

        return false
    }

}

export default{
    encode: async (_id) =>{
        const secretKey = process.env.JWT_SECRET_KEY || 'secretKey123'

        const token = await jwt.sign({_id: _id},secretKey,{ expiresIn:'1d' } )

        return token
    },
    decode: async(token) =>{
        try{
            const secretKey = process.env.JWT_SECRET_KEY || 'secretKey123'

            const {_id} = await jwt.verify(token,secretKey)

            const user = await usuarios.findOne({_id: _id, estado: 1})

            if(user){

                return user
            }else{
                
                return false
            }

        }catch(error){
            const newToken = await checkToken(token)

            return newToken
        }
    }
}