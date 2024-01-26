import client from "../../db/index.js";


export const createOrder=async(req,res)=>{
    try{
        const {userId}=req.params
        const {orderItems,amount,productId}=req.body

        const order=await client.order.create({
            data:{
                user:{
                    connect:{
                        id:userId
                    }
                },
                totalAmount:amount,
                orderItems:{
                    create:{...orderItems,product:{connect:{id:productId}}
                },
            }
        }
        })
        res.status(201).json(order)
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
}

export const getOrderById=async(req,res)=>{
    try{    
        const {id}=req.params;
        const order=await client.order.findUnique({
            where:{
                id:id
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true
                    }
                },
                orderItems:true
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
