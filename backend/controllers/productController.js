const asyncHandler=  require('express-async-handler')
const Product = require('../models/Product')

// @desc fetch all products
// @route GET /api/products
// @access Public
const getProducts= asyncHandler( async (req,res) =>{
    const pageSize= 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
    res.json({products, page, pages: Math.ceil(count/ pageSize)});
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

// @desc Delete a product
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

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'sample name',
        user:req.user.id,
        price: 0,
        image:'/images/sample.jpg',
        description:'sample description',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews:0
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

    const {name, description, image, price, brand, category, countInStock} = req.body
    
    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.image = image
        product.description = description
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404).json({message:'Product not found'})
    }
})

// @desc Add a review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {

    const {rating, comment} = req.body
    
    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewd){
            res.status(400).json({message:'already reviewed'})
        }

        const review = {
            name: req.user.name,
            user: req.user._id,
            rating: Number(rating),
            comment
        }

        product.reviews.push(review)
        product.numReviews= product.reviews.length
        product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message:'Review Created'})
        
    }else{
        res.status(404).json({message:'Product not found'})
    }
})

module.exports = {getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview}