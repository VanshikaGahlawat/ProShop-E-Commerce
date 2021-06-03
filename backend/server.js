const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

dotenv.config();
connectDB();

const app= express();
app.use(express.json())

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname,'/uploads')))

app.get('/', (req,res)=>{
    res.send("Api running...")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

const PORT= process.env.PORT || 5000;
app.listen( PORT, ()=>{
    console.log("Server running".green.bold);
})