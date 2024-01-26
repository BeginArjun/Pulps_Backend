import client from "../../db/index.js";

export const getCartItems=async(req,res)=>{
    const {id}=req.params
    try{
        const cart=await client.cart.findUnique({
            where:{
                id:id
            }
        })
        res.status(200).json(cart)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}