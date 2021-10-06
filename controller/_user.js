const User =  require('../models/User');
const MyError = require('../utils/_errorCatch');
const asyncHandler = require('../middleware/_asyncHandler');

exports.createUser = asyncHandler( async(req,res,next) =>{
    
    const user = await User.create(req.body);

    res.status(200).json({
        success:true,
        date: user
    });
});

exports.getUsers = asyncHandler( async(req,res,next) =>{
    /* only Journalist */
    const users = await User.find({"role" : "Journalist"});
/* check */

    if(!users){
        throw new MyError("Empty !!!" ,400);
    }
    res.status(200).json({
        success:true,
        date: users
    });
});

exports.getUserById = asyncHandler( async(req,res,next) =>{
    
    const user = await User.find();
/* check */

    if(!user){
        throw new MyError("Empty !!!" ,400);
    }
    res.status(200).json({
        success:true,
        date: user
    });
});

exports.updateUser = asyncHandler( async(req,res,next) =>{
    
    /* check redakts  journal admin */

    const user = await User.findById(req.params.id);

    if(!user){
        throw new MyError(req.params.id + " id not found !!!" , 400);
    }
    for(let attr in req.body){
        user[attr] = req.body[attr];
    }
    user.save();
    res.status(200).json({
        success:true,
        date: user
    });
});

exports.deleteUser = asyncHandler( async(req,res,next) =>{
    
    /* check redakts  journal admin */

    const user = await User.findById(req.params.id);

    if(!user){
        throw new MyError(req.params.id + " id not found !!!" ,400);
    }
    // user.remove();
    res.status(200).json({
        success:true,
        date: user
    });
});
