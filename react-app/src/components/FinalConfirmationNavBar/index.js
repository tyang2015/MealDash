import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import "./FinalConfirmationNavBar.css"


const FinalConfirmationNavBar = () => {
  const location = useLocation()
  
  return (
    <nav className="final-confirmation-nav-bar">
      <NavLink to="/restaurants">
        <i className="fa-solid fa-burger order-confirmation-page"> MealDash </i>
      </NavLink>
    </nav>
  )
}

export default FinalConfirmationNavBar
