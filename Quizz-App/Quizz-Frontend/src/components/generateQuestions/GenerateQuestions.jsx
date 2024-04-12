import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import GetQuizz from '../quizz/GetQuizz';
import axios from 'axios';



const GenerateQuestions = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
    defaultValue: [{ option: '', }  ],
    rules: { minLength: 2 , maxLength: 6} 
  });

  // Ensuring That two Options are Shown Initially 
  useEffect(() => {
    setValue('options', [{ option: '' }, { option: '' }]);
  }, [setValue]);

    // creating correctOption variable to store the correct option
    const [correctOptions, setCorrectOptions] = React.useState(null) 



  // Creating a variable for storing the post url
  const { quizzId } = useParams();
  const postUri = 'http://localhost:3000/quizz/generatequestions/' + quizzId;

  // Getting authToken from Session Storage
  const authToken = sessionStorage.getItem('authToken');

  const onSubmit = async (data) => {
    data.correctOptionIndex = correctOptions;
    console.log(data); // Handle form submission here
    const r = await axios.post(postUri, data, {
      headers:{
        'auth-token': authToken,
        'Content-Type': 'application/json',
      }
    });
    if(r.status === 200){
      alert('Question Saved');
      reset({
        question: '', // Reset question field
        marks: '', // Reset marks field
        options: [{ option: '' }, { option: '' }], // Reset options to initial state
      });
      setCorrectOptions(null);
      navigate('/generateQuestions/' + quizzId);


    }
    console.log(r);
  };


  const handleOptionChange = (optionid) => {
    setCorrectOptions(optionid);
  };


  

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="questionfield">
          <label htmlFor="question">Question</label>
          <textarea {...register('question', { required: true })}></textarea>
          <input type="number" placeholder='marks' {...register('marks', {required:{value: true, message: 'This Filed is Required'}})} />
        </div>

        {/* Render dynamic options */}
        {fields.map((option, index) => (
          <div className="optionfield" key={option.id}>
            <label>
                  <input
                      type="radio"
                      name='correctOptions'
                      checked={correctOptions === index}
                      {...register('correctOptionIndex', {required: {value: true , message : 'Please select the Correct Option'}})}
                      onChange={(event) => {
                         handleOptionChange(index);
                         // Prevent default behavior
                      }}
                  />
                  Correct
                </label>
            <textarea
              {...register(`options.${index}.option`, { required: true })}
              defaultValue={option.option}
            />
            {/* Render "Remove" button only if there's more than one option */}
            {fields.length > 2 && (
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Button to add new option */}
        <button
          type="button"
          onClick={() => {
            append({ option: '' }); // Add new empty option
          }}
        >
          Add Option
        </button>

        {/* Submit button */}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>

        {/* Display validation errors */}
        {errors.question && <p className='error'>Question is required</p>}
        {errors.options && <p className='error'>Please fill out all options</p>}
        {errors.correctOptionIndex && <p className='error'>Please tell which option is Correct</p>}
      </form>


      {/* Showing the Saved Quizz */}
      <div className="savedQuizz">
          <GetQuizz/>
      </div>

    </div>
  );
};

export default GenerateQuestions;
