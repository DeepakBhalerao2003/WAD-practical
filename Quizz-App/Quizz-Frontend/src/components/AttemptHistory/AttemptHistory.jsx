import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./AttemptHistory.css"
import { useNavigate } from 'react-router-dom';

const AttemptHistory = () => {
    const navigate = useNavigate();
    const authToken = sessionStorage.getItem('authToken');
    const [AttemptHistory, setAttempthistory] = useState([]);
    const [isAttemptHistory, setIsAttemptHistory] = useState(false);

    

    useEffect(()=>{
        if(!authToken){
            navigate('/login');
        }
        
        const fetchAttemptHistory = async()=>{
            const r = await axios.get('http://localhost:3000/attemptquizz/history', { headers:{ 'auth-token': authToken } });
            
        if(r.status === 200){
           
            const attempts = r.data.AttemptHistory;
            setIsAttemptHistory(true);
            setAttempthistory(attempts)   
          
        }
        }

        fetchAttemptHistory();
    }, [authToken, isAttemptHistory]);
  
    
    const showResponse = (attemptId) => {
        navigate(`/response/${attemptId}`);
    }

  return (
    <div className='AttemptHistoryContainer'>
    {AttemptHistory && AttemptHistory.length > 0 && (
        AttemptHistory.map((attempt, index) => (
            <div className="attemptContainer" key={attempt.attemptId}>
                <p className='title'><strong>Title: </strong>{attempt.title}</p>
                <p className="quizzId"><strong>QuizzId: </strong>{attempt.quizzId}</p>
                <p><strong>Marks Obtained : </strong> {attempt.MarksObtained} / {attempt.totalMarks}</p>

                <button onClick={()=> showResponse(attempt.attemptId)}>See Response</button>
            </div>
        ))
    )}
</div>
  )
}

export default AttemptHistory
