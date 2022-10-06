import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import "./RestaurantFooter.css"

const RestaurantFooter = () => {
  return (
    <div className='restaurant-footer-main-container'>
      <div className='restaurant-footer-content-container'>
        {/* <div className='restaurant-footer-content-right-left-container'> */}
          <div className='restaurant-footer-left-container'>
            <div style={{fontSize:"17.5px", fontWeight: "700"}}>Trending Restaurants</div>
            <div className='restaurant-footer-trending-restaurants-container'>
              <div className='restaurant-footer-trending-restaurants-first-column'>
                <p>Tiff's Taiwanese Breakfast</p>
                <p>2nd place</p>
                <p>3rd place</p>
                <p>4th place</p>
                <p>5th place </p>
              </div>
            </div>
          </div>
          <div className='restaurant-footer-right-container'>
            <div style={{fontSize:"17.5px", fontWeight: "700"}}>Trending Categories</div>
            <div className='restaurant-footer-trending-restaurants-second-column' >
              <p>Vegan Food</p>
              <p>Taiwanese Food</p>
              <p>Indian Food</p>
              <p>Ethiopian Food</p>
              <p>French Food </p>
            </div>
          </div>
        {/* </div> */}
      </div>
      <div className='restaurant-footer-bottom-container'>
        <small> <i className="fa-solid fa-burger"> </i>&nbsp;&nbsp;</small>
        <small>Terms of Service &nbsp;&nbsp;</small>
        <small>Privacy &nbsp;&nbsp;</small>
        <small>Notice at Collection &nbsp;&nbsp;</small>
        <small>Do Not Sell My Personal Information (California) &nbsp;&nbsp;</small>
        <small><i class="fa-regular fa-copyright"></i>&nbsp;2022 MealDash</small>
      </div>
    </div>
  )

}

export default RestaurantFooter
