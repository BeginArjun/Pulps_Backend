import client from "../db/index.js";
import jwt from "jsonwebtoken"

const User=client.User

const protect=async(req,res,next)=>{
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
            if(!token){
                res.status(409)
                throw new Error('Invalid Credentials')
            }
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

            req.user=await User.findUnique({
                where:{
                    id:decoded.id 
                },
                select:{
                    id:true,
                    email:true,
                    password:false,
                    profile:true,
                    cart:true,
                    favourites:true,
                }
            })

            next()
        }
    }
    catch(err){
        console.error(err,token)
    }
}

export default protect