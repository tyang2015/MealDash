import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
  const history= useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/restaurants')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
        <h1>Sign In</h1>
        <div>
          New to MealDash?
          <NavLink className="navlink" to="/sign-up" style={{marginLeft:"5px"}}>
           <b style={{color: "lightcoral"}}>Sign Up</b>
          </NavLink>
        </div>
      </div>
      <form className="login-form-container" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-page-email-row'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            className='login-inputs'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-page-password-row'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            className='login-inputs'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className="login-page-submit-button" type='submit'>Login</button>
      </form>
    </>
  );
};

export default LoginForm;
