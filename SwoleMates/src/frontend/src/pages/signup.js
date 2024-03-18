import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SwoleMates from '../assets/SwoleMates.png'

const Signup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
  
    const navigate = useNavigate()
  
    const onButtonClick = () => {
      // You'll update this function later...
      // Set initial error values to empty
      setEmailError('')
      setPasswordError('')
  
        // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }
  
    // Authentication calls will be made here...
  }
  
  
    return (
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          {/* Insert the <img> element here */}
          <img src= {SwoleMates} alt = "SwoleMates Logo" style = {{width: '400px', height: 'auto'}}/>
          <div>Create Account</div>
        </div>
        <br />
        {/* Email Input */}
        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        {/* Password */}
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        {/* Sign Up button */}
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up'} />
        </div>
      </div>
    )
  }
  
  export default Signup