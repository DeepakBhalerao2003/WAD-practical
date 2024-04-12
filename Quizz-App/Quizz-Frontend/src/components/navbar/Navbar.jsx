import React from 'react'
import "./Navbar.css"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className="logo"><NavLink to={'/'}>Deepak Quizz App</NavLink></div>
        <div className="links">
            <ul>
                <NavLink className={(e)=>{return e.isActive?"navActive": ''}} to={'/'}><li>Home</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"navActive": ''}} to={'/contact'}><li>Contact Us</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"navActive": ''}} to={'/createquizz'}><li>Create Quizz</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"navActive": ''}} to={'/login'}><li>Login</li></NavLink>
                <NavLink className={(e)=>{return e.isActive?"navActive": ''}} to={'/signup'}><li>Sign Up</li></NavLink>
                
            
              {/*       <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/contact'}>Contact Us</Link></li>
                <li><Link to={'/about'}>About Us</Link></li>
                <li><Link to={'/login'}>Login</Link></li> */}
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
