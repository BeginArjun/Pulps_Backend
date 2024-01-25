import client from '../../db/index.js'

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
        phoneNo
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
            const data={name,email,phoneNo,password}
            const user=await client.user.create({
                data:data
            })
            res.status(200).json(user)
        }
    }
    catch(err){
        return res.status(500).json({err:'Server Error'})
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