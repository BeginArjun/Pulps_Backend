import client from "../../db/index.js";

export const getAllProducts=async(req,res)=>{
    try{
        const products=await client.product.findMany()
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
        const {product,brand,images,price,description,sizes,stock}=req.body 
        const data = { product, brand, images,display_images:images[0], price, description, sizes, stock: stock ? stock : 1 }
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
                product: {
                    contains:name,
                    mode:'insensitive'
                }
            }
        })
        if (!productExist) {
            return res.status(404).json({ error: 'Product Does not Exist' })
        }
        res.status(201).json(productExist)
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