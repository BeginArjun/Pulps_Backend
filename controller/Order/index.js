import client from "../../db/index.js";


export const createOrder=async(req,res)=>{
    const {orderItems,amount}=req.body
    try{
        const {id}=req.user

        const order=await client.order.create({
            data:{
                user:{
                    connect:{
                        id:id
                    }
                },
                totalAmount:amount,
                orderItems:{
                    create:orderItems.map(item=>({
                        quantity:item.qty,
                        product:{connect:{id:item.productId}}
                    }))
                },
            },
            include:{
                orderItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
        if(!order){
            res.status(404).json({error:"Order not created",orderItems})
        }
        const newCart=await client.cart.update({
            where:{
                userId:id
            },
            data:{
                cartItems:{
                    deleteMany:{}
                }
            }
        })
        res.status(201).json(order)
    }
    catch(err){
        return res.status(500).json({error:err.message,orderItems})
    }
}

export const getOrderById=async(req,res)=>{
    try{    
        const {id}=req.user;
        const order=await client.order.findMany({
            where:{
                userId:id
            },
            include:{
                orderItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
        if(!order){
            return res.status(404).json({error:"Order not found"})
        }
        res.status(200).json(order)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
};
