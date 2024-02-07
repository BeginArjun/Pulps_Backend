import client from "../../db/index.js";

export const getAllProducts=async(req,res)=>{
    try{
        const products=await client.product.findMany({
            include:{
                reviews:{
                    include:{
                        user:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                },
            }
        })
        if(!products){
            return res.status(404).json({error:'No Product Found'})
        }
        res.status(201).json(products)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const createProducts=async(req,res)=>{
    try{
        const {product,brand,display_images,price,description,stock,caption,sale_price}=req.body 
        const data = { sale_price,product, brand, display_images, price, description, stock: stock ? stock : 1,caption:caption?caption:null}
        const products = await client.product.create({
            data: data
        })
        res.status(201).json(products)
            
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const getProductByName=async(req,res)=>{
    try {
        const { name } = req.query
        const productExist = await client.product.findMany({
            where: {
                description: {
                    contains:`_${name}`,
                    mode:'insensitive'
                }
            }
        })
        if (!productExist) {
            return res.status(404).json({ error: 'Product Does not Exist',productExist:productExist })
        }
        res.status(200).json(productExist)
    }
    catch (err) {
        return res.status(500).json({error:err.stack})
    }

}

export const getProductByBrand=async(req,res)=>{
    try{
        const brand=req.query.brand
        const brandExist=await client.product.findMany({
            where:{
                brand:brand
            }
        })
        if(!brandExist){
            return res.status(404).json([])
        }
        else{
            res.status(201).json(brandExist)
        }
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const getProductById=async(req,res)=>{
    try{
        const {productId}=req.params
        const productExist=await client.product.findUnique({
            where:{
                id:productId
            },
            include:{
                reviews:true
            }
        })
        if(!productExist){
            return res.status(404).json({error:'Product Not Found'})
        }
        else{
            res.status(201).json(productExist)
        }
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}

export const getTopProducts=async(req,res)=>{
    try{
        const products=await client.product.findMany({
            orderBy:{
                reviews:{
                    rating:'desc'
                }
            }
        })
        if(!products){
            return res.status(404).json({error:'No Product Found'})
        }
        res.status(200).json(products)
    }
    catch(err){
        return res.status(500).json({error:err.stack})
    }
}