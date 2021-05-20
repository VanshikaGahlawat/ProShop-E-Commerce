const asyncHandler=  require('express-async-handler')
const User = require('../models/User')
const generateToken =  require('../utils/getToken')

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser= asyncHandler( async (req,res) =>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    } else{
        res.status(401).json({msg:'Invalid email or password'})
    } 
})

// @desc  Register user
// @route POST /api/users
// @access Public
const registerUser= asyncHandler( async (req,res) =>{
    const {name,email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        return res.status(400).json({msg: 'User Already exists'})
    }
    const user= await User.create({
        name,
        email,
        password,
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else{
        res.status(400).json({msg:'Invalid user data'})
    }

})


//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile= asyncHandler( async (req,res) =>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin
        });
    }
    else {
        res.status(404).json('User Not Found')
    }
})

module.exports= {authUser, registerUser, getUserProfile}