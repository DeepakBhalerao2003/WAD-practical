import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar/Navbar'
import Signup from './components/signup/Signup'
import Home from './components/home/Home';
import Login from './components/login/Login';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Createquizz from './components/quizz/Createquizz';
import GenerateQuestions from './components/generateQuestions/GenerateQuestions';
import AttemptQuizz from './components/attemptquizz/AttemptQuizz';


function App() {
  // const router = createBrowserRouter([
  //   {
  //     path:'/',
  //     element:<><Navbar/><Home/></>
  //   },
  //   {
  //     path:'/login',
  //     element: <><Navbar/><Login/></>
  //   },
  //   {
  //     path:'/signup',
  //     element: <><Navbar/><Signup/></>
  //   },
  //   {
  //     path:'/about',
  //     element: <><Navbar/><About/></>
  //   },
  //   {
  //     path:'/contact',
  //     element: <><Navbar/><Contact/></>
  //   },
  //   {
  //     path:'/createquizz',
  //     element: <><Navbar/><Createquizz/></>
  //   },
  //   {
  //     path:'/generatequestions',
  //     element: <><Navbar/><GenerateQuestions/></>
  //   },
  // ])

  return (
    // <>
  
    //   <RouterProvider router={router}/>
    //   {/* <Signup/> */}
    // </>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/createquizz" element={<Createquizz />} />
          <Route path="/generatequestions/:quizzId" element={<GenerateQuestions />} />
          <Route path="/attemptquizz/:quizzId" element={<AttemptQuizz />} />
          {/* <Route path="/generatequestions/get/:quizzId" element={<GenerateQuestions />} /> */}
        </Routes>
      </>
    </Router>
  )
}

export default App
