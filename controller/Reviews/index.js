import client from "../../db/index.js"

export const createReview=async(req,res)=>{
    try{
        const {review,userId,rating}=req.body
        const {productId}=req.params
        const reviewExist=await client.review.findMany({
            where:{
                userId:userId,
                productId:productId
            }
        })
        if(reviewExist.length>0){
            return res.status(400).json({error:"Review already exists",review:reviewExist})
        }
        else{
            const newReview=await client.review.create({
                data:{
                    review:review,
                    user:{
                        connect:{
                            id:userId
                        }
                    },
                    product:{
                        connect:{
                            id:productId
                        }
                    },
                    rating:rating
                }
            })
            res.status(201).json(newReview)
        }
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }   
}


export const getReviewsByProduct=async(req,res)=>{
    try{
        const {productId}=req.params
        const reviewsExist=await client.review.findMany({
            where:{
                productId:productId
            }
        })
        if(!reviewsExist){
            return res.status(404).json([])
        }
        else{
            res.status(201).json(reviewsExist)
        }
    }   
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}