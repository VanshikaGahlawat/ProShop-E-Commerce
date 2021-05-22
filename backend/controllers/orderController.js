const asyncHandler= require('express-async-handler')
const Order = require('../models/Order')

const addOrderItems= asyncHandler( async (req,res) =>{
    const {orderItems, shippingAddress, totalPrice, shippingPrice, taxPrice, paymentMethod } = req.body

    

    if(orderItems && orderItems.length ===0){
        res.status(400).json({msg: 'Add items to order'})
    }
    else{
        const newOrder = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            totalPrice, 
            shippingPrice, 
            taxPrice, 
            paymentMethod
        })
        const createdOrder = await newOrder.save()
        res.status(201).json(createdOrder)
    }
    
})
 
module.exports = {addOrderItems}