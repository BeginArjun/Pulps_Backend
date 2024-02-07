import { create } from 'domain';
import client from '../../db/index.js';

export const addFavourite = async (req, res) => {
    try{
        const {id}=req.user
        const {productId}=req.query
        const user=await client.user.findUnique({
            where:{
                id:id,
                favourites:{
                    some:{
                        id:productId
                    }
                }
            },
        })
        if(user){
            return res.status(400).json({message:"Product already in favourites"})
        }
        const updatedUser=await client.user.update({
            where:{
                id:id
            },
            data:{
                favourites:{
                    create:{
                        product:{
                            connect:{
                                id:productId
                            }
                        }
                    }
                }
            },
            include:{
                favourites:{
                    include:{
                        product:true
                    }
                }
            }
        })
        return res.status(201).json(updatedUser)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err.stack})
    }
}

export const getFav=async(req,res)=>{
    const {id}=req.user
    try{
        const user=await client.user.findUnique({
            where:{
                id:id
            },
            include:{
                favourites:{
                    include:{
                        product:true
                    }
                }
            }
        })
        res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

export const deleteFav=async(req,res)=>{
    const {id}=req.user
    const {productId}=req.query
    try{
        const updatedUser=await client.user.update({
            where:{
                id:id,
            },
            data:{
                favourites:{
                    deleteMany:{
                        productId:productId
                    }
                }
            },
            include:{
                favourites:{
                    include:{
                        product:true
                    }
                }
            }
        })
        res.status(201).json(updatedUser)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}