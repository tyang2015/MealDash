import { useParams, useHistory, NavLink } from "react-router-dom"
import React,{useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurant";

const GetRestaurant = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  console.log('id is:', id)
  const restaurant = useSelector(state=> state.restaurants[id])
  console.log('restaurant:', restaurant)

  useEffect(()=> {
    dispatch(getAllRestaurants())
  }, [dispatch])
// sdfdsfs
  return (
    <div className="get-restaurant-main-container">
      {/* <h3> restaurant page</h3> */}
      {restaurant && (
        <>
          <div className="restaurant-page-pic-container">
            <img className="restaurant-page-pic" src={restaurant.restaurantPicUrl}/>
          </div>
          <img className="restaurant-page-logo-pic" src={restaurant.logo}/>
          <div className="restaurant-page-name">
            {restaurant.name}
          </div>
          <div className="restaurant-page-description-container">
            <div className="restaurant-page-left-description-text-box">
              <div> {restaurant.category} {restaurant.avgRating}
              {restaurant.numReviews} ratings {restaurant.priceRange = "1"? "$": "2"? "$$": "$$$"}</div>
            </div>
          </div>
        </>
      )}
    </div>


  )
}

export default GetRestaurant
