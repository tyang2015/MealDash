import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from 'react-router-dom';
import { getAllRestaurants } from '../../store/restaurant';
import "./SearchList.css"

const currentDate = new Date()

const SearchList = ({value}) => {
  const dispatch = useDispatch();
  const allRestaurants = useSelector(state=> Object.values(state.restaurants))
  console.log('all restaurants from search comp:', allRestaurants)
  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])

  const filteredRestaurants = allRestaurants.filter(restaurant => {
    if (!value) return restaurant
    else {
      let nameIncludes = restaurant.name.toLowerCase().includes(value)
      let categoryIncludes = restaurant.category.toLowerCase().includes(value)
      return nameIncludes || categoryIncludes
    }
  })

  const isCurrentlyOpen = (restaurantObj)=> {
    // can compare strings like "08:00:01" and "08:00:02"
    let openingTime = restaurantObj.openTime
    let closingTime = restaurantObj.closeTime
    let currentTime = String(currentDate.getHours()) + ":" + String(currentDate.getMinutes()) + ":" + String(currentDate.getSeconds())
    console.log('current time rn:', currentTime)
    if (currentTime > openingTime && currentTime < closingTime) {
      return true
    } else return false
    // let restaurantOpenHours = restaurantObj.openTime.split(":")[0]
    // let restaurantOpenMin = restaurantObj.openTime.split(":")[1]
    // let restaurantOpenSec = restaurantObj.openTime.split(":")[2]
    // let restaurantCloseHours = restaurantObj.closeTime.split(":")[0]
    // let restaurantCloseMin = restaurantObj.closeTime.split(":")[1]
    // let restaurantCloseSec = restaurantObj.closeTime.split(":")[2]

  }

  const convertOpenTime = (restaurantObj) => {
    //  return HOUR(eg. 7) AM/PM
    let openingHours = Number(restaurantObj.openTime.split(":")[0])
    if (openingHours == 12) {
      return `12 PM`
    }
    else if (openingHours> 12){
      return `${openingHours - 12} PM`
    }
    else if (openingHours === 24) {
      return `12 AM`
    }
    else {
      return `${openingHours} AM`
    }
  }


  return (
    <div className='search-dropdown'>
      {filteredRestaurants?.length>0 && filteredRestaurants.map(restaurant => (
        <NavLink to={{pathname: `/restaurants/${restaurant.id}`}} className="navlink">
          <div key={restaurant.id} className="search-dropdown-card">
            <div className='search-dropdown-logo-container'>
              <img className='search-dropdown-logo' src={restaurant.logo} />
            </div>
            <div className='search-dropdown-logo-text-container'>
              <div className='search-dropdown-restaurant-name'> {restaurant.name} </div>
              <div className='search-dropdown-restaurant-category'> {restaurant.category} </div>
              {!isCurrentlyOpen(restaurant) && (
                <div className='search-dropdown-restaurant-time-info'>
                  <p style={{color: "#A5720A", fontWeight: "550", letterSpacing: "-0.02ch"}}>Closed • &nbsp;</p>
                  <div>Opens at {convertOpenTime(restaurant)}</div>
                </div>
              )}
            </div>
          </div>
        </NavLink>
      ))}

    </div>
  )
}

export default SearchList
