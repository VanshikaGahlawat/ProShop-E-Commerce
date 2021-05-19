const express = require('express');
const dotenv = require('dotenv')
const connectDB = require("./config/db")
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')

dotenv.config();
connectDB();

const app= express();

app.get('/', (req,res)=>{
    res.send("Api running...")
})

app.use('/api/products',productRoutes)

const PORT= process.env.PORT || 5000;
app.listen( PORT, ()=>{
    console.log("Server running".green.bold);
})