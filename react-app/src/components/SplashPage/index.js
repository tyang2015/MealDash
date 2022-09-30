import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../store/restaurant';
import NavBarSplash from '../NavBarSplash';
import "./SplashPage.css"
// import diningTablePhoto from "./images"

const SplashPage = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state=> Object.values(state.restaurants))
  // if a - b is negative => a is smaller than b (so a "stays in place" = ascneding order)
  const topSixRestaurants = restaurants.sort((a,b)=> b.avgRating - a.avgRating).splice(0,6)
  console.log('top restaurants:', topSixRestaurants)

  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])

  return (
    <div className='splash-page-main-container'>
      {/* <h3> New Nav bar </h3> */}
      <div className="splash-page-background-image-container" >
        <NavBarSplash/>
        <div className='splash-page-title-text-box'> Restaurants and more, delivered to your door</div>
      </div>
      <div className='splash-page-content-container'>
        <div className='favorites-near-you'> Favorites Near You </div>
          <div className='splash-page-main-grid-container'>
            {topSixRestaurants.length>0 && topSixRestaurants.map(restaurant=>(
              <div key={restaurant.id} className='splash-page-restaurant-card-container'>
                <div className='splash-page-restaurant-pic-container'>
                  <img className="splash-page-restaurant-pic" src={restaurant.restaurantPicUrl}/>
                </div>
                <div className='splash-page-restaurant-text-box'>
                  <p>{restaurant.name}</p>
                  <p>{restaurant.avgRating}</p>
                </div>
              </div>
            ))}
          </div>
      </div>
      <div className='splash-page-3-links-middle-container'>
        <div className='become-a-dasher-container splash-middle-link-container'>
          <img className='image-link-pic'src="https://cdn.doordash.com/media/consumer/home/landing/new/ScootScoot.svg"/>
          <h1> Become a Dasher! </h1>
          <p style={{textAlign: "center"}}> As a delivery driver, you'll make reliable money</p>
        </div>
        <div className='become-a-partner-container splash-middle-link-container'>
          <img className="image-link-pic" src="https://cdn.doordash.com/media/consumer/home/landing/new/Storefront.svg"/>
          <h1> Become a Partner </h1>
          <p style={{textAlign: "center"}}> Click here to sign up your store </p>
        </div>
        <div className='try-the-app splash-middle-link-container' >
          <img className="image-link-pic" src="https://cdn.doordash.com/media/consumer/home/landing/new/iphone.svg"/>
          <h1> Try the App </h1>
          <p style={{textAlign: "center"}}> Experience the best your neighborhood has to offer </p>
        </div>
      </div>
    <div>

    </div>
    </div>
  )
}

export default SplashPage
