const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Category = require("../models/categoryModel");
const Quiz = require("../models/quizModel");


//@route    GET /api/quiz/
//@desc     Get All Quiz
//@access   Private
router.get('/',auth, async (req,res)=>{

    try {
        let allQuiz = await Quiz.find({});

        return res.status(200).json(allQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});


//@route    GET /api/quiz/:id
//@desc     Get All Quiz
//@access   Private
router.get('/:id',auth, async (req,res)=>{

    try {
        let singleQuiz = await Quiz.findById(req.params.id);

        return res.status(200).json(singleQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});

//@route    POST /api/quiz/add
//@desc     Add New Quiz Answer
//@access   Private
router.post('/add/:category',[auth,
    [check('question','Question Name is Required!').notEmpty()]], 
    async (req,res)=>{
    
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    let {question,description,image,level,answer} = req.body;
    
    try {

        let newQuestion = new Quiz({category:req.params.category,question,description,image,level,answer});

        await newQuestion.save();

        return res.status(201).json(newQuestion);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/quiz/like/:id
//@desc     Like Quiz
//@access   Private
router.post('/like/:id',auth, async (req,res)=>{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:'Invalid id'});
    }
    
    try {

        let quiz = await Quiz.findById(req.params.id);

        if(!quiz){
            return res.status(404).json({error:'Quiz not Found!'});
        }

        const alreadyLike = quiz.likes.filter(({user})=>user.toString() === req.user.id);

        if(alreadyLike.length > 0){
            return res.status(404).json({error:'Already like'});
        }

        quiz.likes.unshift({user:req.user.id});

        await quiz.save();

        return res.status(201).json(quiz.likes);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/quiz/unlike/:id
//@desc     unlike quiz
//@access   Private
router.post('/unlike/:id',auth, async (req,res)=>{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({error:'Invalid id'});
    }
    
    try {

        let quiz = await Quiz.findById(req.params.id);

        if(!quiz){
            return res.status(404).json({error:'Quiz not Found!'});
        }

        quiz.likes = quiz.likes.filter(({user})=>user.toString() !== req.user.id);

        await quiz.save();

        return res.status(201).json(quiz.likes);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});










module.exports = router;
