import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink, useLocation } from 'react-router-dom';
import { Modal } from '../../context/DeleteReviewModal';
import { deleteFoodItem, getFoodItems } from '../../store/foodItem';
import "./DeleteFoodItemModal.css"

// uses same modal and styling as review modal
const DeleteFoodItemModalComponent = ({setFilteredItems, setFoodItemDeleteModal, restaurant, foodItem}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(()=> {
    dispatch(getFoodItems(restaurant.id))
  }, [foodItem])

  const handleDelete = () => {
    // dispatch(deleteRestaurant(restaurant.id))
    dispatch(deleteFoodItem(restaurant.id, foodItem.id))
    // dispatch(getFoodItems(restaurant.id))
    setFilteredItems(dispatch(getFoodItems(restaurant.id)))
    setFoodItemDeleteModal(false)
    history.push({pathname: `/restaurants/${restaurant.id}`})
  }

  return (
    <Modal onClose = {()=> setFoodItemDeleteModal(false)}>
      <div className='delete-review-question-container' style={{marginTop:"30px"}}>Are you sure you want to delete {foodItem.name} from your menu?</div>
      <div className='delete-review-yes-no-container' >
        <button className= 'delete-review-button' onClick={handleDelete}>Yes</button>
        <button className= 'delete-review-button' onClick={()=> setFoodItemDeleteModal(false)}>No</button>
      </div>
    </Modal>
  )

}

export default DeleteFoodItemModalComponent
