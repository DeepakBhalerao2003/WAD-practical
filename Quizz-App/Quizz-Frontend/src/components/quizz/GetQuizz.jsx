
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const GetQuizz = () => {
    const [quizz, setquizz]= useState(null);
    const [error, setError] = useState(null);
    const { quizzId } = useParams();

    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                const authToken = sessionStorage.getItem('authToken')
                const getUri = 'http://localhost:3000/quizz/getquizz/' + quizzId;
                const res = await axios.get(getUri, {
                    headers:{
                      'auth-token': authToken,
                      'Content-Type': 'application/json',
                    }
                  });

                  
                if (res.data && res.data.questions) {
                    
                    setquizz(res.data); // Update quizz state with fetched data
                    console.log('quizz: ',quizz)
                } else {
                    // console.log('No questions found for quiz'); // Log no questions found
                    setquizz(null); // Set quizz state to null if no questions found
                }
            } catch (error) {
                
                if (error.response) {
                    if (error.response.status === 401) {
                        setError('Unauthorized: Please log in to access this quiz');
                    } else {
                        setError(`Error: ${error.response.status} - ${error.response.data.message}`);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    setError('No response received from server');
                } else {
                    
                    setError('Error making request: ' + error.message);
                }
            }
        }
        fetchdata();
    }, [quizzId]);
    


  return ( 
    <div>
        {error}
    {quizz ? (
        <div>
            
            {!quizz.questions && HEllo}
            {quizz.questions && quizz.questions.length > 0 ? (
                <div>
                    <h3>Questions:</h3>
                    <ul>
                        {quizz.questions.map((question, index) => (
                            <li key={question._id}>
                                <p>Question {index + 1}: {question.question}</p>
                                {/* <button onClick={() => editQuestion(question._id)}>Edit</button> */}
                                <ul>
                                    {question.options.map((option, optionIndex) => (
                                        <li key={option._id}>
                                            <p>Option {optionIndex + 1}</p>{option.option}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No questions found for this quiz.</p>
            )}
        </div>
    ) : (
        <p>Loading quiz...</p>
    )}
</div>
);
}

export default GetQuizz
