const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const Category = require("../models/categoryModel");


//@route    POST /api/category/add
//@desc     Add Category
//@access   Private
router.post('/add',[auth,
    [check('name','Please fill Category Name').notEmpty(), 
    check('shortDescription','Please fill short Description').notEmpty(),]], 
    async (req,res)=>{
    
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    let {name,shortDescription} = req.body;
    
    try {

        let newCategory = new Category({name,shortDescription});

        await newCategory.save();

        return res.status(201).json(newCategory);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});


//@route    POST /api/category/get
//@desc     Get All Category
//@access   Private
router.get('/get',async (req,res)=>{
    
    try {

        let getCategories = await Category.find({});

        return res.status(200).json(getCategories);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});

module.exports = router;
