const mongoose = require('mongoose');

const quizzAttemptSchema = new mongoose.Schema({
    quizzid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quizz',
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    response: [
        {
            question: {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'quizzquestion.questions.question',
                },
                choosedOption:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'quizzquestion.options.option',
                }
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
    
});


module.exports = mongoose.model('quizzattempts', quizzAttemptSchema);