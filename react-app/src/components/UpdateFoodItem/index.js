import React from 'react'
import FoodItemForm from '../FoodItemForm'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UpdateFoodItem = () => {
  const dispatch = useDispatch();
  const { id, foodItemId } = useParams();
  const allFoodItems =  useSelector(state=> state.foodItems)
  let foodItem = allFoodItems[foodItemId]
  // const foodItems = Object.values(allFoodItems)
  // console.log('food item in update form:', foodItem)

  // const foodItem = foodItems[]
  // const {id, foodItemId} = useParams();
  return (
    <FoodItemForm foodItem={foodItem} formType= "Update Form"/>
  )
}

export default UpdateFoodItem
