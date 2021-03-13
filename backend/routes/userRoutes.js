const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();

//@route    Public /api/user/register
//@desc     user register
//@access   Public
router.post('/register',[
check('name','Name is Required').notEmpty(),
check('email','Email is Required').notEmpty(),
check('email','Email is not Valid').isEmail(),
check('password','Password is Required').notEmpty(),
check('password','Password should be min 6 characters').isLength({min:6})],async (req,res)=>{
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    let {name,email,password} = req.body;

    try {
        let userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({error:'User is already Exist!'});
        }
        
        let salt = await bcrypt.genSalt(10);

        let hasPassword = await bcrypt.hash(password,salt);

        let newUser = new User({name,email,password:hasPassword});

        await newUser.save();

        const payload = {
            user:{
                id:newUser.id
            }
        }

        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:36000},(err,token)=>{
            if(err) throw err;
            return res.status(200).json({token});
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});

//@route    Public /api/user/auth
//@desc     Get Login User
//@access   Public
router.get("/auth",auth,async (req,res)=>{

    try {
        let getUser = await User.findById(req.user.id).select('-password');

        return res.status(200).json(getUser);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error!'});
    }
})

//@route    Public /api/user/login
//@desc     user Login
//@access   Public
router.post('/login',[
    check('email','Email is Required').notEmpty(),
    check('email','Email is not Valid').isEmail(),
    check('password','Password is Required').notEmpty(),
    ],async (req,res)=>{
        let errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()[0].msg});
        }
    
        let {email,password} = req.body;
    
        try {
            let userExist = await User.findOne({email});
    
            if(!userExist){
                return res.status(400).json({error:'User is not Exist!'});
            }

            let checkPassword = await bcrypt.compare(password,userExist.password);

            if(!checkPassword){
                return res.status(400).json({error:'Password is not Matched!'});
            }
    
            const payload = {
                user:{
                    id:userExist.id
                }
            }
    
            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:36000},(err,token)=>{
                if(err) throw err;
                return res.status(200).json({token});
            })
    
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({error:'Server Error'});
        }
    });


module.exports = router;