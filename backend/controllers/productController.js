const asyncHandler=  require('express-async-handler')
const Product = require('../models/Product')

// @desc fetch all products
// @route GET /api/products
// @access Public
const getProducts= asyncHandler( async (req,res) =>{
    const products = await Product.find({})
    res.json(products);
})

// @desc fetch product by id
// @route GET /api/products/:id
// @access Public
const getProductById= asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product);
    }
    else {
        res.status(404).json({msg: "Product not found"})
    }
})

// @desc Delete a product by id
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct= asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({message:'Product removed'})
    }
    else {
        res.status(404).json({msg: "Product not found"})
    }
})

module.exports = {getProductById, getProducts, deleteProduct}