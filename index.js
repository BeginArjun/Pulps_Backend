import express, { json } from 'express'
import userRoutes from './routes/User/index.js'
import productRoutes from './routes/Product/index.js'
import reviewRoutes from './routes/Review/index.js'

const app=express()

const PORT=process.env.PORT || 3000

app.use(json())

app.use('/api/user/',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/reviews',reviewRoutes)

app.listen(PORT,()=>{
    console.log("hello")
    
})