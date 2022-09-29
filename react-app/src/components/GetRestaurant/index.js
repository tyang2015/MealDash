import { useParams, useHistory, NavLink } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurant";

import "./GetRestaurant.css"

const GetRestaurant = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state=> state.session.user)
  console.log('id is:', id)
  const restaurant = useSelector(state=> state.restaurants[id])
  let today = new Date();
  console.log('hours:', today.getHours())
  console.log('minutes:', today.getMinutes())
  // console.log('today is:', today)

  let closeTime;
  if (restaurant){
    closeTime = restaurant.closeTime.substring(0,5)
  }

  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])
// sdfdsfs
  return (
    <div className="restaurant-page-main-container">
      <div className="restaurant-page-main-content-container">
        {/* <h3> restaurant page</h3> */}
        {restaurant && (
          <>
            <div className="restaurant-page-pic-container">
              <img className="restaurant-page-pic" src={restaurant.restaurantPicUrl} onError={e => { e.currentTarget.src = "https://i.pinimg.com/originals/90/85/b0/9085b0692d8ffe530e71a601ec887cf2.jpg"; }}/>
            </div>
            <div className="restaurant-page-logo-pic-container">
              <img className="restaurant-page-logo-pic" src={restaurant.logo} onError={e => { e.currentTarget.src = "https://cdn5.vectorstock.com/i/1000x1000/65/29/vintage-badge-retro-blank-labels-logo-vector-23946529.jpg"; }} />
            </div>
            <div className="restaurant-page-name">
              {restaurant.name}
            </div>
            <div className="restaurant-page-description-container">
              <div className="restaurant-page-left-description-text-box">
                <div> {restaurant.category} {restaurant.avgRating}
                {restaurant.numReviews} ratings {restaurant.priceRange == "1"? "$": "2"? "$$": "$$$"}
                </div>
                <div>
                  Closing Time {closeTime}
                </div>
              </div>
              <div className="restaurant-page-update-delete-buttons-container">

                {sessionUser.id == restaurant.ownerId && (
                  <>
                    <NavLink to={`/restaurants/${restaurant.id}/edit`}>
                      <div className = "restaurant-page-update-button">
                        Update Restaurant
                      </div>
                    </NavLink>
                      <button className="restaurant-page-delete-button">
                        Delete
                      </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>


  )
}

export default GetRestaurant
