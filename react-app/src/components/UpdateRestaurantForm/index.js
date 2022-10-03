import React, { useEffect } from 'react'
import RestaurantForm from '../RestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import restaurantReducer, { getAllRestaurants } from '../../store/restaurant'
import { useParams } from 'react-router-dom'

const UpdateRestaurantForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allRestaurants = useSelector(state=> state.restaurants)
  let restaurant = allRestaurants[id]
  const restaurants = Object.values(allRestaurants)
  restaurant = {
    id: restaurant.id,
    name: restaurant.name,
    price_range: restaurant.priceRange,
    restaurant_pic_url: restaurant.restaurantPicUrl,
    logo: restaurant.logo,
    longitude: restaurant.longitude,
    latitude: restaurant.latitude,
    email: restaurant.email,
    phone_number: restaurant.phoneNumber,
    bank_account: restaurant.bankAccount,
    routing_number: restaurant.routingNumber,
    category: restaurant.category,
    open_time: restaurant.openTime,
    close_time: restaurant.closeTime
  }

  useEffect(()=>{
    dispatch(getAllRestaurants())
  }, [dispatch])
  return (
    <RestaurantForm restaurants={restaurants} restaurant={restaurant} formType= "Update Form"/>
  )
}

export default UpdateRestaurantForm
