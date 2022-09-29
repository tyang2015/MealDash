import React, { useEffect } from 'react'
import RestaurantForm from '../RestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import restaurantReducer, { getAllRestaurants } from '../../store/restaurant'
import { useParams } from 'react-router-dom'

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const restaurants = useSelector(state=> state.restaurants)
  // console.log('restaurants in update:', restaurants)
  const restaurant = restaurants[id]
  console.log('restaurant in update form:', restaurant)
  useEffect(()=>{
    dispatch(getAllRestaurants())
  }, [dispatch])
  return (
    <RestaurantForm restaurant={restaurant} formType= "Update Form"/>
  )
}

export default UpdateRestaurantForm
