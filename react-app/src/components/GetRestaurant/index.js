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
// sdf
  return (
    <>
      <h3> restaurant page</h3>
      {restaurant && (
        <>
          <div>
            <img src={restaurant.restaurantPicUrl}/>
          </div>
          <img src={restaurant.logo}/>
        </>
      )}
    </>


  )
}

export default GetRestaurant
