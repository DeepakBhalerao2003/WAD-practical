
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


import "./CreateQuizz.css"

const Createquizz = () => {
  
  const navigate = useNavigate();

  // React Hook Form

  const [userStatus, setUserStatus] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  // .Checking if User is Authorised or not 
  const Authorised = false;
  const CheckUser = ()=>{
    const authToken = sessionStorage.getItem('authToken');
    
    console.log(authToken);
  }


  const onSubmit = async (data)=>{
    const authToken = sessionStorage.getItem('authToken');
    CheckUser();
    console.log(data);
    try {
      let r = await fetch("http://localhost:3000/quizz/generatequizzid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'auth-token': authToken,
        },
        body: JSON.stringify(data),
      });
      let resText = await r.text();
      let res = JSON.parse(resText);
      const quizzId = res.quizzId;
      console.log(quizzId);

    
   
      if(r.status === 200 && res){
        // sessionStorage.getItem('authToken', authToken);
        setUserStatus(true);
        alert('Quizz Generated Succesfully');
        navigate(`/generatequestions/${quizzId}`);

      }
      else if (r.status === 404){
        setUserStatus(false);
        console.log('Username not Found')
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }

   
  };

  return (
  <div className='createquizz'>
    <form action="" onSubmit={handleSubmit(onSubmit)}>

      <div className="field">
        <label htmlFor="">Title of Quizz</label>
        <input type="text" {...register('title', {required:{value: true, message:"Quizz name is Required"}})}/>
        {errors.quizzname && (
            <div className="error">{errors.quizzname.message}</div>
          )}
        
      </div>
      <div className="field">
        <label htmlFor="">Number of Questions</label>
        <input type="number" {...register('noOfQuestions', {required:{value: true, message:"Quizz name is Required"}, min:{value : 3, message:'Mininum Number of Question are 5'}, max:{value: 10, message:'Maximum No of Question should be 10'}})} />
        {errors.noOfQuestions && (
            <div className="error">{errors.noOfQuestions.message}</div>
          )}
      </div>
      <div className="field">
        <input type="submit" value='Create Quizz' disabled={isSubmitting}/>
      </div>
    </form>

  </div>
    
        
  )
}

export default Createquizz
