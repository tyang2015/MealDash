import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllRestaurants } from '../../store/restaurant';
import NavBarSplash from '../NavBarSplash';
import SplashFooter from '../SplashFooter';
import "./SplashPage.css"
// import diningTablePhoto from "./images"

// you should not be able to see the splash page when you're logged in => redirect to /restaurants d
const SplashPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const restaurants = useSelector(state=> Object.values(state.restaurants))
  const sessionUser = useSelector(state=> state.session.user)

  if (sessionUser) history.push('/restaurants')
  // if a - b is negative => a is smaller than b (so a "stays in place" = ascneding order)
  const topSixRestaurants = restaurants.sort((a,b)=> b.avgRating - a.avgRating).splice(0,6)
  console.log('top restaurants:', topSixRestaurants)


  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])

  return (
    <>
      <div className='splash-page-main-container'>
        {/* <h3> New Nav bar </h3> */}
        <NavBarSplash/>
        <div className="splash-page-background-image-container" >
          <div className='splash-page-title-text-box'> Restaurants and more, delivered to your door</div>
        </div>
        <div className='splash-page-content-container'>
          <h2 className='favorites-near-you'> Favorites Near You </h2>
            <div className='splash-page-main-grid-container'>
              {topSixRestaurants.length>0 && topSixRestaurants.map(restaurant=>(
                <NavLink className="navlink" to="/sign-up">
                  <div key={restaurant.id} className="restaurant-card-container">
                      <div className= 'get-restaurants-pic-container'>
                        <img className= 'get-restaurants-pic'src={restaurant.restaurantPicUrl}  onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
                      </div>
                      <div className="get-restaurants-bottom-text-container">
                        <div className='get-restaurants-bottom-text-row text-top-row'>
                          {restaurant.name}
                        </div>
                        <div className='get-restaurants-bottom-text-row not-top-row'>
                        {restaurant.priceRange === 3? "$$$" : restaurant.priceRange===2? "$$": restaurant.priceRange===1? "$": "$$$$" } • {restaurant.category}
                        </div>
                        <div className='get-restaurants-bottom-text-row not-top-row'>
                          {restaurant.avgRating == 0? "No" : Math.round(restaurant.avgRating * 10)/10} <i class="fa-solid fa-star" ></i> {restaurant.numReviews>0? `(${restaurant.numReviews}+)`: "0 ratings"}
                        </div>
                      </div>
                    </div>
                </NavLink>
              ))}
            </div>
        </div>
        <div className='splash-page-3-links-middle-container'>
          <NavLink to="/sign-up" className="navlink">
            <div className='become-a-dasher-container splash-middle-link-container'>
              <img className='image-link-pic'src="https://cdn.doordash.com/media/consumer/home/landing/new/ScootScoot.svg"/>
              <h1 className='splash-page-middle-link-title-text'> Become a Dasher! </h1>
              <p style={{textAlign: "center"}}> As a delivery driver, you'll make reliable money</p>
            </div>
          </NavLink>
          <NavLink to="/sign-up" className="navlink">
            <div className='become-a-partner-container splash-middle-link-container'>
              <img className="image-link-pic" src="https://cdn.doordash.com/media/consumer/home/landing/new/Storefront.svg"/>
              <h1 className='splash-page-middle-link-title-text'> Become a Partner </h1>
                <p style={{textAlign: "center"}}> Create your account first to register your store </p>
            </div>
          </NavLink>
          <NavLink to="/sign-up" className="navlink">
            <div className='try-the-app splash-middle-link-container' >
              <img className="image-link-pic" src="https://cdn.doordash.com/media/consumer/home/landing/new/iphone.svg"/>
              <h1 className='splash-page-middle-link-title-text'> Try the App </h1>
              <p style={{textAlign: "center"}}> Experience the best your neighborhood has to offer </p>
            </div>
          </NavLink>
        </div>
      <SplashFooter/>
      </div>
    </>

  )
}

export default SplashPage
