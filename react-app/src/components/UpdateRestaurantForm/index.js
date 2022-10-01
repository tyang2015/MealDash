import React, { useEffect } from 'react'
import RestaurantForm from '../RestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import restaurantReducer, { getAllRestaurants } from '../../store/restaurant'
import { useParams } from 'react-router-dom'

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allRestaurants = useSelector(state=> state.restaurants)
  const restaurant = allRestaurants[id]
  const restaurants = Object.values(allRestaurants)

  useEffect(()=>{
    dispatch(getAllRestaurants())
  }, [dispatch])
  return (
    <RestaurantForm restaurants={restaurants} restaurant={restaurant} formType= "Update Form"/>
  )
}

export default UpdateRestaurantForm
