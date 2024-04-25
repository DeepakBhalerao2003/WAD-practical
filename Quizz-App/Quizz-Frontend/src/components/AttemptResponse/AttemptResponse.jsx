import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios  from 'axios';
import "./AttemptResponse.css"

const AttemptResponse = () => {

    const attemptId = useParams().attemptId;
    console.log(attemptId);

    const [response, setresponse] = useState(null);
    const [quizzquestions, setquizzquestions] = useState(null);

    const authToken = sessionStorage.getItem('authToken');
    console.log(authToken);
    useEffect(()=>{
        if(!authToken){
            navigate('/login');
        }
        
        const fetchresponse = async ()=>{
            try {            
                const r = await  axios.get(`http://localhost:3000/quizzresponse/response/${attemptId}`, {
                    headers:{
                        'auth-token': authToken,
                    }
                });

                console.log(r.data);
                if(r.status === 200){
                    setresponse(r.data.response.response);
                    setquizzquestions(r.data.quizzquestions.questions);
                    console.log(quizzquestions);
                }
            }
            catch (error) {
                console.log(error);
            }
        } 

        fetchresponse();
    }, [attemptId, authToken]);

    if(response){
        // console.log(response.response[0].correctOptionId);
        console.log(response[0].selectedOptionId)
    }
  return (
    <div className='attemptResponse'>
      Attempt Response

      {response && quizzquestions && (
        <div className="quizzContainer">
            <ul>
            {quizzquestions.map((question, index) => {

                const selectedOptionId = response[index]?.selectedOptionId;
                const correctOptionId = response[index]?.correctOptionId;
                const marksObtained = selectedOptionId === correctOptionId ? question.marks : 0;

                return (

                <li className='question' key={question._id}>
                    <div className="con">
                        <h3>Q {index + 1 }. {question.question}</h3>
                        <h4> Marks Obtained : {response[index]?.selectedOptionId === response[index]?.correctOptionId ? question.marks: 0} / {question.marks}</h4>
                    </div>
                    <ul className="options">
                        {question.options.map((option, optionindex)=>{
                            const isCorrect = response[index]?.correctOptionId === option._id;
                            const isSelected = response[index]?.selectedOptionId === option._id;

                            // Build className based on condition s
                            let className = '';
                            if (isCorrect) {
                                className += 'correct ';
                            }
                            if (isSelected) {
                                className += 'selected ';
                            }

                            return (
                                <li
                                    key={option._id}
                                    className={className.trim()} // Trim to remove extra whitespace
                                >
                                    {option.option}
                                </li>
                            );
                        })}
                    </ul>
                </li>
                );
                })}
            </ul>
        </div>
      )}
    </div>
  )
}

export default AttemptResponse
