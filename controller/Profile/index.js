import client from "../../db/index.js";

export const getProfile=async(req,res)=>{
    const {id}=req.params
    try{
        const profile=await client.profile.findUnique({
            where:{
                id:id
            },
            include:{
                user:true
            }
        })
        if(!profile){
            return res.status(404).json({err:'Profile Not Found'})
        }
        res.status(201).json(profile)
    }
    catch(err){
        return res.status(500).json({err:err.stack})
    }
}

