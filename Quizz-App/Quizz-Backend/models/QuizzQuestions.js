const mongoose = require('mongoose');

const QuizzQuestionSchema = new mongoose.Schema({
    quizz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quizz',
        required: true
    },
    totalMarks:{
        type: Number
    },
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options:[
                {
                    option:{
                        type: String,
                        required: true
                    },
                    
                }
            ], 
            correctOption:{
                type: Number,
                required: true,
                min: 0,
                max: 10
            },
            marks:{
                type: Number,
                require: true,
            }

        }
    ]
})

module.exports = mongoose.model('quizzquestion', QuizzQuestionSchema);