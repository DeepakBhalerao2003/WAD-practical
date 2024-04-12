const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const QuizzQuestions = require('../models/QuizzQuestions');
const Quizz = require('../models/Quizz');
const QuizzAttempts = require('../models/QuizzAttempts');
const router = express.Router();

// Fetching the quizz using the quizz key for sharing the response of the user

router.get('/getquizz/:quizzId', fetchUser, async (req, res)=> {

    const quizzId = req.params.quizzId;

    try {
        const quizz = await Quizz.findOne({quizzId});
        console.log(quizz);
        if(!quizz){
            console.log('Quizz Not Found Please Enter valid Quizzz Key');
            res.status(400).send('Quizz Not Found Please Enter valid Quizzz Key');
        }
        // console.log(quizzId)
        const quizzquestions = await QuizzQuestions.findOne({quizz: quizz._id}).select('-questions.correctOption');
        // console.log('Attempt QUizz');
        console.log(quizzquestions);
        res.json(quizzquestions);
    } catch (error) {
        res.status(400).send('Quizz Not Found Please Enter valid Quizzz Key');
    }
})

// Posting the attempted quizz to the QuizzAttempts Model and the n verifying it 
// In this Post Request i am going to create a empty MongoDb doc which only contains userid, quizzid and date and the response will be blank i will update the response using the put method

router.post('/attempt/:quizzId', fetchUser, async(req, res) => {
    const quizzId = req.params.quizzId;

    try {
        const user = req.user.id;
        const { response } = req.body;
        console.log(response);
        const quizz = await Quizz.findOne({quizzId});
        console.log(quizz, ' ', user);
        
        await QuizzAttempts.create({
            quizzid: quizz._id,
            user,            
        });
        const newAttempt = await QuizzAttempts.findOne({quizzid: quizz._id, user})
        res.send(newAttempt._id);
    } catch (error) {
        res.status(400).send('Quizz Not Found Please Enter valid Quizzz Key');
    }
})


router.put('/response/:quizzId/:attemptid', fetchUser, async(req, res) => {
    const quizzId = req.params.quizzId;
    const attemptid = req.params.attemptid;

    try {
        const user = req.user.id;
        const { response } = req.body;
        console.log(response);
        
        const quizzattempt = await QuizzAttempts.findOne({_id: attemptid, user}) ;
        console.log(attemptid,user)
        if(!quizzattempt){
            console.log('not user');
            return res.status(401).send('USer not Verified for this attempt');
        }
        
        const updatedquizzAttempt = await QuizzAttempts.findByIdAndUpdate(
            attemptid,
            { $push: { response: response } },
            { new: true }
        )
        res.send(updatedquizzAttempt    );
    } catch (error) {
        return res.status(400).send('Quizz Not Found Please Enter valid Quizzz Key');
    }
})
module.exports = router;