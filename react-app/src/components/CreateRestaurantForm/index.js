import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantForm from '../RestaurantForm'
import { getAllRestaurants } from '../../store/restaurant'

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(state=> Object.values(state.restaurants))

  useEffect(()=>{
    dispatch(getAllRestaurants())
  }, [dispatch])

  return (
    <RestaurantForm restaurants={restaurants} formType= {"Create Form"} />
  )
}

export default CreateRestaurantForm
