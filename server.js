import express, { json } from 'express'
import userRoutes from './routes/User/index.js'
import productRoutes from './routes/Product/index.js'
import reviewRoutes from './routes/Review/index.js'
import profileRoutes from './routes/Profile/index.js'
import cartRoutes from './routes/Cart/index.js'
import orderRoutes from './routes/Order/index.js'
import favouriteRoutes from './routes/Favourite/index.js'
import dotenv from 'dotenv'

dotenv.config()
const app=express()

const PORT=process.env.PORT || 3000

app.use(json())

app.use('/api/user/',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/favourite',favouriteRoutes)

app.listen(PORT,()=>{
    console.log("hello",process.env.JWT_SECRET_KEY)   
})