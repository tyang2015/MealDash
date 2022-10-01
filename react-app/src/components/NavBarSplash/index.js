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

  if (sessionUser) return null;
  return (
      <nav className='navbar-splash'>
        <i className="fa-solid fa-burger splash-page-logo"> MealDash </i>
        <div className='session-links-container'>
          <NavLink to={`/login`}>
            <div>Sign In </div>
          </NavLink>
          <NavLink to={`/sign-up`}>
            <div className='sign-up-button'>Sign Up</div>
          </NavLink>
        </div>
      </nav>
  )
}

export default NavBarSplash;
