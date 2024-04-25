const express = require('express');
const mongoose = require('mongoose')
const fetchUser = require('../middleware/fetchUser');
const QuizzQuestions = require('../models/QuizzQuestions');
const Quizz = require('../models/Quizz');
const QuizzAttempts = require('../models/QuizzAttempts');
const router = express.Router();



router.get('/response/:attemptId', 
    fetchUser, 
    async(req, res) => {
        console.log(req.params.attemptId);

       try{
            const response = await QuizzAttempts.findById(req.params.attemptId);

            if(!response){
                return res.status(404).send('response not found');
            }
            console.log(response.quizzid);
            const quizz = await Quizz.findById(response.quizzid).select({'_id':1});
            
            const quizzquestions = await QuizzQuestions.findOne({quizz: quizz._id});
            console.log(quizzquestions);

            return res.status(200).json({ response, quizzquestions });
       }
       catch(error){
            console.log(error);
       }
    }
);


module.exports = router;