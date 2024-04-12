const express = require('express');
const Quizz = require('../models/Quizz');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const User = require('../models/User');
const QuizzQuestions = require('../models/QuizzQuestions')

const router = express.Router();
const randomstring = require('randomstring');


// Creating a Collection named Quizz 
router.post('/generatequizzid',  [
        body('quizzname').isLength({ min: 3 }),
        body('noOfQuestions'),
    ], 
    fetchUser, 
    async (req, res) => {
        console.log(req.user.id);
       
    try {
        const { title } = req.body;
        let newquizzId;
        let quizzExists = true;

        while (quizzExists) {
            newquizzId = randomstring.generate({length: 8, charset: 'abcdefghijklmnopqrstuvwxyz'});
            const existingQuizz = await Quizz.findOne({ quizzId: newquizzId });
            if (!existingQuizz) {
                quizzExists = false;
            }
        }
        let user = await User.findOne({ user: req.user.id });
        console.log(user)

        const newQuizz = await Quizz.create({
            user: req.user.id,
            quizzId: newquizzId,
            title: title,
        });
        const quizz  = await Quizz.findOne({quizzId: newquizzId});
        QuizzQuestions.create({
            quizz: quizz._id,
        })

        res.status(200).json({ quizzId: newquizzId ,response: newQuizz, userDetails: user});
    } catch (error) {
        console.error('Error creating quizz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/generatequestions/:quizzid', 
    fetchUser ,
    [
        body('question', 'Enter valid question').exists(),
        body('marks', 'Enter valid marks').isNumeric().exists(),
        body('correctOptionIndex', 'Enter valid correctOptionIndex').isNumeric().exists(),
    ], 
    async (req, res)=>{
    // console.log('Generate Questions')
    const quizzid = req.params.quizzid;
    console.log(req.body)
   
    try {

        // fteching the quizz from the databse
        const quizz  = await Quizz.findOne({quizzId: quizzid});
        // console.log('quizz:',quizz)
        const quizzquestionsId = await QuizzQuestions.findOne({quizz: quizz._id});
        console.log(quizzquestionsId._id)
        if(!quizz){
            return res.status(404).json({ error: 'Quizz not found' });

        }

        // Creating variable to store req.body
        console.log(req.body    )
        const { question, options, correctOptionIndex, marks } = req.body;

         // Extract option texts from the options array
        
        // console.log(optionTexts)
        const newQuestion = {
            question,
            options: options,
            correctOption: correctOptionIndex,
            marks
        };
  
        console.log('updating quizz')
        // Pushing the new Question object in the existing quizz array
        const updatedQuizzQuestions = await QuizzQuestions.findByIdAndUpdate(
            quizzquestionsId._id,
            { $push: { questions: newQuestion } },
            { new: true }
        )


        console.log('Updated')

        const quizzQuestions = await QuizzQuestions.findOne(quizzquestionsId._id);
        res.status(200).json(quizzQuestions);
        
        
    } catch (error) {
        console.error('Error creating quizz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})



// Get Request for Fetching the Quizz for the Owner
router.get('/getquizz/:quizzId', fetchUser, async (req, res) => {
    try {
        const user = req.user;
        console.log(req.user);
        const quizzId = req.params.quizzId;
        const quizz = await Quizz.findOne({ quizzId: quizzId, user: user.id });
      
        if(!quizz){
            console.log('quizz not found in your history');
            return res.status(401).send('quizz not found in your history');
        }
        
        const quizzquestions = await QuizzQuestions.findOne({quizz: quizz._id});
      
        if (!quizzquestions) {
            return res.status(404).json({ error: 'Quizz not found' });
        }

        res.status(200).json(quizzquestions);
    } catch (error) {
        console.error('Error fetching quizz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Getting 


module.exports = router;
