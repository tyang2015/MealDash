import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { maskPhoneNumber } from '../RestaurantForm/PhoneNumberValidation';
import "./SignUpForm.css"

const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  // const [username, setUsername] = useState('');vf
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName,email, phoneNumber,password));
      if (data) {
        setErrors(data)
      } else {
        history.push("/restaurants")
      }
    } else {
      setErrors(['Passwords need to match'])
    }
  };

  // useEffect(()=> {
  //   if
  // }, [email])



  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e)=>{
    setLastName(e.target.value)
  }

  const updatePhoneNumber = (e)=>{
    setPhoneNumber(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className='signup-top-bar'>
        <i className="fa-solid fa-burger sign-up-logo"style={{color:"lightcoral"}}> MealDash </i>
      </div>
      <div className='signup-title-container'>
        <h1>Sign Up</h1>
        <div>
          Already have an account?
          <NavLink className="navlink" to="/login" style={{marginLeft:"5px"}}>
           <b style={{color: "lightcoral"}}>Sign In</b>
          </NavLink>
        </div>
      </div>
      <form className="signup-form-container"onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className="validation-errors">{error}</div>
          ))}
        </div>
        <div className='signup-page-row-inputs top-row'>
          <div className='first-row-firstname-box sign-up-label-input-container'>
            <label>First Name</label>
            <input
              type='text'
              name='firstname'
              onChange={updateFirstName}
              value={firstName}
              className='signup-inputs first-name-input'
              required
            ></input>
          </div>
          <div className='first-row-lastname-box sign-up-label-input-container'>
            <label style={{marginLeft: '5px'}}>Last Name</label>
            <input
              type='text'
              name='lastname'
              style={{alignSelf: 'flex-end'}}
              onChange={updateLastName}
              className='signup-inputs last-name-input'
              value={lastName}
              required
            ></input>
          </div>
        </div>
        <div className='signup-page-row-inputs single sign-up-label-input-container'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            className='signup-inputs'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div className='signup-page-row-inputs single sign-up-label-input-container'>
          <label>PhoneNumber</label>
          <input
            type='text'
            name='email'
            onChange={updatePhoneNumber}
            value={maskPhoneNumber(phoneNumber)}
            placeholder='(123) 456-789'
            className='signup-inputs'
            required
          ></input>
        </div>
        <div className='signup-page-row-inputs single sign-up-label-input-container'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className='signup-inputs'
            required
          ></input>
        </div>
        <div className='signup-page-row-inputs single sign-up-label-input-container'>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            className='signup-inputs'
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='signup-page-submit-button' type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
