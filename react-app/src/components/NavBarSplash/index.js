import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import "./NavBarSplash.css"

const NavBarSplash = () => {
  // const session
  // const sessionUser
  const sessionUser = useSelector(state=> state.session.user)
  console.log('session user in navbarsplash:', sessionUser)
  if (sessionUser) return null;
  return (
      <nav className='navbar-splash'>
        <i className="fa-solid fa-burger splash-page-logo"> MealDash </i>
        <div className='session-links-container'>
          <NavLink className='navlink' to={`/login`}>
            <div className='splash-page-session-button sign-in-button'>Sign In </div>
          </NavLink>
          <NavLink className='navlink' to={`/sign-up`}>
            <div className='splash-page-session-button'>Sign Up</div>
          </NavLink>
        </div>
      </nav>
  )
}

export default NavBarSplash;
