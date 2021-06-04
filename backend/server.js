const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
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

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

const _dirname = path.resolve()
app.use('/uploads', express.static(path.join(_dirname,'/uploads')))

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, '/frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(_dirname, 'forntend', 'build', 'index.html')))
} else{
    app.get('/', (req,res)=>{
        res.send("Api running...")
    })    
}

const PORT= process.env.PORT || 5000;
app.listen( PORT, ()=>{
    console.log("Server running".green.bold);
})