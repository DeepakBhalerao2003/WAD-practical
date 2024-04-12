import React from 'react';
import { useForm } from 'react-hook-form';
import AttemptQuizz from '../attemptquizz/AttemptQuizz'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const authToken = sessionStorage.getItem('authToken');

  const onSubmit = async (data)=>{
    try{
      const quizzId = data.quizzkey;
      const Uri = `http://localhost:3000/attemptquizz/getquizz/${quizzId}`
      const r = await axios.get(
        Uri,
        {headers:{
          'auth-token': authToken,
          'Content-Type': 'application/json',
        }}
      );
      console.log(r);
      if(r.status === 200){
        // setquestions(r.data.questions);\
        navigate(`./attemptquizz/${quizzId}`)
      }
    }catch(error){
      console.log(error)
    }
  }
  
  return (
    <div>
      <form className="searchQuizz" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('quizzkey', {required: {value: true, message: 'This Field is required'}})} />
        <input type="submit" value={'Search Quizz'} />
      </form>
    </div>
  )
}

export default Home
