import client from '../../db/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const authUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await client.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user){
            return res.status(401).json({error:'Invalid Credentials: User does not exist'})
        }
        else{
            const isPass=await bcrypt.compare(password,user.password)
            if(isPass){
                const token=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{
                    expiresIn: 30 * 24 * 60 * 60 * 1000,
                  })
                res.cookie("jwt", token, { maxAge: 30 * 24 * 60 * 60, httpOnly: true });
                res.status(200).json({status:"ok"})
            }
            else{
                return res.status(401).json({error:'Invalid Credentials ',isPass})
            }
        }
    }
    catch(err){
        return res.status(500).json({err:err.stack})
    }
}

export const getAllUser=async(req,res)=>{
    try{
        const users=await client.user.findMany()
        res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json({err:'Server Error'})
    }
}

export const getUserById=async(req,res)=>{
    const {userId}=req.params
    try{
        const user=await client.user.findUnique({
            where:{
                id:userId
            },
            include:{
                reviews:true,
                orders:true,
                cart:true,
                profile:true
            }
        })
        if(!user){
            return res.status(404).json({err:'User Not Found'})
        }
        res.status(201).json(user)
    }
    catch(err){
        return res.status(500).json({err:'Server Error'})
    }
}


export const createUser=async(req,res)=>{
    const {
        name,
        email,
        password,
        phoneNo,
        address
    }=req.body
    try{
        const userExist=await client.user.findUnique({
            where:{
                email:email
            }
        })
        if(userExist){
            return res.status(401).json({error:'User Exists'})
        }
        else{
            const data={name,email,phoneNo,password:await bcrypt.hash(password,10),address:address?address:null}
            const user=await client.user.create({
                include:{
                    profile:true,
                    cart:true
                },
                data:{
                    ...data,
                    profile:{
                        create:{}
                    },
                    cart:{
                        create:{}
                    },
                }
            })

            let token=jwt.sign({id:user.id},process.env.JWT_SECRET_KEY, {
                expiresIn: 30 * 24 * 60 * 60 * 1000,
              })

            res.cookie("jwt",token,{ maxAge: 30 * 24 * 60 * 60, httpOnly: true })

            res.status(201).json(user)
        }
    }
    catch(err){
        return res.status(500).json({err:err.stack})
    }
}

export const updateUser=async(req,res)=>{
    try{
        const {userId}=req.params
        const userExist=await client.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!userExist){
            return res.status(404).json({error:'User does not Exist'})
        }
        else{
            const {
                name,
                email,
                phoneNo,
                password,
                address,
            }=req.body
            const userDataToUpdate={}
            if(email){
                const isEmailTaken=await client.user.findUnique({
                    where:{
                        email:email
                    }
                })
                if(isEmailTaken){
                    return res.status(401).json({error:'Email Already Taken'})
                }
                else{
                    userDataToUpdate.email=email
                }
            }
            if(name){
                userDataToUpdate.name=name
            }
            if(address){
                userDataToUpdate.address=address
            }
            if(phoneNo){
                userDataToUpdate.phoneNo=phoneNo
            }
            if(password){
                userDataToUpdate.password=password
            }

            const updatedUser=await client.user.update({
                where:{
                    id:userId
                },
                data:userDataToUpdate
            })
            res.status(201).json(updateUser)
            
        }
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const getCurrentUser=async(req,res)=>{
    const {id}=req.user
    try{
        const user=await client.user.findUnique({
            where:{
                id:id
            },
            include:{
                profile:true,
                favourites:true,
            }
        })
        res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}