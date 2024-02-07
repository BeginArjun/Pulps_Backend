import client from "../../db/index.js";

export const getCartItems=async(req,res)=>{
    const {id}=req.user
    try{
        const cart=await client.cart.findUnique({
            where:{
                userId:id
            },
            include:{
                cartItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
        res.status(200).json(cart)
    }
    catch(err){
        return res.status(500).json({error:err.message,id})
    }
}

export const addCart=async(req,res)=>{
    try{
        const {cart}=req.user
        const {product}=req.query
        const newCart=await client.cart.update({
            where:{
                id:cart.id
            },
            data:{
                cartItems:{
                    create:{
                        quantity:1,
                        product:{
                            connect:{id:product}
                        }
                    }
                }
            },
            include:{
                cartItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
        return res.status(200).json(newCart)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}


export const updateCart=async(req,res)=>{
    try{
        const {cart}=req.user
        const {itemId,qty}=req.query 
        if(qty==0 && itemId){
            const newCart=await client.cartItems.delete({
                where:{
                    id:itemId,
                    cartId:cart.id
                }
            })
            return res.status(200).json(newCart)
        }
        const newCart=await client.cartItems.update({
            where:{
                id:itemId
            },
            data:{
                quantity:parseInt(qty)
            }
        })
        return res.status(200).json(newCart)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const deleteCart=async(req,res)=>{
    try{
        const {id}=req.user
        const {itemId}=req.query
        const newCart=await client.cartItems.delete({
            where:{
                id:itemId,
                userId:id
            }
        })
        return res.status(200).json(newCart)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}