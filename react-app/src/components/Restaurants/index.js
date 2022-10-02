import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../store/restaurant';
import { NavLink } from 'react-router-dom';
import "./restaurants.css"

const Restaurants = () => {
    const dispatch = useDispatch()
    let restaurants = useSelector(state => Object.values(state.restaurants))
    // console.log('restaurants:', restaurants)
    useEffect(()=>{
        dispatch(getAllRestaurants())
    }, [dispatch])
    return (
        <>
          <div>
            <div className="restaurant-main-grid-container">
                {restaurants.length>0 && restaurants.map(restaurant => (
                  <NavLink className='navlink' key={restaurant.id} to = {`restaurants/${restaurant.id}`}>
                    <div key={restaurant.id} className="restaurant-card-container">
                      <div className= 'get-restaurants-pic-container'>
                        <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}/>
                      </div>
                      <div className="get-restaurants-bottom-text-container">
                        <div className='get-restaurants-left-inner-text-container'>
                          <h3>{restaurant.name}</h3>
                          <p> {restaurant.avgRating} <i class="fa-solid fa-star" ></i> ratings</p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        </>
    )
}

export default Restaurants
