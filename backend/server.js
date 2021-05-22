const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config();
connectDB();

const app= express();
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("Api running...")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)

const PORT= process.env.PORT || 5000;
app.listen( PORT, ()=>{
    console.log("Server running".green.bold);
})