const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/User')
const Product = require('./models/Product')
const Order = require('./models/Order')
const connectDB = require('./config/db')

dotenv.config();
connectDB();

const importData= async () =>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdusers = await User.insertMany(users)
        const adimnuser= createdusers[0]._id
        const sampleProducts= products.map( p => {
            return {...p, user:adimnuser}
        }) 
        await Product.insertMany(sampleProducts)

        console.log("Data imported".green.inverse);
        process.exit()

    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
    
}

const destroyData = async () =>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log("Data destroyed".red.inverse);
        process.exit()

    } catch (err) {
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}

if(process.argv[2]=== '-d'){
    destroyData()
} else importData()