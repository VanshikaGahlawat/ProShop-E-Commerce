const asyncHandler= require('express-async-handler')
const Order = require('../models/Order')

//@desc Create new order
//@route Post /api/orders
//@access Private
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

//@desc Get order by id
//@route GET /api/orders/:id
//@access Private
const getOrderById= asyncHandler( async (req,res) =>{

    const order= await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else{
        res.status(404).json({msg: 'Order Not found'})
    }
    
        
})
 
//@desc Update order to Paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid= asyncHandler( async (req,res) =>{

    const order= await Order.findById(req.params.id)

    if(order){
        order.isPaid= true
        order.paidAt= Date.now()
        order.paymentResult= {
            id:req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder= await order.save()
        res.json(updatedOrder)
    } else{
        res.status(404).json({msg: 'Order Not found'})
    }
    
        
})

//@desc Get current user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders= asyncHandler( async (req,res) =>{

    const orders= await Order.find({user: req.user._id})

    res.json(orders)
        
})

module.exports = {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders}