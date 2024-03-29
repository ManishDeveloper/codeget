const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Category = require("../models/categoryModel");
const Userquiz = require("../models/userQuiz");
const Quiz = require("../models/quizModel");


//@route    GET /api/quiz/
//@desc     Get All Quiz
//@access   Private
router.get('/',auth, async (req,res)=>{

    try {
        let allQuiz = await Quiz.find({}).populate('category','name shortDescription');

        return res.status(200).json(allQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});


//@route    GET /api/quiz/:id
//@desc     Quiz By Id
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

//@route    GET /api/quiz/category/:id
//@desc     Quiz By Category ID
//@access   Private
router.get('/category/:id',auth, async (req,res)=>{

    try {
        let question = await Quiz.find({category:req.params.id});

        return res.status(200).json(question);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});

//@route    GET /api/quiz/:level/:id
//@desc     Quiz By Category and Level
//@access   Private
router.get('/:level/:id', async (req,res)=>{

    try {

        let question = await Quiz.find({category:req.params.id,level:req.params.level});

        if(!question){
            return res.status(404).json({error:'No Quiz Found!'});
        }

        return res.status(200).json(question);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'})
    }
});


//@route    POST /api/quiz/add
//@desc     Add New Quiz Answer
//@access   Private
router.post('/add/:category',[auth,
    [check('question','Question Name is Required!').notEmpty(),
    check('category','Category is Required!').notEmpty(),
    check('answer','Answer is Required!').notEmpty(),]], 
    async (req,res)=>{
    
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    let {question,description,image,level,answer} = req.body;
    
    try {

        let newQuestion = new Quiz({category:req.params.category,question,description,image,level,answer});

        await newQuestion.save();

        const quizWithCategory = await Quiz.findById(newQuestion._id).populate('category','name shortDescription')

        return res.status(201).json(quizWithCategory);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});


//@route    POST /api/quiz/user/done/:quizId
//@desc     Quiz done by user
//@access   Private
router.post('/user/done/:quizId',auth, 
    async (req,res)=>{
    
    try {

        let findUser = await Userquiz.findOne({user:req.user.id});

        if(!findUser){
            let addNewUser = await new Userquiz({user:req.user.id,quizDone:req.params.quizId})

            await addNewUser.save();

            return res.status(201).json(addNewUser);
        }

        await findUser.quizDone.push(req.params.quizId);

        await findUser.save();
        
        return res.status(200).json(findUser);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});


//@route    DELETE /api/quiz/user/done/:quizId
//@desc     Quiz done remove by user
//@access   Private
router.delete('/user/done/:quizId',auth, 
    async (req,res)=>{
    
    try {

        let findUser = await Userquiz.findOne({user:req.user.id});


        //return res.status(200).json(findUser.quizDone.indexOf(req.params.quizId));

        if(findUser.quizDone.indexOf(req.params.quizId) === -1){

            return res.status(404).json({error:'Not Done yet now.'})
        }

        findUser.quizDone = await findUser.quizDone.filter(quiz=> quiz !== req.params.quizId);

        await findUser.save();

        return res.status(200).json(findUser);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});


//@route    POST /api/quiz/user/done/
//@desc     get Quiz done by user
//@access   Private
router.put('/user/done',auth, async (req,res)=>{
    
    try {

        //let alreadyAdd = await Userquiz.find({quizDone:req.params.quizId});

        let getDoneQuiz = await Userquiz.findOne({user:req.user.id});

        if(!getDoneQuiz){
            return res.status(200).json({quizDone:[],user:req.user.id})

        }
        
        return res.status(200).json(getDoneQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }

});



//@route    POST /api/quiz/update/:id
//@desc     Update Quiz
//@access   Private
router.patch('/update/:id',[auth,
    [check('question','Question Name is Required!').notEmpty(),
    check('category','Category is Required!').notEmpty(),
    check('answer','Answer is Required!').notEmpty(),]], 
    async (req,res)=>{
    
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()[0].msg});
    }

    let {question,description,image,level,answer,category} = req.body;
    
    try {

        let updateFields = {}

        if(question) updateFields.question = question;
        if(description) updateFields.description = description;
        if(level) updateFields.level = level;
        if(category) updateFields.category = category;
        if(answer) updateFields.answer = answer;

        let updateQuiz = await Quiz.findByIdAndUpdate(req.params.id,updateFields,{new:true}).populate('category','name shortDescription');

        return res.status(201).json(updateQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/quiz/update/level/:id
//@desc     Update Quiz Level
//@access   Private
router.patch('/update/level/:level/:id',auth, 
    async (req,res)=>{
    
    try {

        let findQuiz = await Quiz.findById(req.params.id);

        if(!findQuiz){
        return res.status(404).json({error:'No Quiz Found!'});
        }

        let levelNum = +req.params.level;

        findQuiz.level = levelNum;

        await findQuiz.save();

        return res.status(201).json(findQuiz);
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:'Server Error'});
    }
});



//@route    POST /api/quiz/delete/:id
//@desc     Add New Quiz Answer
//@access   Private
router.delete('/delete/:id', auth, async (req,res)=>{
    
    try {

        let quiz = await Quiz.findByIdAndRemove(req.params.id);

        return res.status(200).send('quiz delete');
        
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
